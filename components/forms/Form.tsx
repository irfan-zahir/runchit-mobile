import React from 'react'
import { Div } from "react-native-magnus"
import { useForm as useReactHookForm, FieldValues, FormProvider } from "react-hook-form"
import { IFormProps, IFormRef, PropsWithStandardRef } from './forms.d'

export const useForm: (<T extends FieldValues>() => React.RefObject<IFormRef<T>>) = () => React.createRef()

export const Form: (<T extends FieldValues>(props: PropsWithStandardRef<T>) => React.ReactElement | null)
    = React.forwardRef(({
        height,
        children,
        defaultValues,
        onSubmit,
        onChange,
        ...containerProps
    }, ref) => {
        const methods = useReactHookForm({ mode: "onChange", defaultValues })
        const { control, handleSubmit, reset, watch, formState, setFocus } = methods

        React.useImperativeHandle(ref, () => ({ submit: onSubmit && handleSubmit(onSubmit), reset, setFocus }))

        // listen to form changes
        React.useEffect(() => {
            onChange && onChange(watch())

            return () => { }
        }, [watch()])


        React.useEffect(() => {

            if (formState.isSubmitSuccessful) reset()


            return () => {

            }
        }, [formState.isSubmitSuccessful])


        return (
            <FormProvider {...methods}>
                <Div {...containerProps} alignSelf="stretch" >
                    {
                        Array.isArray(children) ?
                            React.Children.map(
                                children,
                                (child: React.ReactElement) => React.cloneElement(child, { ...child.props, control }))
                            : React.cloneElement(children, { ...children.props, control })
                    }
                </Div>
            </FormProvider>
        )
    })
