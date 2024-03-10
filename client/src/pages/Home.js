import '../App.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
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

    const [accessToken, setAccessToken] = useOutletContext();

    const handleChange = (e) => {
      setClientPrompt(e.target.value)
    }

    async function fetchBlog(e) {
      e.preventDefault();
      setIsLoading(true);
        const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}` 
          },
          body: JSON.stringify({ clientPrompt: clientPrompt })
        };

        try {
          console.log(accessToken)
          const response = await fetch('http://127.0.0.1:5000/generate', requestOptions);
          const data = await response.json();
          setBlogTitle(data.title);
          setBlogContent(data.content)
          setClientPrompt('');
          setIsLoading(false);
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
      <div id="contentContainer" className="App mx-auto p-4">
        <SkeletonTheme id="skeleton" className="w-4/5 justify-center" baseColor='#030712' highlightColor='rgba(35, 35, 35, 0.50)'>
          <div className='h-full p-4'>
            <Skeleton height={'85%'} width={'100%'} borderRadius={'20px'}/>
            <Skeleton className='mt-4' height={'10%'} width={'100%'} borderRadius={'20px'} />
          </div>
          </SkeletonTheme> 
      </div>
          : 
          <div id="contentContainer" className="App mx-auto justify-center p-4 w-4/5">
            <Content blogContent={blogContent} blogGenerated={blogGenerated} blogTitle={blogTitle} /> 
            <SearchBar handleChange={handleChange} fetchBlog={fetchBlog} /> 
          </div>
          }
    </div>
  );
}