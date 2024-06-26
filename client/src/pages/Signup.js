import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate()
// Signup fetch request, bundles formData and sets return jwt token in local storage.
  async function handleSubmit(e) {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };

    try {
      const response = await fetch('https://openai-blog-generator-634c4b325b13.herokuapp.com/auth/signup', requestOptions)
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('jwt', data.access_token);
        navigate('/home');
        setError('');
        return;
      }
      throw new Error(data.message);
    } catch (error) {
      setError('That information is already in use!')
      console.log('Error signing up!', error);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value
    }))
  }


    return (
      <div id='secondaryBackground' className="flex h-screen flex-col justify-center px-5 py-8 lg:px-8">
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-primaryPurple font-robotoRegular">
              Sign up to Generate Blogs
            </h2>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 login-form" 
            onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username"
                className="block text-md font-bold leading-6 text-primaryPurple">
                Username:
              </label>
              <div className="mt-2">
                <input name="username" 
                  autoComplete="username" 
                  required 
                  value={formData.username} 
                  onChange={handleChange} 
                  className="block w-full rounded-lg border-0 py-1 text-primaryPurple bg-mainBackground shadow-sm ring-1 ring-inset ring-primaryPurple pl-2 focus:ring-2 focus:ring-inset focus:ring-primaryVariant sm:text-sm sm:leading-6" 
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" 
                  className="block text-md font-bold leading-6 text-primaryPurple">
                  Email:
                </label>
              </div>
              <div className="mt-2">
                <input name="email" 
                  type="email" 
                  autoComplete="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="block w-full rounded-lg border-0 py-1 text-primaryPurple bg-mainBackground shadow-sm ring-1 ring-inset ring-primaryPurple pl-2 focus:ring-2 focus:ring-inset focus:ring-primaryVariant sm:text-sm sm:leading-6" 
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" 
                  className="block text-md font-bold leading-6 text-primaryPurple">
                  Password:
                </label>
              </div>
              <div className="mt-2">
                <input name="password" 
                  type="password" 
                  autoComplete="current-password" 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                  className="block w-full rounded-lg border-0 py-1 text-primaryPurple bg-mainBackground shadow-sm ring-1 ring-inset ring-primaryPurple pl-2 focus:ring-2 focus:ring-inset focus:ring-primaryVariant sm:text-sm sm:leading-6" 
                />
                { error && <span className="error"><ErrorIcon className="m-1"/>{error}</span> }
              </div>
            </div>
            <div>
              <button type="submit" 
                className="flex w-full justify-center rounded-md bg-primaryPurple px-3 py-1 text-md font-semibold leading-6 shadow-sm hover:bg-primaryVariant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Signup
              </button>
            </div>
          </form>
          <p className="mt-3 text-center text-sm text-onBackground">
            Not a first time user?
            <a href="/" className="font-semibold leading-6 text-primaryPurple hover:font-bold"> Login instead</a>
          </p>
        </div>
    </div>
  );
}
