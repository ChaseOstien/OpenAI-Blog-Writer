import { Menu, MenuItem } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SingleBlog from './SingleBlog';
import { Tooltip } from '@mui/material';
import Logout from './Logout';
import '../../App.css';

export default function IconMenu({ collapseSidebar, setCollapseSidebar, newBlog, blogHistory, singleBlog }) {

    return (
        <Menu>
                <Tooltip title="Toggle Menu"
                    enterDelay={500}
                    leaveDelay={50}
                    leaveTouchDelay={200} 
                    placement="bottom-start" 
                    disableInteractive>
                        { collapseSidebar ? (
                            <MenuItem className=''
                                icon={<MenuOutlinedIcon 
                                className='icon hover:scale-125 ' />}
                                onClick={() => setCollapseSidebar(!collapseSidebar)}
                                style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                            </MenuItem> 
                        ) : (
                            <MenuItem className=''
                                onClick={() => setCollapseSidebar(!collapseSidebar)}
                                style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                                {" "} 
                                <h1 className='text-slateLight rounded-lg hover:bg-darkGreyOpaque p-1 focus:scale-90 hover:rounded-lg font-robotoRegular'>
                                    Toggle Menu
                                </h1>
                            </MenuItem>
                        )}
                </Tooltip>
                <Tooltip title="New Blog"
                    enterDelay={500}
                    leaveDelay={50}
                    leaveTouchDelay={200} 
                    placement="bottom-start" 
                    disableInteractive>
                        { collapseSidebar ? ( 
                            <MenuItem className=''
                                icon={<OpenInNewIcon 
                                className='icon hover:scale-125' />}
                                onClick={newBlog}
                                style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                            </MenuItem>
                        ) : (
                            <MenuItem className=''
                                onClick={newBlog}
                                style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                                {" "}
                                <h1 className='text-slateLight rounded-lg hover:bg-darkGreyOpaque p-1 hover:rounded-lg font-robotoRegular'>
                                    New Blog
                                </h1>
                            </MenuItem>
                        )}
                </Tooltip>
                <div className="flex justify-center">
                    <Logout collapseSidebar={collapseSidebar}/>
                </div>
                <div className='scroll'>
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
                    <h2 className='font-bold text-onBackground font-robotoRegular p-2 text-center underline-offset-1'>
                        No saved blogs!
                    </h2>
                    )}
                </div>
        </Menu>
    )
}
