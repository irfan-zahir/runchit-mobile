import { Container } from '@components/container'
import { Typography } from '@components/typography'
import { IStoreModel, IStoreRoleModel } from '@typings/models'
import React from 'react'
import { Avatar, Button, Div, Dropdown, DropdownRef, Icon } from 'react-native-magnus'
import { } from "expo"
import { useAuth } from '@providers/AuthProvider'

const dummyCurrentStore: IStoreModel = {
    name: "Runchit",
    createdAt: Date.now().toString(),
    id: "1",
    address: "taman u"
}

const dummyStores: IStoreModel[] = [
    dummyCurrentStore,
    { ...dummyCurrentStore, id: "2" },
    { ...dummyCurrentStore, id: "3" },
]

const dummyCurrentRole: IStoreRoleModel = {
    id: "1",
    name: "Owner",
    permissions: [],
    storeId: dummyCurrentStore.id
}

const dummyRoles: IStoreRoleModel[] = [dummyCurrentRole]

function ProfileModal() {
    const { logout } = useAuth()

    const onLogout = () => logout && logout()

    return (
        <Container py={8} px={8} safeBottom level={2} h="65%" w="100%" rounded={36} justifyContent='space-between'>
            <Div flex={1}>
                <Div mb={16} bg='indigo600' style={{ position: "relative" }} w="100%" shadow="sm" roundedTop={30} roundedBottom="lg" h={150}>
                    <Avatar fontSize={24} size={70} bg="red300" bottom={-15} shadow="md" position='absolute' alignSelf='center'>
                        S
                    </Avatar>
                </Div>
                <SwitchStoreDropdown stores={dummyStores} currentStore={dummyCurrentStore} />
                <SwitchRoleDropdown roles={dummyRoles} currentRole={dummyCurrentRole} />
            </Div>
            <Button

                block
                bg='red600'
                onPress={onLogout}
                prefix={<Icon
                    style={{ transform: [{ scaleX: -1 }] }}
                    fontSize={16}
                    name='sign-out-alt'
                    fontFamily='FontAwesome5'
                    color='#fff' mr={8} />}
            >
                Logout
            </Button>
        </Container>
    )
}

const OutlinedSwitchButton: React.FC<React.PropsWithChildren<{ onPress: () => void; children: string; color?: string; value: string }>>
    = ({ onPress, children, color = "indigo600", value }) => (
        <Button
            w="100%"
            underlayColor="indigo100"
            rounded="sm"
            bg='transparent'
            onPress={onPress}
            borderBottomWidth={1} borderBottomColor='indigo100'
            suffix={<Icon name='exchange-alt' mr={8} fontFamily='FontAwesome5' color={color} />}
        >
            <Div flexDir='row' px={4} py={8} rounded="lg" alignItems='center'>
                <Typography flex={1} variant='p1'>{children}</Typography>
                <Typography color='indigo300' flex={0.5} variant='p2'>{value}</Typography>
            </Div>
        </Button>
    )

const SwitchStoreDropdown: React.FC<{ stores: IStoreModel[], currentStore: IStoreModel }> = ({ stores, currentStore }) => {
    const dropdownRef = React.useRef<DropdownRef>(null)
    return (
        <>
            <OutlinedSwitchButton onPress={() => dropdownRef.current?.open()} value={currentStore.name}>
                Managing store
            </OutlinedSwitchButton>
            <Dropdown
                h="45%"
                ref={dropdownRef}
                title={
                    <Typography variant='h6' mx="xl" color="indigo400" pb="md">
                        Switch store
                    </Typography>
                }
                pb="2xl"
                showSwipeIndicator={true}
                roundedTop="xl">
                {
                    stores.map(store => (
                        <Dropdown.Option
                            suffix={currentStore.id === store.id && <Icon name='check' fontFamily='Entypo' ml={8} color='teal400' />}
                            bg={currentStore.id === store.id ? "indigo100" : ""}
                            underlayColor='indigo100'
                            key={store.id}
                            value={store.id}
                            px="xl"
                            py="md">
                            {store.name}
                        </Dropdown.Option>
                    ))
                }
            </Dropdown>
        </>
    )
}

const SwitchRoleDropdown: React.FC<{ roles: IStoreRoleModel[], currentRole: IStoreRoleModel }> = ({ roles, currentRole }) => {
    const dropdownRef = React.useRef<DropdownRef>(null)
    return (
        <>
            <OutlinedSwitchButton onPress={() => dropdownRef.current?.open()} value={currentRole.name}>
                Role & Permission
            </OutlinedSwitchButton>
            <Dropdown
                h="45%"
                ref={dropdownRef}
                title={
                    <Typography variant='h6' mx="xl" color="indigo400" pb="md">
                        Switch role
                    </Typography>
                }
                mt="md"
                pb="2xl"
                showSwipeIndicator={true}
                roundedTop="xl">
                {
                    roles.map(role => (
                        <Dropdown.Option
                            suffix={currentRole.id === role.id && <Icon name='check' fontFamily='Entypo' ml={8} color='teal400' />}
                            bg={currentRole.id === role.id ? "indigo100" : ""}
                            underlayColor='indigo100'
                            key={role.id}
                            value={role.id}
                            px="xl"
                            py="md">
                            {role.name}
                        </Dropdown.Option>
                    ))
                }
            </Dropdown>
        </>
    )
}

export default ProfileModal