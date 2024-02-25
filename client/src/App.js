import './App.css';
import { useState } from 'react';
import HistoryBar from './components/HistoryBar/HistoryBar';
import SearchBar from './components/SearchBar/SearchBar';
import Content from './components/Content/Content';


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
    <div className='flex'>
      <HistoryBar 
        blogContent={blogContent}
        singleBlog={singleBlog}
        newBlog={newBlog}
      />
    <div className="App mx-auto p-4 w-4/5">
      <Content blogContent={blogContent} blogGenerated={blogGenerated} blogTitle={blogTitle} />
      <SearchBar handleChange={handleChange} fetchBlog={fetchBlog} />
    </div>
    </div>
  );
}

export default App;
