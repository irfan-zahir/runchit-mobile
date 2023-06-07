import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { Input as RNMInput, InputProps as RNMInputProps } from 'react-native-magnus'
import { ICommonFormProps } from "../form.d"
import { Typography } from '@components/typography';
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputSubmitEditingEventData } from 'react-native';

type IInputProps = ICommonFormProps & RNMInputProps & {
    nextRef?: React.RefObject<TextInput>,
    innerRef?: React.RefObject<TextInput>,
}

export const Input: React.FC<IInputProps> = ({
    name,
    helperText,
    required,
    rules,
    nextRef,
    innerRef,
    ...inputProps
}) => {
    const { getFieldState, clearErrors, control } = useFormContext()

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
                        ? "Something wen wrong"
                        : fieldState.error?.message

                const inputOnchange = (text: string) => {
                    clearErrors(name)
                    field.onChange(text)
                    inputProps.onChangeText && inputProps.onChangeText(text)
                }

                const inputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
                    field.onBlur()
                    inputProps.onBlur && inputProps.onBlur(e)
                }

                const onSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                    if (nextRef && nextRef.current) nextRef.current.focus()
                    inputProps.onSubmitEditing && inputProps.onSubmitEditing(e)
                }

                return (
                    <>
                        <RNMInput
                            shadow="sm"
                            {...inputProps}
                            {...field}
                            value={field.value}
                            ref={innerRef}
                            blurOnSubmit={nextRef ? false : inputProps.blurOnSubmit}
                            borderColor={hasError ? "red600" : "gray400"}
                            onChangeText={inputOnchange}
                            onBlur={inputBlur}
                            onSubmitEditing={onSubmitEditing}
                            returnKeyLabel={nextRef ? "next" : inputProps.returnKeyLabel}
                            returnKeyType={nextRef ? "next" : inputProps.returnKeyType}
                        />
                        <Typography opacity={hasError ? 1 : 0} variant='c1' color='red600'>
                            {errorMessage}
                        </Typography>
                    </>
                )
            }}
            rules={{
                required: !!required,
                ...rules
            }}
        />
    )
}