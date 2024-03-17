import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import '../../App.css';

export default function Logout({ collapseSidebar }) {
    const navigate = useNavigate();

    // Logout fetch request, clears stored token and unsets jwt token on backend.
    async function logout(e) {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
        }

        try {
            const response = await fetch('https://127.0.0.1:5000/auth/logout', requestOptions)
            const data = await response.json();
            localStorage.removeItem('jwt')
            navigate('/')
        } catch (error) {
            console.log('Error logging out!', error);
        }
    }

    return (
        <>
            { collapseSidebar ? (
                <Tooltip title="Logout"
                enterDelay={500}
                leaveDelay={50}
                leaveTouchDelay={200} 
                placement="bottom-start" 
                disableInteractive>
                    <button 
                        className="flex w-4/5 justify-center py-1 hover:scale-125 text-primaryPurple" 
                        onClick={logout}>
                            <LogoutIcon />
                    </button>
                </Tooltip>
            ) : (
                <button 
                    className="flex w-4/5 justify-center rounded-md bg-primaryPurple px-3 py-1 text-md font-semibold leading-6 shadow-sm hover:bg-primaryVariant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                    text-onBackground" 
                    onClick={logout}>
                        Logout
                </button>
            )}
        </>
    )
}
