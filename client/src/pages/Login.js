

export default function LoginPage() {
    return (
        <div className=" flex h-screen flex-col justify-center px-5 py-8 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-11 w-11" src="/BlogLogo2.png" alt="Your Company" />
    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-primaryPurple font-robotoRegular">Sign in to View Blogs</h2>
  </div>

  <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6 login-form" action="#" method="POST">
      <div>
        <label htmlFor="email" className="block text-md font-bold leading-6 text-primaryPurple">Username:</label>
        <div className="mt-2">
          <input name="username" autoComplete="username" required className="block w-full rounded-lg border-0 py-1 text-primaryPurple bg-mainBackground shadow-sm ring-1 ring-inset ring-primaryPurple pl-2 focus:ring-2 focus:ring-inset focus:ring-primaryVariant sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-md font-bold leading-6 text-primaryPurple">Password:</label>
        </div>
        <div className="mt-2">
          <input name="password" type="password" autoComplete="current-password" required className="block w-full rounded-lg border-0 py-1 text-primaryPurple bg-mainBackground shadow-sm ring-1 ring-inset ring-primaryPurple pl-2 focus:ring-2 focus:ring-inset focus:ring-primaryVariant sm:text-sm sm:leading-6" />
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