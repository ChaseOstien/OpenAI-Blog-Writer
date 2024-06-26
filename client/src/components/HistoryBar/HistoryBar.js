/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../App.css';
import { useState, useEffect } from 'react'
import { Sidebar } from 'react-pro-sidebar';
import IconMenu from './IconMenu';

export default function HistoryBar({ blogContent, singleBlog, newBlog, collapseSidebar, setCollapseSidebar }) {
    const [blogHistory, setBlogHistory] = useState([])
    

    useEffect(() => {
        async function getBlogs() {

            const requestOptions = {
                method: 'GET',
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem('jwt')}` 
                },
              };

            try {
                const response = await fetch('https://openai-blog-generator-634c4b325b13.herokuapp.com/history', requestOptions)
                const data = await response.json()
                console.log(data)
                if (data[0]) {
                    setBlogHistory(data)
                }
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }
        getBlogs();
   }, [blogContent])


    return (
        <>
            <Sidebar 
                id="iconMenu" 
                className="sideBar" 
                collapsed={collapseSidebar} 
                backgroundColor='secondaryBackground' 
                transitionDuration={300} 
                breakPoint='sm' 
                width='300px'
                onBackdropClick={() => setCollapseSidebar(!collapseSidebar)}>
                     <IconMenu 
                    collapseSidebar={collapseSidebar}
                    setCollapseSidebar={setCollapseSidebar}
                    newBlog={newBlog}
                    blogHistory={blogHistory} 
                    singleBlog={singleBlog} 
                />
            </Sidebar>
        </>
    )
}
