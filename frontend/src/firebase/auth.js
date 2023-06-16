import { TwitterAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./config";

const twitterProvider = new TwitterAuthProvider();

export const loginWithTwitter = async (onSuccess, onError) => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;
    const user = result.user;
    onSuccess({ token, secret, user });
  } catch (error) {
    onError(error);
  }
};

export const logoutFromTwitter = async (onSuccess, onError) => {
  try {
    await signOut(auth);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};
