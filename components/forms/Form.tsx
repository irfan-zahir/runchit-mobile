import React from 'react'
import { useForm as useReactHookForm, FieldValues, FormProvider } from "react-hook-form"
import { IFormRef, PropsWithStandardRef } from './form.d'
import { Input } from './input'

export const useForm: (<T extends FieldValues>() => React.RefObject<IFormRef<T>>) = () => React.createRef()

export const Form: (<T extends FieldValues>(props: PropsWithStandardRef<T>) => React.ReactElement | null)
    = React.forwardRef(({
        children,
        defaultValues,
        onChange,
        onSubmit,
        mode
    }, ref) => {
        const methods = useReactHookForm({ mode, defaultValues })
        const { control, handleSubmit, reset, watch, formState, setFocus, setValue } = methods

        React.useImperativeHandle(ref, () => ({
            submit: handleSubmit(onSubmit), reset, setFocus, setValue
        }))

        // listen to form changes
        React.useEffect(() => {
            onChange && onChange(watch())

            return () => { }
        }, [watch()])

        React.useEffect(() => {
            if (formState.isSubmitSuccessful) reset()
            return () => { }
        }, [formState.isSubmitSuccessful])

        return (
            <FormProvider {...methods}>
                {
                    // children
                    React.Children.map(
                        children,
                        (child: React.ReactElement) => React.cloneElement(child, { ...child.props, control })
                    )
                }
            </FormProvider>
        )
    })