import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite'
import { useModalState } from '../../../misc/CustomHooks'
import { storage } from '../../../misc/firebase'


const MaxFileSize=1000*1024*5

const AttachmentBtnModal = ({afterUpload}) => {

    const {chatId}=useParams()
    const {isOpen,open,close}=useModalState()

    const [fileList, setFileList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const onChange=(fileArr)=>{

        const filtered=fileArr.filter(el=>el.blobFile.size<=MaxFileSize).slice(0,6)
        setFileList(filtered)

    }

    const onUpload=async()=>{
        try {

            const UploadPromises=fileList.map(f=>{
                return storage.ref(`/chat/${chatId}`).child(Date.now()+f.name).put(f.blobFile,{
                    cacheControl:`public,max-age=${3600*24*3}`
                })
            })

            const UploadSnapshots=await Promise.all(UploadPromises)

            const shapePromises=UploadSnapshots.map(async(snap)=>{
                return{
                    contentType:snap.metadata.contentType,
                    name:snap.metadata.name,
                    url:await snap.ref.getDownloadURL()

                }
            })

            const files=await Promise.all(shapePromises)

            await afterUpload(files)
            setIsLoading(false)
            close()
        } catch (error) {
            setIsLoading(false)
            Alert.error(error.message)
            
        }

    }

    return (
        <>
           <InputGroup.Button onClick={open}>
               <Icon icon="attachment" />
           </InputGroup.Button>

           <Modal show={isOpen} onHide={close}>

               <Modal.Header>
                   <Modal.Title>Upload Files</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <Uploader
                        autoUpload={false}
                        action=""
                        fileList={fileList}
                        onChange={onChange}
                        listType="picture-text"
                        className="w-100"
                        disabled={isLoading}
                        />
               </Modal.Body>
               <Modal.Footer>
                   <Button disabled={isLoading} onClick={onUpload} block >Send to Chat</Button>
                   <div className="text-right mt-2">
                       <small>* Only files less than 5MB allowed</small>
                   </div>
               </Modal.Footer>
           </Modal>
        </>
    )
}

export default AttachmentBtnModal
