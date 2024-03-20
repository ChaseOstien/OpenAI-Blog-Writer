import { useNavigate } from "react-router-dom"

export default function Error() {
    const navigate = useNavigate();

    function error(e) {
        e.preventDefault()

        if (localStorage.getItem('jwt')) {
            navigate('/home')
        } else {
            navigate('/')
        }
    }

    return (
        <div className="container flex h-screen justify-center items-center max-w-min">
            <div className="w-5 flex flex-col">
                <p className="text-center text-2xl text-onBackground mb-3">Oops...wrong page!</p>
                <button onClick={error} className="text-center rounded-md bg-primaryPurple px-3 py-1 text-md font-semibold leading-6 shadow-sm hover:bg-primaryVariant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
            text-onBackground">Home</button>
            </div>
        </div>
    )
}
