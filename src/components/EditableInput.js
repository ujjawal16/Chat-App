import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'

const EditableInput = ({initialValue,onSave,label=null,
                        placeholder="Write your value", emptyMsg="Input is empty",...inputProps}) => {
                
            const [input, setInput] = useState(initialValue)
            const [isEditable, setIsEditable] = useState(false)

            const onInputChange=useCallback((value)=>{
                setInput(value)
            },[])

            const onEditClick=useCallback(()=>{
                setIsEditable(p=>!p)
                setInput(initialValue)
            },[initialValue])

            const onSaveClick=async()=>{
                const trim=input.trim()
                if(trim==='')
                {
                    Alert.info(emptyMsg,400)
                }
                if(trim!==initialValue)
                {
                    await onSave(trim)
                }

                setIsEditable(false)

            }
    return (
        <div>

           {label}
           <InputGroup>
           <Input disabled={!isEditable} {...inputProps} placeholder={placeholder} value={input} onChange={onInputChange} />
           <InputGroup.Button onClick={onEditClick}>
           <Icon icon={isEditable?'close':'edit2'} />
           </InputGroup.Button>
           {isEditable&&
            <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
            </InputGroup.Button>
           }
           </InputGroup>
        </div>
    )
}

export default EditableInput
