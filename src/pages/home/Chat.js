import React from 'react'
import { useParams } from 'react-router'
import { Loader } from 'rsuite'
import Bottom from '../../components/chat-window/bottom'
import Messages from '../../components/chat-window/messages'
import Top from '../../components/chat-window/top'
import { CurrentRoomProvider } from '../../context/currentRoom.context'
import { useRooms } from '../../context/rooms.context'
import { auth } from '../../misc/firebase'
import { transformToArr } from '../../misc/helper'

const Chat = () => {

    const {chatId}=useParams()

    const rooms=useRooms()

    if(!rooms){
        return <Loader center vertical size="md" content="Loading"  speed="slow" />
    }  

    const currRoom=rooms.find(room=>room.id===chatId)

    if(!currRoom)
    {
        return <h6 className="text-center mt-page">Chat {chatId} not Found</h6>
    }
    const {name,description}=currRoom

    const admins=transformToArr(currRoom.admins)
    const isAdmin=admins.includes(auth.currentUser.uid)

    const currentRoomData={
        name,description,
        admins,isAdmin
    }


    return (
        <CurrentRoomProvider data={currentRoomData}>

           <div className="chat-top">
            <Top />
           </div>

           <div className="chat-middle">
            <Messages />
           </div>

           <div className="chat-bottom">
            <Bottom />
           </div>

        </CurrentRoomProvider>
    )
}

export default Chat
