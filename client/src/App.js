import './App.css';
import { useState } from 'react';
import HistoryBar from './components/HistoryBar/HistoryBar';


function App() {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogContent, setBlogContent] = useState('')
    const [clientPrompt, setClientPrompt] = useState('');
    const [blogGenerated, setBlogGenerated] = useState('');

    const handleChange = (e) => {
      setClientPrompt(e.target.value)
    }

    async function fetchBlog(e) {
      e.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientPrompt: clientPrompt })
        };

        try {
          const response = await fetch('http://127.0.0.1:5000/generate', requestOptions);
          const data = await response.json();
          setBlogTitle(data.title);
          setBlogContent(data.content)
        } catch(error) {
          console.log('Error fetching data', error)
      }
    }

    const singleBlog = (newBlogTitle, newBlogContent, newBlogGenerated) => {
      setBlogTitle(newBlogTitle);
      setBlogContent(newBlogContent);
      setBlogGenerated(newBlogGenerated);
    };

    const newBlog = () => {
      setBlogTitle('');
      setBlogContent('');
      setBlogGenerated('');
    }

  return (
    <div className='flex h-dvh'>
      <HistoryBar 
        blogContent={blogContent}
        singleBlog={singleBlog}
        newBlog={newBlog}
      />
    <div className="App container p-4">
      <h2 className='text-onBackground'>
        {blogTitle}
      </h2>
      {blogContent.split('\n\n').map((paragraph, index) => (
          <p className='text-onBackground' key={index}>{paragraph}</p>
      ))}
      <p className='text-onBackground'>{blogGenerated ? blogGenerated : null}</p>
      <form className='my-4
        flex 
          w-4/5 
            mx-auto 
              justify-evenly
              bg-darkGreyOpaque 
              p-3 
            hover:transition-opacity 
          rounded-lg 
        shadow-xl' 
        onSubmit={fetchBlog}>
        <div className="w-3/5">
          <input type="text"
            name="clientPrompt" 
            onChange={handleChange} 
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
            className='shadow-md 
              p-2 
              rounded-lg 
              bg-darkGrey 
              text-slateDark 
              border 
              border-slateDark 
              focus:border-primaryPurple 
              hover:border-primaryPurple
              hover:text-primaryPurple'>
                Generate!
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default App;
