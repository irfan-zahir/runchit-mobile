import { Container } from '@components/container'
import { Typography } from '@components/typography'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, Div, Icon, Tag } from 'react-native-magnus';
import { Keyboard, TextInput } from 'react-native';
import { Input } from '@components/forms/input';
import { Form, IFormRef, useForm } from '@components/forms';
import { MultiWrapper } from '@components/forms/MultiWrapper';
import PagerView from 'react-native-pager-view';
import { useAuth } from '@providers/AuthProvider';
import { registerOwner } from '@api/users.api';
import { useRouter } from 'expo-router';
import axios from 'axios';

interface IStoreField {
    name: string;
    location: string
}

interface IFormFields {
    fullName: string;
    stores: IStoreField[]
}

function Registration() {

    const router = useRouter()
    const { logout } = useAuth()
    const formRef = useForm<IFormFields>()

    const submitForm = () =>// console.log(axios.defaults.headers)
        formRef.current?.submit && formRef.current?.submit()

    const onSubmit = async (formFields: IFormFields) => registerOwner(formFields).then(({ createdUser, error }) => {
        router.replace("runchit/dashboard")
        setPageIndex(0)
    })

    const onLogout = () => logout && logout()

    const pagerRef = React.useRef<PagerView>(null)
    const [pageIndex, setPageIndex] = React.useState(0)

    const next = () => setPageIndex(pageIndex + 1)

    React.useEffect(() => {
        if (pagerRef && pagerRef.current) pagerRef.current.setPage(pageIndex)

        return () => { }
    }, [pageIndex])


    const pagerCardStyle = {
        m: 16, flex: 1, px: 8, py: 24, rounded: "lg",
    }

    return (
        <Container px={0} rounded="lg" h="85%" w="100%" justifyContent='center' safeBottom pt={24}>
            <Div px={16} flexDir='row' justifyContent='space-between'>
                <Button
                    px={0}
                    bg='transparent'
                    onPress={onLogout}
                    prefix={<Icon
                        style={{ transform: [{ scaleX: -1 }] }}
                        fontSize={16}
                        name='sign-out-alt'
                        fontFamily='FontAwesome5'
                        color='red600' mr={8} />}
                >
                    <Typography color='red600' variant='s2'>
                        Logout
                    </Typography>
                </Button>
                <Button
                    px={0}
                    bg='transparent'
                    prefix={<Icon
                        style={{ transform: [{ scaleX: -1 }] }}
                        fontSize={16}
                        name='headphones-alt'
                        fontFamily='FontAwesome5'

                        color='indigo400' mr={8} />}>
                    <Typography color='indigo400' variant='s2'>
                        Help
                    </Typography>
                </Button>
            </Div>
            <Typography px={16} color='indigo600' variant='h5'>Welcome to Runchit</Typography>
            <Form<IFormFields> ref={formRef} onSubmit={onSubmit} mode='onSubmit'>
                <PagerView
                    scrollEnabled={pageIndex !== 0}
                    ref={pagerRef}
                    style={{ flex: 1, width: '100%' }}
                    initialPage={0}>
                    <Container key={1} {...pagerCardStyle}>
                        <Div mb={16}>
                            <Typography variant='s1' color='indigo600'>Tell us your name.</Typography>
                            <Typography>You can always update your profile later.</Typography>
                        </Div>
                        <Input
                            required
                            name='fullName'
                            placeholder='Your full name'
                            returnKeyType='done'
                            returnKeyLabel='done' />
                    </Container>
                    <Container key={2} {...pagerCardStyle}>
                        <Div mb={16}>
                            <Typography variant='s1' color='indigo600'>Tell us about your store.</Typography>
                            <Typography>Manage all your store on the go. </Typography>
                        </Div>
                        <MultiWrapper name='stores' bordered={false}>
                            <Input
                                required
                                name='name'
                                placeholder='Store name'
                                returnKeyType='done'
                                returnKeyLabel='done'
                            />
                            <Input
                                name='location'
                                placeholder='Store location'
                                style={{ alignItems: "flex-start" }}
                                multiline
                                numberOfLines={4}
                                textAlignVertical='top'
                                blurOnSubmit
                                returnKeyType='done'
                                h={75} />
                        </MultiWrapper>
                    </Container>
                </PagerView>
            </Form>
            <Div px={16} shadow="sm" flexDir='row' alignSelf='flex-end' style={{ gap: 16 }}>
                <Button bg='indigo600' flex={1} onPress={() => pageIndex === 0 ? next() : submitForm()}>
                    {pageIndex === 0 ? "Next" : "Register"}
                </Button>
            </Div>
        </Container>
    )
}

export default Registration