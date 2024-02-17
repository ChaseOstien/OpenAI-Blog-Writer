import './App.css';
import { useState } from 'react';
import HistoryBar from './components/HistoryBar/HistoryBar';

function App() {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogContent, setBlogContent] = useState('')
    const [clientPrompt, setClientPrompt] = useState('');

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

    const singleBlog = (newBlogTitle, newBlogContent) => {
      setBlogTitle(newBlogTitle);
      setBlogContent(newBlogContent);
    };

  return (
    <><div className="App">
      <form className='form' onSubmit={fetchBlog}>
        <input type='text' name="clientPrompt" onChange={handleChange} placeholder='Enter your desired prompt!'></input>
        <button type="submit" className='button'>Generate!</button>
      </form>
      <h2>{blogTitle}</h2>
      {blogContent.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
    <div className='historyBar'>
      <HistoryBar blogContent={blogContent} singleBlog={singleBlog}/>
    </div>
    </>
  );
}

export default App;
