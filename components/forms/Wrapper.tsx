import { Typography } from '@components/typography';
import React from 'react'
import { Controller } from 'react-hook-form';
import { Div } from 'react-native-magnus';
import { ICommonFormProps as IWrapperProps } from './forms.d';

export const Wrapper: React.FC<React.PropsWithChildren<IWrapperProps>> = ({ label, children, helperText, control, name, ...props }) => {

    return (
        <Controller name={name} control={control} render={({ field, formState }) => {

            const { isValid, isLoading, isDirty } = formState

            const color = isValid ? "success" : isDirty ? "warning" : "danger"

            return (

                <Div my={4}>
                    {
                        label &&
                        <Typography color='primary' variant='subtitle' mb={4}>
                            {label}
                        </Typography>
                    }

                    {/* input component display here */}
                    {!Array.isArray(children) && React.cloneElement(children, { ...children.props, ...field, onChangeText: field.onChange })}

                    {
                        (helperText && isDirty || !isValid) && <Typography color={color} variant='small' mt={4}>
                            {helperText}
                        </Typography>
                    }
                </Div>
            )
        }} />
    )
}
