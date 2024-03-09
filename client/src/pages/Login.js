import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/auth/login', requestOptions)
      const data = await response.json();
      if (data) {
        navigate('/')
      }
    } catch (error) {
      console.log('Error signing up!', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value
    }))
  }


  return (
    <div className="flex h-screen flex-col justify-center px-5 py-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img className="mx-auto h-11 w-11" src="/BlogLogo2.png" alt="Your Company" /> */}
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-primaryPurple font-robotoRegular">Sign in to Generate Blogs</h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-md font-bold leading-6 text-primaryPurple">Username:</label>
            <div className="mt-2">
              <input name="username" autoComplete="username" required value={formData.username} onChange={handleChange} className="block w-full rounded-lg border-0 py-1 text-primaryPurple bg-mainBackground shadow-sm ring-1 ring-inset ring-primaryPurple pl-2 focus:ring-2 focus:ring-inset focus:ring-primaryVariant sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-md font-bold leading-6 text-primaryPurple">Password:</label>
            </div>
            <div className="mt-2">
              <input name="password" type="password" autoComplete="current-password" required value={formData.password} onChange={handleChange} className="block w-full rounded-lg border-0 py-1 text-primaryPurple bg-mainBackground shadow-sm ring-1 ring-inset ring-primaryPurple pl-2 focus:ring-2 focus:ring-inset focus:ring-primaryVariant sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-primaryPurple px-3 py-1 text-md font-semibold leading-6 shadow-sm hover:bg-primaryVariant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
          </div>
        </form>

        <p className="mt-3 text-center text-sm text-onBackground">
          First time user?
          <a href="/signup" className="font-semibold leading-6 text-primaryPurple hover:font-bold"> Signup instead</a>
        </p>
      </div>
    </div>

  )
}