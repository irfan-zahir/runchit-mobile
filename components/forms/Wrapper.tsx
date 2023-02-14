import { Typography } from '@components/typography';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { Div, Icon } from 'react-native-magnus';
import { ICommonFormProps as IWrapperProps } from './forms.d';

export const Wrapper: React.FC<React.PropsWithChildren<IWrapperProps>> 
    = ({ label, children, helperText, control, name, required = false, ...props }) => {
        const {getFieldState} = useFormContext()
        
        return (
            <Controller 
            name={name} 
            control={control} 
            rules={{ required: required && "This field is required" }} 
            render={({ field, formState }) => {

                
                const { isValid, isLoading, isDirty, errors } = formState
                const {error} = getFieldState(name)
                const hasError = Object.keys(errors).length > 0
                
                const color = isValid ? "success" : hasError ? "danger" : "warning"

                return (

                    <Div my={4}>
                        {
                            label &&
                            <Div flexDir='row'>
                            <Typography color='primary' variant='subtitle' mb={4}>
                                {label}
                            </Typography>
                                {
                                    required && 
                                    <Div ml={8} flexDir='row'>
                                        <Typography variant='subtitle' color='danger'>*</Typography>
                                        <Typography variant='small' color='danger'>required</Typography>                                    
                                    </Div>
                                }
                            </Div>

                        }

                        {/* input component display here */}
                        {!Array.isArray(children) && React.cloneElement(children, { ...children.props, ...field, onChangeText: field.onChange })}

                        {
                            ((hasError && error) && (isDirty || !isValid)) && <Typography color={color} variant='small' mt={4}>
                                {error?.message?.toString()}
                            </Typography>
                        }
                    </Div>
                )
            }} />
        )
    }
