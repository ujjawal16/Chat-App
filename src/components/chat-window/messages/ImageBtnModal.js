import React from "react"
import { Modal } from "rsuite"
import { useModalState } from "../../../misc/CustomHooks"

const ImageBtnModal = ({src,filename}) => {

    const {isOpen,open,close}=useModalState()
    return (
        <>
        <input type="image" alt="file" src={src} onClick={open} className="mw-100 mh-100 w-auto" />
        <Modal show={isOpen} onHide={close} >
            <Modal.Header>
                <Modal.Title>{filename}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <img src={src} height="100%" width="100%" alt="file" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <a href={src} target="_blank" rel="noopener noreferrer">
                    View Original
                </a>
            </Modal.Footer>
        </Modal>

            
        </>
    )
}

export default ImageBtnModal
