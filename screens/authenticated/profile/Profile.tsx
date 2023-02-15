import React from 'react'
import { Typography } from '@components/typography'
import { AuthenticatedScreenProps } from '@typings/navigation.d'
import { Avatar, Div, Icon } from 'react-native-magnus'
import { selector } from '@rtk/store'
import { selectCurrentUser } from '@rtk/selectors/currentUser.selector'
import { Button } from '@components/button'
import { Pressable } from 'react-native'
import { AuthContext } from '@providers/AuthProvider'
import { CommonActions } from '@react-navigation/native'

export const Profile = ({ navigation, route }: AuthenticatedScreenProps<"Profile">) => {
    const { userData } = selector(selectCurrentUser)
    const { previousScreen } = route.params
    const {routeNames} = navigation.getState()
    
    const goBack = ()=> navigation.dispatch(CommonActions.navigate(routeNames[previousScreen]))

    const { logout } = React.useContext(AuthContext)

    return (
        <Div flex={1}>
            <Div flex={1} bg="primary" position='relative' px={16}>
                <Div flexDir='row' justifyContent='space-between'>
                    <Pressable onPress={() => goBack()}>
                        <Div mb="md" px={0} py={8}
                            flexDir='row' justifyContent='flex-start'>
                            <Icon name="arrow-back-ios" fontFamily='MaterialIcons' mr="lg" color="white" fontSize="2xl" />
                            <Typography color='white'>
                                Return
                            </Typography>
                        </Div>
                    </Pressable>

                    <Pressable
                        onPress={() => { }}>
                        <Div mb="md" px={0} py={8}
                            flexDir='row' justifyContent='flex-start'>
                            <Typography color='white'>
                                Edit
                            </Typography>
                            <Icon name="edit" fontFamily='MaterialIcons' ml="lg" color="white" fontSize="2xl" />
                        </Div>
                    </Pressable>

                </Div>
                <Div alignItems='center' position='absolute' left={0} right={0} bottom={-25}>
                    <Avatar size={100} fontSize={50} bg='secondary' color='white'>
                        {userData?.fullName[0]}
                    </Avatar>
                </Div>
            </Div>
            <Div flex={2} justifyContent="flex-end" py={32} px={16}>
                <Button
                    block
                    bg='danger'
                    onPress={async () => await (logout && logout())}
                    prefix={<Icon fontFamily='MaterialIcons' fontSize={24} mr={8} name='logout' color='white' />}>
                    Logout
                </Button>
            </Div>
        </Div>
    )
}
