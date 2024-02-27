import { MenuItem,  } from 'react-pro-sidebar';
import '../../App.css';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import Tooltip from '@mui/material/Tooltip';

export default function SingleBlog({ blog, singleBlog, collapseSidebar }) {
    
    async function fetchOneBlog(id) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            const baseUrl = 'http://127.0.0.1:5000/history/';
            const response = await fetch(baseUrl + blog.id, requestOptions)
            const data = await response.json()
            singleBlog(data.title, data.content, blog.generated)
        } catch(error) {
            console.log('Error fetching data', error)
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
                <button onClick={() => fetchOneBlog(blog.id)}>
                    <MenuItem className='menuItem' 
                    icon={<ArticleTwoToneIcon className="icon hover:scale-125"/>}  
                    style={{ backgroundColor: '#030712', maxWidth: '320px' }}>
                        <p className="text-slateLight truncate text-ellipsis text-sm p-1 m-1  
                        hover:bg-darkGreyOpaque 
                        rounded-lg
                        font-robotoRegular">
                            {blog.title}
                        </p>
                    </MenuItem>
                </button>
            </Tooltip>
        </div>
    )
}
