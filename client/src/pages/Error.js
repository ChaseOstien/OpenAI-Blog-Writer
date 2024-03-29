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
        <div id='secondaryBackground' className="flex h-screen justify-center items-center sm:p-1">
            <div className=" flex flex-col">
                <p id="smallScreenButtonMargin" className="text-center text-2xl text-onBackground mb-3 sm:max-m-1">Oops...wrong page!</p>
                <button onClick={error} id="smallScreenButtonMargin" className="text-center rounded-md bg-primaryPurple px-3 py-1 text-md font-semibold leading-6 shadow-sm hover:bg-primaryVariant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
            text-onBackground sm:max-m-1">Home</button>
            </div>
        </div>
    )
}
