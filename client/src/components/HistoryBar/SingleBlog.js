

export default function SingleBlog({ blog, singleBlog }) {
    
    async function fetchOneBlog(id) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            const baseUrl = 'http://127.0.0.1:5000/history/';
            const response = await fetch(baseUrl + blog.id, requestOptions)
            const data = await response.json()
            singleBlog(data.title, data.content)
        } catch(error) {
            console.log('Error fetching data', error)
        }
    }

    return (
        <div key={blog.id}>
            <button className="titleButton" onClick={() => fetchOneBlog(blog.id)}>{blog.title}</button>
        </div> 
    )
}
