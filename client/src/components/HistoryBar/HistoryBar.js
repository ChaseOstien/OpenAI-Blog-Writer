/* eslint-disable jsx-a11y/anchor-is-valid */
import './historybar.css'
import { useState, useEffect } from 'react'
import SingleBlog from './SingleBlog'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconMenu from './IconMenu';


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
                <IconMenu collapseSidebar={collapseSidebar} setCollapseSidebar={setCollapseSidebar} newBlog={newBlog} blogHistory={blogHistory} singleBlog={singleBlog} />
            </Sidebar>
        </>
    )
}
