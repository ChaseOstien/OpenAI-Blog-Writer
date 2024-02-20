/* eslint-disable jsx-a11y/anchor-is-valid */
import './historybar.css'
import { useState, useEffect } from 'react'
import SingleBlog from './SingleBlog'


export default function HistoryBar({ blogContent, singleBlog }) {
    const [blogHistory, setBlogHistory] = useState([])

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
            <h1 className='text-onBackground'>Blog History</h1>
            {blogHistory.map((blog) => (
                <SingleBlog key={blog.id} blog={blog} singleBlog={singleBlog}/>
            ))}
        </>
    )
}
