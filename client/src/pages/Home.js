import '../App.css';
import { useState } from 'react';
import HistoryBar from '../components/HistoryBar/HistoryBar';
import SearchBar from '../components/SearchBar/SearchBar';
import Content from '../components/Content/Content';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function HomePage() {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogContent, setBlogContent] = useState('')
    const [clientPrompt, setClientPrompt] = useState('');
    const [blogGenerated, setBlogGenerated] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
      setClientPrompt(e.target.value)
    }
// Fetch request to generate content. Post requests includes user prompt in body, hits backend api which fires request to OpenAI api. Generated content parsed by backend before being returned to this component. 
    async function fetchBlog(e) {
      e.preventDefault();
      setIsLoading(true);
        const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('jwt')}` 
          },
          body: JSON.stringify({ clientPrompt: clientPrompt })
        };

        try {
          const response = await fetch('https://127.0.0.1:5000/generate', requestOptions);
          const data = await response.json();
          setBlogTitle(data.title);
          setBlogContent(data.content)
          setClientPrompt('');
          setIsLoading(false);
        } catch (error) {
          console.log('Error fetching data', error)
      }
    }
// Function to set displayed content to a blog selected from the history bar.
    const singleBlog = (newBlogTitle, newBlogContent, newBlogGenerated) => {
      setBlogTitle(newBlogTitle);
      setBlogContent(newBlogContent);
      setBlogGenerated(newBlogGenerated);
    };
// Function to clear currently rendered blog and return to landing screen.
    const newBlog = () => {
      setBlogTitle('');
      setBlogContent('');
      setBlogGenerated('');
      setClientPrompt('');
    }

  return (
    <div className='flex'>
      <HistoryBar 
        blogContent={blogContent}
        singleBlog={singleBlog}
        newBlog={newBlog}
      />
      { isLoading ? 
      <div id="contentContainer" 
        className="App mx-auto p-4">
        <SkeletonTheme id="skeleton" 
          className="w-4/5 justify-center" 
          baseColor='#030712' 
          highlightColor='rgba(35, 35, 35, 0.50)'>
          <div className='h-full p-4'>
            <Skeleton height={'85%'} 
              width={'100%'} 
              borderRadius={'20px'}/>
            <Skeleton className='mt-4' 
              height={'10%'} 
              width={'100%'} 
              borderRadius={'20px'} />
          </div>
        </SkeletonTheme> 
      </div>
          : 
          <div id="contentContainer" 
            className="App mx-auto justify-center p-4 w-4/5">
            <Content blogContent={blogContent} 
              blogGenerated={blogGenerated} 
              blogTitle={blogTitle} 
            /> 
            <SearchBar handleChange={handleChange} 
              fetchBlog={fetchBlog} 
            /> 
          </div>
        }
    </div>
  );
}
