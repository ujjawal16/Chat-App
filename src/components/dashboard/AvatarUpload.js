
import React, { useState,useRef } from 'react'
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import {useModalState} from '../../misc/CustomHooks'
import { useProfile } from '../../context/profile.context';
import { database, storage } from '../../misc/firebase';
import ProfileAvatar from './ProfileAvatar';

const fileTypes='.png, .jpeg, .jpg';

const acceptedFileTypes=['image/png','image/jpeg','image/pjpeg']

const isValidFile=file=>acceptedFileTypes.includes(file.type)

const getBlob=canvas=>{
    return new Promise((resolve,reject)=>{
        canvas.toBlob(blob=>{
            if(blob)
            {
                resolve(blob)
            }
            else{
                reject(new Error('File Process Error'))
            }
        })
    })
}


const AvatarUpload = () => {
    

    const {isOpen,open,close}=useModalState()
    const [ image,setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {profile}=useProfile()

    const avatarEditorRef=useRef()

    const onFileInputChange=(e)=>{
        const currFiles=e.target.files;

        if(currFiles.length===1)
        {
            const file=currFiles[0];
            if(isValidFile(file))
            {
                setImage(file)
                open()
            }
            else{
                Alert.warning(`Wrong file type ${file.type}`,4000)
            }
            
        }
    }

    const onUploadClick=async()=>{
        const canvas=avatarEditorRef.current.getImageScaledToCanvas();
        setIsLoading(true)

        try {
            const blob=await getBlob(canvas)

            const avatarRef=storage.ref(`/profile/${profile.uid}`).child('avatar')

            const uploadAvatarResult=await avatarRef.put(blob,{
                cacheControl:`public,max-age=$(3600*24*3)`
            })
            const downloadUrl=await uploadAvatarResult.ref.getDownloadURL()
            const userAvatarRef=database.ref(`/profiles/${profile.uid}`).child('avatar')

            userAvatarRef.set(downloadUrl)
            setIsLoading(false)
            Alert.info('Avatar has been uploaded',4000)
        } catch (error) 
        {
            setIsLoading(false)
            Alert.error(error.message,4000)
        }
    }
    
    return (

        <div className="mt-3 text-center">

            <ProfileAvatar src={profile.avatar} name={profile.name}  className="width-200 height-200 img-fullsize font-huge"/>
            <div>
                <label htmlFor="avatar-upload" className="d-block cursor-pointer padded">
                    Select New Avataar
                    <input 
                    id="avatar-upload" type="file" className="d-none" accept={fileTypes} onChange={onFileInputChange}/>
                </label>

                <Modal show={isOpen} onHide={close} >
                    <Modal.Header>
                        <Modal.Title>Upload New Avatar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center align-items-center">
                        {image&&
                        <AvatarEditor
                        ref={avatarEditorRef}
                        image={image}
                        width={200}
                        height={200}
                        border={10}
                        borderRadius={100}
                        rotate={0}
                      />}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
                            Upload New Avatar
                        </Button>;
                    </Modal.Footer>

                </Modal>
            </div>
            
        </div>
    )
}

export default AvatarUpload
