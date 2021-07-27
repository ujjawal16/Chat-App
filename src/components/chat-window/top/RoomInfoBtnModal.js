import React from 'react'
import { Button, Modal } from 'rsuite'
import { useCurrentRoom } from '../../../context/currentRoom.context'
import { useModalState } from '../../../misc/CustomHooks'

const RoomInfoBtnModal = () => {

    const {isOpen,open,close}=useModalState()
    const name=useCurrentRoom(v=>v.name)
    const description=useCurrentRoom(v=>v.description)

    return (
        <>
            <Button appearance="link" className="px-2" onClick={open}>
                Room Information
            </Button>
            <Modal show={isOpen} onHide={close}>

                <Modal.Header>
                    <Modal.Title>About {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="mb-1">Description</h6>
                    <p>{description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button  block onClick={close} >Close</Button>
                </Modal.Footer>
            </Modal>
           
        </>
    )
}

export default RoomInfoBtnModal
