import React from 'react'
import CountryFlag from "react-native-country-flag"
import { Button, Div, Image } from "react-native-magnus"
import { SplashScreen, useRouter } from 'expo-router';
import { Typography } from '@components/typography';
import { Container } from '@components/container';
import { useAuth } from '@providers/AuthProvider';
import { initializeAxios } from '@api/index';
import { ActivityIndicator } from 'react-native';

export default function Landing() {
    const [animationEnded, setAnimationEnded] = React.useState(false)
    const router = useRouter()
    const { authUser, logout, loading: authLoading } = useAuth()

    if (authUser?.accessToken) {
        initializeAxios(authUser?.accessToken)
    }

    React.useEffect(() => {
        setTimeout(() => setAnimationEnded(true), 5000);

        return () => {

        }
    }, [])

    const onButtonPress = () => router.push("(authentication)/login")

    if (authLoading) return (
        <Container fullscreen centered>
            <ActivityIndicator size="large" />
        </Container>
    )

    return (
        <Container fullscreen centered level={2} style={{ gap: 24 }}>
            <Image
                h={100}
                w="100%"
                resizeMode='cover'
                source={animationEnded ? require("@assets/images/brand.png") : require("@assets/images/brand.gif")}
            />
            <Typography variant='p1'>Track your inventory from anywhere</Typography>
            <Button shadow="lg" bg='#fff' rounded="lg" px={24} alignItems='center' onPress={() => onButtonPress()}>
                <Div flexDir='row' flex={1} style={{ gap: 8 }}>
                    <CountryFlag isoCode='my' size={24} />
                    <Typography variant='s1'>+60</Typography>
                    <Typography variant='p1' color='gray600'>Enter your mobile number</Typography>
                </Div>
            </Button>
        </Container>
    )
}