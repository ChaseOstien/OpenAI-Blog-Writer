import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import { MenuItem } from "react-pro-sidebar";
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
            const response = await fetch('https://openai-blog-generator-634c4b325b13.herokuapp.com/auth/logout', requestOptions)
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
                    <button onClick={logout}>
                        <MenuItem className="" 
                            icon={ <LogoutIcon 
                            className="icon hover:scale-125"/>} 
                            style={{ maxWidth: '320px', backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                        </MenuItem>
                    </button>
                </Tooltip>
            ) : (
                <MenuItem className="" 
                    style={{ maxWidth: '320px', backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                    <button 
                        className="flex w-full justify-center rounded-md bg-primaryPurple py-1 text-md font-semibold leading-6 shadow-sm hover:bg-primaryVariant
                        text-onBackground" 
                        onClick={logout}>
                        Logout
                    </button>
                </MenuItem>
            )}
        </>
    )
}
