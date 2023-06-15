import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { Div, Icon, Input as RNMInput, InputProps as RNMInputProps, Skeleton } from 'react-native-magnus'
import { ICommonFormProps } from "../form.d"
import { Typography } from '@components/typography';
import { NativeSyntheticEvent, Pressable, TextInput, TextInputFocusEventData, TextInputSubmitEditingEventData } from 'react-native';
import { Link, useNavigation, usePathname, useRouter } from 'expo-router';

type IInputProps = ICommonFormProps & RNMInputProps & {
    nextRef?: React.RefObject<TextInput>,
    innerRef?: React.RefObject<TextInput>,
    scanQR?: boolean,
    disabled?: boolean,
    loading?: boolean,
}

export const Input: React.FC<IInputProps> = ({
    name,
    helperText,
    required,
    rules,
    nextRef,
    innerRef,
    scanQR = false,
    loading,
    disabled,
    ...inputProps
}) => {
    const router = useRouter()
    const navigation = useNavigation()
    const currentPath = usePathname()
    const { getFieldState, clearErrors, control, watch, setValue } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {

                const { error } = getFieldState(name)

                const hasError = typeof error !== "undefined"
                const errorMessage = fieldState.error?.type === "required"
                    ? "This field is required"
                    : fieldState.error?.message === ""
                        ? "Something went wrong"
                        : fieldState.error?.message

                const inputOnchange = (text: string) => {
                    clearErrors(name)
                    field.onChange(text)
                    inputProps.onChangeText && inputProps.onChangeText(text)
                }

                const inputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
                    field.onBlur()
                    setInputFocus(false)
                    inputProps.onBlur && inputProps.onBlur(e)
                }

                const onSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                    if (nextRef && nextRef.current) nextRef.current.focus()
                    inputProps.onSubmitEditing && inputProps.onSubmitEditing(e)
                }

                const [inputFocus, setInputFocus] = React.useState(false)
                const onSuffixPress = () =>
                    router.replace({ pathname: "/runchit/modal/fab_scanner", params: { hook_path: currentPath, formValues: JSON.stringify(watch()) } })

                return (
                    <Div mb={4}>
                        {
                            inputProps.defaultValue && <Typography variant='s2' mb={4}>{inputProps.placeholder}</Typography>
                        }
                        {
                            loading
                                ? <Skeleton h={47} />
                                : (

                                    <RNMInput
                                        shadow="sm"
                                        editable={!disabled}
                                        bg={disabled ? "gray300" : "#fff"}
                                        color={disabled ? 'gray600' : "#000"}
                                        {...inputProps}
                                        {...field}
                                        value={typeof field.value === "number" ? field.value.toString() : field.value}
                                        ref={innerRef}
                                        blurOnSubmit={nextRef ? false : inputProps.blurOnSubmit}
                                        borderColor={hasError ? "red600" : "gray400"}
                                        onChangeText={inputOnchange}
                                        onBlur={inputBlur}
                                        onFocus={() => setInputFocus(true)}
                                        onSubmitEditing={onSubmitEditing}
                                        returnKeyLabel={nextRef ? "next" : inputProps.returnKeyLabel}
                                        returnKeyType={nextRef ? "next" : inputProps.returnKeyType}
                                        suffix={
                                            scanQR && (
                                                <Pressable onPress={onSuffixPress}>
                                                    <Div flexDir='row' alignItems='center'>
                                                        {inputFocus &&
                                                            <Typography variant='s2' mr={8} color='indigo300'>Scan Barcode</Typography>
                                                        }
                                                        <Icon fontSize={20} name='ios-qr-code' fontFamily='Ionicons' color="indigo300" />
                                                    </Div>
                                                </Pressable>
                                            )
                                        }
                                    />
                                )
                        }
                        <Typography my={4} opacity={hasError ? 1 : 0} variant='c1' color='red600'>
                            {errorMessage}
                        </Typography>
                    </Div>
                )
            }}
            rules={{
                required: !!required,
                ...rules
            }}
        />
    )
}