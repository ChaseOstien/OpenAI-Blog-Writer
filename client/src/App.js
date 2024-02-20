import './App.css';
import { useState } from 'react';
import HistoryBar from './components/HistoryBar/HistoryBar';
import { Sidebar, Menu, MenuItem,  } from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function App() {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogContent, setBlogContent] = useState('')
    const [clientPrompt, setClientPrompt] = useState('');
    const [collapseSidebar, setCollapseSidebar] = useState(false);

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
    <div className='flex h-dvh'>
      <Sidebar collapsed={collapseSidebar}>
  <Menu>
    <MenuItem icon={<MenuOutlinedIcon />} onClick={() => setCollapseSidebar(!collapseSidebar)} style={{ textAlign: 'center' }}> {" "} <h2>Blog History</h2> </MenuItem>
    <MenuItem> Line charts </MenuItem>
    <MenuItem> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>
  </Menu>
</Sidebar>

      <div className='historyBar bg-darkGreyOpaque p-3'>
        <HistoryBar blogContent={blogContent} singleBlog={singleBlog}/>
      </div>
    <div className="App container p-4">
      <h2 className='text-onBackground'>{blogTitle}</h2>
      {blogContent.split('\n\n').map((paragraph, index) => (
        <p className='text-onBackground' key={index}>{paragraph}</p>
      ))}
      <form className='my-4 flex w-4/5 mx-auto justify-evenly bg-darkGreyOpaque p-3 hover:transition-opacity rounded-lg shadow-xl' onSubmit={fetchBlog}>
        <div className="w-3/5">
          <input type="text" name="clientPrompt" onChange={handleChange} className=" p-2  text-md rounded-lg w-full border border-slateDark bg-darkGrey shadow-sm focus:ring-slateLight focus:border-slateLight text-slateDark hover:border-slateLight focus:text-slateLight" placeholder="Enter your prompt..."></input>
        </div>
        <div className="">
          <button type="submit" className='shadow-md p-2 rounded-lg bg-darkGrey text-slateDark border border-slateDark focus:border-slate-500 hover:border-slateLight hover:text-slateLight'>Generate!</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default App;
