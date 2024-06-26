import '../../App.css';

export default function SearchBar({ fetchBlog, handleChange }) {

    return (
        <form id="inputForm" 
          className='my-4 flex w-11/12 mx-auto justify-evenly bg-darkGreyOpaque p-3 opacity-50 hover:opacity-100 rounded-lg shadow-xl' 
          onSubmit={fetchBlog}>
          <div id='searchInput' className="w-3/5">
            <input type="text"
              name="clientPrompt" 
              onChange={handleChange}
              required 
              className="p-2  
                text-md 
                rounded-lg 
                w-full 
                border 
                border-slateDark 
                bg-darkGrey 
                shadow-sm 
                focus:ring-primaryPurple 
                focus:border-slateLight 
                text-slateDark 
                hover:border-primaryPurple 
                focus:text-slateLight" 
              placeholder="Enter your prompt...">
            </input>
          </div>
          <div className="">
            <button type="submit"
              id='generateButton'
              className='shadow-md 
                p-2 
                rounded-lg 
                bg-darkGrey 
                text-slateDark 
                border 
                border-slateDark 
                focus:border-primaryPurple 
                hover:border-darkPrimary
                hover:text-darkPrimary
                hover:bg-primaryPurple'>
                  Generate
            </button>
          </div>
        </form>
    )
}
