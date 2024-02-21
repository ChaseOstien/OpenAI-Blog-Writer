/* eslint-disable jsx-a11y/anchor-is-valid */
import './historybar.css'
import { useState, useEffect } from 'react'
import SingleBlog from './SingleBlog'
import { Sidebar, Menu, MenuItem,  } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


export default function HistoryBar({ blogContent, singleBlog }) {
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
            <Sidebar collapsed={collapseSidebar} backgroundColor='darkGreyOpaque' transitionDuration={500} breakPoint='sm'>
                <Menu>
                    <MenuItem className='menuItem'
                        icon={<MenuOutlinedIcon className='icon' />}
                            onClick={() => setCollapseSidebar(!collapseSidebar)}
                                style={{ textAlign: 'center', backgroundColor: '#121212' }}>
                            {" "} 
                        <h1 className='text-slateLight'>Blog History</h1>
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
