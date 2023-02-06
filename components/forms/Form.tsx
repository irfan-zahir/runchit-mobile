import React from 'react'
import { Div } from "react-native-magnus"
import { useForm as useReactHookForm, FieldValues } from "react-hook-form"
import { IFormProps, IFormRef, PropsWithStandardRef } from './forms.d'

export const useForm = () => React.createRef<IFormRef>()

export const Form: (<T extends FieldValues>(props: PropsWithStandardRef<T>) => React.ReactElement | null)
    = React.forwardRef(({
        height,
        children,
        defaultValues,
        onSubmit,
        ...containerProps
    }, ref) => {
        const { control, handleSubmit, reset, watch, formState } = useReactHookForm({ mode: "onChange", defaultValues })

        React.useImperativeHandle(ref, () => ({ submit: handleSubmit(onSubmit), reset }))

        React.useEffect(() => {

            if (formState.isSubmitSuccessful) reset()


            return () => {

            }
        }, [formState.isSubmitSuccessful])


        return (
            <Div {...containerProps} flex={1} alignSelf="stretch" bg="white" >
                {
                    Array.isArray(children) ?
                        React.Children.map(
                            children,
                            (child: React.ReactElement) => React.cloneElement(child, { ...child.props, control }))
                        : React.cloneElement(children, { ...children.props, control })
                }
            </Div>
        )
    })
