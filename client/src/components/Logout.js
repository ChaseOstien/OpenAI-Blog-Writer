import { useOutletContext, useNavigate } from "react-router-dom";
import '../App.css';

export default function Logout() {
    const [accessToken, setAccessToken] = useOutletContext();
    const navigate = useNavigate();

    async function logout(e) {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/auth/logout', requestOptions)
            const data = await response.json();
            if (data.access_token === '') {
                setAccessToken(data.access_token);
                navigate('/')
            }
        } catch (error) {
            console.log('Error logging out!', error);
        }
    }

    return (
        <button className="flex w-full justify-center rounded-md bg-primaryPurple px-3 py-1 text-md font-semibold leading-6 shadow-sm hover:bg-primaryVariant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={logout}>Logout</button>
    )
}
