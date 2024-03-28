import { MenuItem,  } from 'react-pro-sidebar';
import '../../App.css';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import Tooltip from '@mui/material/Tooltip';

export default function SingleBlog({ blog, singleBlog, collapseSidebar }) {
    
    async function fetchOneBlog(id) {
        const requestOptions = {
            method: 'PUT',
            headers: {
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
        };

        try {
            const baseUrl = 'https://openai-blog-generator-634c4b325b13.herokuapp.com/history/';
            const response = await fetch(baseUrl + blog.id, requestOptions);
            const data = await response.json();
            singleBlog(data.title, data.content, blog.generated);
        } catch(error) {
            console.log('Error fetching data', error);
        }
    }

    return (
        <div key={blog.id}>
            <Tooltip title={blog.title}
            enterDelay={500}
            leaveDelay={50}
            leaveTouchDelay={200} 
            placement="bottom-start" 
            disableInteractive>
                { collapseSidebar ? (
                    <button onClick={() => fetchOneBlog(blog.id)}>
                        <MenuItem className='' 
                            icon={<ArticleTwoToneIcon className="icon hover:scale-125"/>}  
                            style={{ maxWidth: '320px', backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                        </MenuItem>
                    </button>
                ) : (
                    <button className="text-slateLight max-w-72 truncate text-ellipsis text-md p-1 m-1 hover:border hover:border-primaryPurple rounded-lg font-robotoRegular  focus:border focus:border-primaryPurple" onClick={() => fetchOneBlog(blog.id)}>
                            {blog.title}
                    </button>
                )}
            </Tooltip>
        </div>
    )
}
