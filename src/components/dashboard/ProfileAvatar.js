import React from 'react'
import { Avatar } from 'rsuite'
import { getInitalName } from '../../misc/helper'

const ProfileAvatar = ({name,...avatarProps}) => {
    return (
        <Avatar circle {...avatarProps}>
            {getInitalName(name)}
        </Avatar>
    )
}

export default ProfileAvatar
