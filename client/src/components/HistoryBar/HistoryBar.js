/* eslint-disable jsx-a11y/anchor-is-valid */
import './historybar.css'
import { useState, useEffect } from 'react'
import SingleBlog from './SingleBlog'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


export default function HistoryBar({ blogContent, singleBlog, newBlog }) {
    const [blogHistory, setBlogHistory] = useState([])
    const [collapseSidebar, setCollapseSidebar] = useState(false);

    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await fetch('http://127.0.0.1:5000/history')
                const data = await response.json()
                console.log(data)
                setBlogHistory(data)
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }
        getBlogs();
    },[blogContent])


    return (
        <>
            <Sidebar className="sideBar" collapsed={collapseSidebar} backgroundColor='darkGreyOpaque' transitionDuration={500} breakPoint='sm' width='300px'>
                <Menu>
                    <MenuItem className='menuItem'
                        icon={<MenuOutlinedIcon className='icon hover:scale-125 ' />}
                            onClick={() => setCollapseSidebar(!collapseSidebar)}
                                style={{ textAlign: 'center', backgroundColor: '#121212' }}>
                            {" "} 
                        <h1 className='text-slateLight rounded-lg hover:bg-darkGreyOpaque p-1 focus:scale-90 hover:rounded-lg'>Blog History</h1>
                    </MenuItem>
                    <MenuItem className='menuItem'
                        icon={<OpenInNewIcon className='icon hover:scale-125' />}
                        onClick={newBlog}
                                style={{ textAlign: 'center', backgroundColor: '#121212' }}>
                        {" "}
                        <h1 className='text-slateLight rounded-lg hover:bg-darkGreyOpaque p-1 focus:scale-90 hover:rounded-lg'>New Blog</h1>
                    </MenuItem>
                    {blogHistory.map((blog) => (
                        <SingleBlog
                            key={blog.id}
                            blog={blog}
                            singleBlog={singleBlog}
                            collapseSidebar={collapseSidebar}
                        />
                    ))}
                </Menu>
            </Sidebar>
        </>
    )
}
