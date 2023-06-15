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
        mode = "onChange"
    }, ref) => {
        const methods = useReactHookForm({ mode, defaultValues })
        const { control, handleSubmit, reset, watch, formState, setFocus, setValue, getFieldState } = methods

        React.useImperativeHandle(ref, () => ({
            submit: handleSubmit(onSubmit), reset, setFocus, getFormValues: watch, setValue,
            getFormState: () => formState
        }))

        // listen to form changes
        React.useEffect(() => {
            onChange && onChange(watch())

            return () => { }
        }, [watch()])

        //reset form values to empty state after successfully submit form
        React.useEffect(() => {
            if (formState.isSubmitSuccessful) reset()
            return () => { }
        }, [formState.isSubmitSuccessful])

        // reset default values for initial form load
        React.useEffect(() => {
            reset(defaultValues)
            return () => { }
        }, [defaultValues])

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