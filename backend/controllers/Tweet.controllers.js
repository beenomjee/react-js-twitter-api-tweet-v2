import Twit from "twit";
import { Tweet } from "../db/index.js";

export const makeNewTweet = async (req, res) => {
  try {
    const { userId, image, message, secret, token } = req.body;
    if (!image || !message || !secret || !token)
      return res.status(400).json({ message: "All fields are required!" });

    let iamgeWithoutHeader = image.split(";base64,").pop();

    const T = new Twit({
      consumer_key: process.env.API_KEY,
      consumer_secret: process.env.API_KEY_SECRET,
      access_token: token,
      access_token_secret: secret,
    });

    const { data: mediaData } = await T.post("media/upload", {
      media_data: iamgeWithoutHeader,
    });
    const mediaIdStr = mediaData.media_id_string;
    await T.post("media/metadata/create", {
      media_id: mediaIdStr,
      alt_text: { text: "MY Image" },
    });
    await T.post("statuses/update", {
      status: message,
      media_ids: [mediaIdStr],
    });

    const tweet = new Tweet({ img: image, msg: message, userId });
    await tweet.save();
    return res
      .status(201)
      .json({ message: "Tweet posted successfully!", tweet });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!. Please try again!", error });
  }
};
