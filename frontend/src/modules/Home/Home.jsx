import { useRef, useState } from 'react';
import styles from './Home.module.scss'
import axios from 'axios';
import { Loader } from '../../components'
import { loginWithTwitter, logoutFromTwitter } from '../../firebase';
import { BiLogOut } from 'react-icons/bi'

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('')
    const [userId, setUserId] = useState('')
    const [image, setImage] = useState('');
    const ref = useRef(null);

    const onLogout = () => {
        setIsLoading(true);
        localStorage.removeItem('loginInfo');
        logoutFromTwitter(() => setIsLoading(false));
    }

    const onTwitterLogin = () => {
        setIsLoading(true);
        loginWithTwitter((result) => {
            localStorage.setItem('loginInfo', JSON.stringify(result));
            onSubmit();
        }, (err) => {
            if (err.code === 'auth/popup-closed-by-user') {
                alert('User cancalled!');
                return;
            }
            else {
                console.log(err);
                alert('Something went wrong!');
            }
            setIsLoading(false);
        });
    }

    const onSubmit = async e => {
        e && e.preventDefault();

        if (!localStorage.getItem('loginInfo')) {
            return onTwitterLogin();
        }

        setIsLoading(true);
        try {
            const { secret, token } = JSON.parse(localStorage.getItem('loginInfo'))
            if (!secret || !token) {
                alert('Something went wrong!')
                return onLogout();
            }

            const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/v1/tweet', {
                message,
                image,
                secret,
                token,
                userId
            })
            alert(data.message);
            setIsLoading(false);
            setImage('');
            setMessage('');
            setUserId('');
        } catch (error) {
            alert('Something went wrong!. Please try again!');
            console.log(error);
            setIsLoading(false);
        }
    }

    const onImageChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    }

    const onLoad = () => {
        ref.current.style.display = 'inline';
    }
    const onError = () => {
        ref.current.style.display = 'none';
    }



    return (
        isLoading ? (
            <div className="loader"><Loader /></div>
        ) : (
            <div className={styles.container}>
                <form onSubmit={onSubmit}>
                    <h1>Make a tweet</h1>
                    <label>
                        <span>User Id</span>
                        <div>
                            <input placeholder="Any user id?" required value={userId} onChange={e => setUserId(e.target.value)} />
                        </div>
                    </label>
                    <label>
                        <span>Message</span>
                        <div>
                            <textarea placeholder="What's your message?" required value={message} onChange={e => setMessage(e.target.value)} />
                        </div>
                    </label>
                    <label>
                        <span>Image</span>
                        <div>
                            <img ref={ref} src={image} onError={onError} onLoad={onLoad} />
                            <input type="file" accept="image/*" required onChange={onImageChange} />
                        </div>
                    </label>
                    <button type="submit">Tweet</button>
                </form>
                {localStorage.getItem('loginInfo') && <button onClick={onLogout}><BiLogOut /></button>}
            </div>
        )
    )
}

export default Home