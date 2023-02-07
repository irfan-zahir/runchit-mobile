import React from 'react'
import { ICommonFormProps } from '../forms.d'

import { Div, DivProps as RNMDivProps, Tag, Icon } from "react-native-magnus"
import { Typography } from '@components/typography'
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import { Button } from '@components/button'

interface IMultiInputWrapperProp extends Omit<RNMDivProps, "children">, ICommonFormProps {
    children: React.ReactElement[];
    appendText?: string;
}

export const MultiInputWrapper: React.FC<IMultiInputWrapperProp> = ({
    children, name: groupedName, label, appendText, control, ...containerProps
}) => {

    const { setValue: setParentValue, formState, watch, resetField } = useFormContext()

    const [fields, setFields] = React.useState<Record<string, any>[]>([])

    const resetMultiInput = () => {
        const names = React.Children.map(children, child => child.props.name)

        names.forEach(name => { console.log(name); resetField(name) })
    }

    const appendField = () => {
        const newFields = watch(groupedName)
        console.log({ newFields, fields })
        setFields(newFields)
        // resetMultiInput()
        resetField("shopName")
    }


    const removeField = (index: number) => {
        const removed = fields.filter((_, i) => i !== index)
        setFields(removed)
        setParentValue(groupedName, removed)
    }


    return (
        <Div {...containerProps}>
            {
                label &&
                <Typography color='primary' variant='subtitle' mb={4}>
                    {label}
                </Typography>
            }

            <Div alignSelf='stretch' flexDir='row' flexWrap='wrap'>
                {
                    fields.map((field, i) => {
                        const firstField = children[0].props.name
                        const index = Object.keys(field).findIndex(name => firstField === name)
                        const title = Object.values(field)[index]
                        return <Tag
                            key={i}
                            onPress={() => removeField(i)}
                            ml="sm"
                            mb="sm"
                            bg='primary'
                            color='white'
                            suffix={<Icon name="close" ms="sm" color="white" fontSize="caption" />}>
                            {title}
                        </Tag>
                    })
                }
            </Div>

            {
                Array.isArray(children) &&
                React.Children.map(
                    children,
                    (child: React.ReactElement<ICommonFormProps>) => {
                        let { name, ...props } = child.props
                        name = `${groupedName}.${fields.length}.${name}`
                        return React.cloneElement(child, { ...props, control, name })
                    })
            }
            <Button my={8} onPress={() => appendField()}>{appendText ? appendText : `Add more ${groupedName}`}</Button>
        </Div>
    )
}
