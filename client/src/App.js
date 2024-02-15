import './App.css';
import { useState } from 'react';

function App() {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogContent, setBlogContent] = useState('')
    const [clientPrompt, setClientPrompt] = useState('');

    const handleChange = (e) => {
      setClientPrompt(e.target.value)
    }

    async function fetchBlog() {
      console.log(clientPrompt)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientPrompt: clientPrompt })
      };

      console.log('Clicked')
      const response = await fetch('http://127.0.0.1:5000/generate', requestOptions);
      console.log(response)
      const data = await response.json();
      console.log(data)
      setBlogTitle(data.title);
      setBlogContent(data.content)
    }


  return (
    <div className="App">
      <form className='form' onSubmit={fetchBlog}>
        <input type='text' name="clientPrompt" onChange={handleChange} placeholder='Enter your desired prompt!'></input>
        <button type="submit" className='button'>Generate!</button>
      </form>
      <h2>{blogTitle}</h2>
      {blogContent.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default App;
