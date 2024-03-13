import { Menu, MenuItem } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SingleBlog from './SingleBlog';
import '../../App.css';

export default function IconMenu({ collapseSidebar, setCollapseSidebar, newBlog, blogHistory, singleBlog }) {

    return (
        <Menu>
                    <MenuItem className='menuItem'
                        icon={<MenuOutlinedIcon className='icon hover:scale-125 ' />}
                            onClick={() => setCollapseSidebar(!collapseSidebar)}
                                style={{ textAlign: 'center', backgroundColor: '#030712' }}>
                            {" "} 
                        <h1 className='text-slateLight rounded-lg hover:bg-darkGreyOpaque p-1 focus:scale-90 hover:rounded-lg font-robotoRegular'>Blog History</h1>
                    </MenuItem>
                    <MenuItem className='menuItem'
                        icon={<OpenInNewIcon className='icon hover:scale-125' />}
                        onClick={newBlog}
                                style={{ textAlign: 'center', backgroundColor: '#030712' }}>
                        {" "}
                        <h1 className='text-slateLight rounded-lg hover:bg-darkGreyOpaque p-1 focus:scale-90 hover:rounded-lg font-robotoRegular'>New Blog</h1>
                    </MenuItem>
                    { Array.isArray(blogHistory) && blogHistory.length > 0 ? (
                        blogHistory.map((blog) => (
                            <SingleBlog
                                key={blog.id}
                                blog={blog}
                                singleBlog={singleBlog}
                                collapseSidebar={collapseSidebar}
                            />
                        ))
                    ) : (
                        <h2 className='font-bold text-onBackground font-robotoRegular p-2 text-center underline-offset-1'>No saved blogs!</h2>
                    )}
                </Menu>
    )
}
