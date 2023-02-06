import React from 'react'
import { Typography } from '@components/typography'
import { AuthenticatedScreenProps } from '@typings/navigation.d'

export const Profile = (props: AuthenticatedScreenProps<"Profile">) => {
    return (
        <Typography>Profile</Typography>
    )
}
