import React,{memo} from 'react'
import { Link } from 'react-router-dom'
import { ButtonToolbar, Icon } from 'rsuite'
import { useCurrentRoom } from '../../../context/currentRoom.context'
import {useMediaQuery} from '../../../misc/CustomHooks'
import RoomInfoBtnModal from './RoomInfoBtnModal'



const Top = () => {

    const name=useCurrentRoom(v=>v.name)
    const isMobile=useMediaQuery('(max-width:992px)')
    return (
        <div>
           <div className="d-flex justify-content-between align-items-center">
               <h4 className="text-disappear d-flex align-items-center">
                   <Icon icon="arrow-circle-left" componentClass={Link} to='/' size="2x" className={isMobile?'d-inline-block p-0 mr-2 text-blue link-unstyled ':'d-none'} />
                   <span className="text-disappear">{name}</span>
               </h4>

               <ButtonToolbar className="ws-nowrap">Todo</ButtonToolbar>
            </div>
               <div className="d-flex justify-content-between align-items-center">
                    <span>Todo</span>
                    <RoomInfoBtnModal />
               </div>    
            
           
        </div>
    )
}

export default memo(Top)
