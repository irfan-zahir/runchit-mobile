import { Container } from '@components/container'
import { Typography } from '@components/typography'
import capitalize from '@hooks/capitalize'
import { Stack, useRouter, useSegments } from 'expo-router'
import React from 'react'
import { Button, Div, DivProps, Icon, Input } from 'react-native-magnus'
import { Pressable } from 'react-native'

const SearchQRSuffix: React.FC<{ onPress: () => void, searchFocus: boolean }> = ({ onPress, searchFocus }) => {
    return (
        <Pressable onPress={onPress}>
            <Div flexDir='row' alignItems='center'>
                {searchFocus &&
                    <Typography variant='s2' mr={8} color='gray400'>Scan QR</Typography>
                }
                <Icon fontSize={20} name='ios-qr-code' fontFamily='Ionicons' />
            </Div>
        </Pressable>
    )
}

function InventoryLayout() {

    return (
        <Stack initialRouteName='on_shelf' screenOptions={{
            animation: "none",
            header: ({ navigation }) => {
                const router = useRouter()
                const segments = useSegments()
                const { routeNames, history, routes } = navigation.getState()

                const [searchFocus, setSearchFocus] = React.useState(false)

                return (
                    <Container level={2} px={8} py={4} flexGap={8}>
                        <Div flexDir='row' style={{ gap: 8 }}>
                            {
                                routeNames.map((route, i) => {
                                    const isActive = route === routes[routes.length - 1].name
                                    const fullPath = [...segments.slice(0, -1), route].join("/")

                                    //route name only on_shelf & product_list
                                    route = route.split("_").map(r => capitalize(r)).join(" ")

                                    const containerStyle: DivProps = {
                                        flex: 1,
                                        py: 4, px: 8, alignItems: "center", justifyContent: "center",
                                        borderBottomWidth: 1,
                                        borderBottomColor: isActive ? "indigo600" : "transparent"
                                    }

                                    const onPress = () => router.replace(fullPath)

                                    return (
                                        <Button key={i} flex={1} onPress={onPress} p={0} bg='transparent'>
                                            <Div {...containerStyle}>
                                                <Typography variant='s2'>
                                                    {route}
                                                </Typography>
                                            </Div>
                                        </Button>
                                    )
                                })
                            }
                        </Div>
                        <Input
                            returnKeyType='search'
                            onFocus={() => setSearchFocus(true)}
                            onBlur={() => setSearchFocus(false)}
                            suffix={<SearchQRSuffix searchFocus={searchFocus} onPress={() => console.log("scan qr code")} />}
                            placeholder='Search products'
                        />
                    </Container>
                )
            }
        }} />
    )
}

export default InventoryLayout