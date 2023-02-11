import { Button } from "@components/button";
import { Form, FormInput, useForm } from "@components/forms";
import { Typography } from "@components/typography";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { Keyboard, Pressable } from "react-native";
import { Div, Icon } from "react-native-magnus";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

interface FormSchema {
    search: string;
}

export const SearchableHeader = ({ route, navigation }: NativeStackHeaderProps) => {

    const [focusSearch, setFocusSearch] = React.useState(false)

    const formRef = useForm<FormSchema>()

    const onChange = ({ search }: FormSchema) => {
        // console.log(search)
    }

    if (route.name === "ConfigList")
        return (

            <Div flexDir='row' alignItems="center" my={16} px={16}>
                <Animated.View style={{ flex: 1 }}>
                    <Form<FormSchema> ref={formRef} onChange={onChange}>
                        <FormInput placeholder='Search settings' onFocus={() => setFocusSearch(true)} name='search' borderBottomWidth={1} />
                    </Form>
                </Animated.View>
                {
                    focusSearch &&
                    <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
                        <Button onPress={() => {
                            setFocusSearch(false)
                            Keyboard.dismiss()
                        }} my={3} variant='bare'>Cancel</Button>
                    </Animated.View>
                }
            </Div>
        )

    return (
        <Div flexDir="row" py={16} position="relative" bg="primary" alignItems="center" justifyContent="center">
            <Pressable style={{ position: "absolute", left: 0, top: 0, bottom: 0 }} onPress={() => navigation.navigate("ConfigList")}>
                <Div flex={1} justifyContent="center">
                    <Div flexDir="row" alignItems="center">
                        <Icon color="white" fontFamily="MaterialIcons" name="chevron-left" fontSize={24} mx={8} />
                        <Typography color="white">Back</Typography>
                    </Div>
                </Div>
            </Pressable>
            <Typography variant="title" color="white">{route.name}</Typography>
        </Div>
    )
}