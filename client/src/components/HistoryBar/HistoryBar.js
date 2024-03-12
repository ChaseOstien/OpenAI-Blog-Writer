/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../App.css';
import { useState, useEffect } from 'react'
import { Sidebar } from 'react-pro-sidebar';
import IconMenu from './IconMenu';
import { useOutletContext } from 'react-router-dom';
import Logout from '../Logout';


export default function HistoryBar({ blogContent, singleBlog, newBlog }) {
    const [blogHistory, setBlogHistory] = useState([])
    const [collapseSidebar, setCollapseSidebar] = useState(false);
    const [accessToken, setAccessToken] = useOutletContext();

    useEffect(() => {
        async function getBlogs() {

            const requestOptions = {
                method: 'GET',
                headers: {
                  "Authorization": `Bearer ${accessToken}` 
                },
              };

            try {
                const response = await fetch('http://127.0.0.1:5000/history', requestOptions)
                const data = await response.json()
                console.log(data)
                setBlogHistory(data)
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }
        getBlogs();
   },[blogContent, accessToken])


    return (
        <>
            <Sidebar id="iconMenu" className="sideBar" collapsed={collapseSidebar} backgroundColor='darkGreyOpaque' transitionDuration={500} breakPoint='sm' width='300px'>
                <IconMenu collapseSidebar={collapseSidebar} setCollapseSidebar={setCollapseSidebar} newBlog={newBlog} blogHistory={blogHistory} singleBlog={singleBlog} />
                <div className="logout">
                    <Logout />
                </div>
            </Sidebar>
        </>
    )
}
