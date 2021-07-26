import React, { useEffect, useRef, useState } from 'react'
import { Divider } from 'rsuite'
import CreateRoomBtn from './CreateRoomBtn'
import DashboardToggle from './dashboard/DashboardToggle'
import ChatRoomList from './rooms/ChatRoomList'

const Sidebar = () => {

    const topSideBarRef=useRef();

    const [height, setHeight] = useState(0)
    useEffect(() => {
       if(topSideBarRef.current)
       {
          
           setHeight(topSideBarRef.current.scrollHeight)
       }
      
    }, [topSideBarRef])
    return (
        <div className="h-100 pt-2">
            <div ref={topSideBarRef}>
                <DashboardToggle />
                <CreateRoomBtn />
                <Divider>Join Conversation</Divider>
             </div>  
             <ChatRoomList aboveHeight={height}/>          
        </div>
    )
}

export default Sidebar
