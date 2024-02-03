import './App.css';
import { useState } from 'react';

function App() {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogContent, setBlogContent] = useState('')

    async function fetchBlog() {
      console.log('Clicked')
      const response = await fetch('http://127.0.0.1:5000/generate');
      const data = await response.json();
      setBlogTitle(data.title);
      setBlogContent(data.content)
      console.log(response)
    }


  return (
    <div className="App">
      <button className='button' onClick={fetchBlog}>Generate!</button>
      <h2>{blogTitle}</h2>
      {blogContent.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default App;
