import React from 'react'
import { ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import CountryFlag from "react-native-country-flag"
import { useNavigation, useRouter } from 'expo-router';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, SlideInDown, set } from "react-native-reanimated"

import { app, auth } from "@configs/firebase.config"
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha"
import { signInWithPhoneNumber } from "firebase/auth"
import { Button, Div, Input, Modal } from 'react-native-magnus';
import { Typography } from '@components/typography';
import { Container } from '@components/container';
import { useAuth } from '@providers/AuthProvider';

type IOnsubmitFunction = (props: { phone?: string, verificationCode?: string | null }) => Promise<void>;

interface ILoginCard {
    onSubmit: IOnsubmitFunction,
    sentOtp: boolean
}

interface IOTPCard {
    onBackPress: () => void,
    onSubmit: IOnsubmitFunction,
    sentOtp: boolean
}

const PhoneInputPrefix = (
    <Div flexDir='row' style={{ gap: 4 }}>
        <CountryFlag isoCode='my' size={20} />
        <Typography variant='p1'>+60</Typography>
    </Div>
)

const LoginCard: React.FC<ILoginCard> = ({ onSubmit }) => {
    const [phone, setPhone] = React.useState("")
    const phoneRef = React.useRef<TextInput>(null)

    React.useEffect(() => {
        if (phoneRef.current) setTimeout(() => phoneRef.current!.focus(), 200);
    }, []);

    return (
        <Container shadow="xs" rounded="md" style={{ gap: 8 }}>
            <Container style={{ gap: 16 }} px={0}>
                <Typography variant='s1'>
                    Authenticate using phone number
                </Typography>
                <Typography>
                    6 digit OTP number will be send to your number for authentication.
                </Typography>
                <Input
                    ref={phoneRef}
                    onChangeText={(text) => setPhone(text)}
                    returnKeyType='done'
                    keyboardType='phone-pad'
                    borderColor='indigo400'
                    placeholder='Enter your phone number'
                    prefix={PhoneInputPrefix} />
            </Container>

            <Button disabled={phone === ""} w="100%" bg='indigo600' onPress={() => onSubmit({ phone })}>
                <Typography color='#fff' variant='s2'>Proceed</Typography>
            </Button>
            <Button w="100%" color='#000' bg='gray400' onPress={() => setPhone("")}>
                <Typography variant='s2'>Reset</Typography>
            </Button>
        </Container>
    )
}

const OTPCard: React.FC<IOTPCard> = ({ onSubmit, onBackPress, sentOtp }) => {

    const { loading: authLoading } = useAuth()
    const [verificationCode, setverificationCode] = React.useState<string | null>(null)
    const inputRef = React.useRef<TextInput>(null)

    React.useEffect(() => {
        if (inputRef.current && sentOtp) setTimeout(() => inputRef.current!.focus(), 200);

        return () => { }
    }, [sentOtp])

    return (
        <Container shadow="xs" rounded="md" style={{ gap: 8 }}>
            <Container style={{ gap: 16 }} px={0}>
                <Typography variant='s1'>
                    Verify OTP number
                </Typography>
                <Typography>
                    6 digit OTP number was sent to your number for authentication.
                </Typography>
                <Input
                    ref={inputRef}
                    borderColor='indigo400'
                    placeholder='Enter OTP number'
                    returnKeyType='done'
                    keyboardType='phone-pad'
                    onChangeText={(text) => setverificationCode(text)} />
            </Container>

            <Button disabled={authLoading} w="100%" bg='green500' onPress={() => onSubmit({ verificationCode })}>
                <Typography color='#fff' variant='s2'>
                    {
                        authLoading ? <ActivityIndicator size="small" /> : "Verify"
                    }
                </Typography>
            </Button>
            <Button w="100%" color='#000' bg='gray400' onPress={() => onBackPress()}>
                <Typography variant='s2'>Back</Typography>
            </Button>
        </Container>
    )

}

export default function Login() {
    const { authenticate, loading: authLoading } = useAuth()

    const firebaseConfig = app.options
    const recaptchaVerifier = React.useRef<FirebaseRecaptchaVerifierModal>(null)

    const [verificationId, setVerificationId] = React.useState<string | null>(null)

    const rotateCard = useSharedValue(0)

    const frontAnimated = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotateCard.value, [0, 1], [0, 180])
        return {
            transform: [
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration: 500 })
                }
            ]
        }
    })

    const backAnimated = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotateCard.value, [0, 1], [180, 360])
        return {
            transform: [
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration: 500 })
                }
            ]
        }
    })

    const login = async (phoneNumber: string) => {

        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current!)
            .then(confirm => {
                if (confirm) {
                    window.confirmationResult = confirm
                    rotateCard.value = 1
                    setVerificationId(confirm.verificationId)
                }
            }).catch(error => console.error("Error while login. Error: ", error))
    }

    const onSubmit: IOnsubmitFunction = async ({ phone, verificationCode }) => {
        if (typeof phone !== "undefined" && !verificationId) {
            await login(`+60${phone}`)
        }
        if (typeof verificationCode !== "undefined" && verificationId && verificationCode) {
            authenticate && await authenticate(verificationCode)
        }
    }

    const onBackPress = () => {
        rotateCard.value = 0
        setVerificationId(null)
    }

    const sentOtp = verificationId !== null

    return (
        <Animated.View entering={SlideInDown}>
            <Container safeTop flex={1} level={2}>
                <FirebaseRecaptchaVerifierModal firebaseConfig={firebaseConfig} ref={recaptchaVerifier} attemptInvisibleVerification />
                <Div position='relative'>
                    <Animated.View style={[style.flipCard, frontAnimated, { zIndex: verificationId ? 0 : 1 }]}>
                        <LoginCard sentOtp={sentOtp} onSubmit={onSubmit} />
                    </Animated.View>
                    <Animated.View style={[style.flipCard, backAnimated, { zIndex: verificationId ? 1 : 0 }]}>
                        <OTPCard sentOtp={sentOtp} onSubmit={onSubmit} onBackPress={() => onBackPress()} />
                    </Animated.View>
                </Div>
            </Container>
        </Animated.View>
    )
}

const style = StyleSheet.create({
    flipCard: {
        width: "100%",
        position: "absolute",
        backfaceVisibility: "hidden",
        top: 0
    }
})