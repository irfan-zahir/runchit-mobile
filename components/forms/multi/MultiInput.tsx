import React from 'react'
import { ICommonFormProps } from '../forms.d'

import { Div, DivProps as RNMDivProps, Tag, Icon } from "react-native-magnus"
import { Typography } from '@components/typography'
import { useFormContext } from "react-hook-form"
import { Button } from '@components/button'

interface IMultiInputWrapperProp extends Omit<RNMDivProps, "children">, ICommonFormProps {
    children: React.ReactElement[];
    appendText?: string;
}

export const MultiInputWrapper: React.FC<IMultiInputWrapperProp> = ({
    children, name: groupedName, label, appendText, control, ...containerProps
}) => {

    const {
        setValue: setParentValue,
        formState,
        watch,
        resetField,
        setFocus,
        trigger,
        setError
    } = useFormContext()

    const [fields, setFields] = React.useState<Record<string, any>[]>([])
    const [ableAddMore, setAbleAddMore] = React.useState(false)

    const validateFields = async () => {
        const names = React.Children.map(children, child => `${groupedName}.${fields.length}.${child.props.name}`)
        const validation = await Promise.all(names.map(async (name) => {
            const val = await trigger(name)
            // if(!val) setError(name, {type: "required"})
            return val
        }))
        return validation.indexOf(false) < 0
    }

    const appendField = async () => {
        const newFields = [...watch(groupedName)]
        const validated = await validateFields()
        if (validated) setFields(newFields)
    }


    const removeField = (index: number) => {
        const removed = fields.filter((_, i) => i !== index)
        setFields(removed)
        setParentValue(groupedName, removed)
    }

    const resetMultiInput = () => {
        const names = React.Children.map(children, child => child.props.name)
        names.forEach(name => resetField(`${groupedName}.${fields.length}.${name}`))
        const firstInput = children[0].props.name
        const shouldFocusName = `${groupedName}.${fields.length}.${firstInput}`
        setFocus(shouldFocusName)
    }

    React.useEffect(() => {
        if (fields.length > 0) resetMultiInput()

        return () => { }
    }, [fields])


    React.useEffect(() => {
        if (formState.isSubmitSuccessful) setFields([])

        return () => { }
    }, [formState.isSubmitSuccessful])

    React.useEffect(() => {
        if (watch(groupedName)) {
            const currentGroup = { ...watch(groupedName)[fields.length] }
            const isIncomplete = Object.values(currentGroup).findIndex(val => val === undefined || val === "") > -1

            if (!ableAddMore && !isIncomplete) setAbleAddMore(true)
            if (ableAddMore && isIncomplete) setAbleAddMore(false)
        }

        return () => {

        }
    }, [watch()])



    return (
        <Div {...containerProps}>
            {
                label &&
                <Typography color='primary' variant='subtitle' mb={4}>
                    {label}
                </Typography>
            }

            <Div alignSelf='stretch' flexDir='row' flexWrap='wrap'>
                {fields.length > 0 &&
                    fields.map((field, i) => {
                        const firstInput = children[0].props.name
                        const index = Object.keys(field).findIndex(name => firstInput === name)
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
            <Button
                prefix={<Icon
                    name="pluscircleo"
                    mr="sm"
                    color={ableAddMore ? "primary" : "grey"}
                    fontSize="2xl" />}
                bg={ableAddMore ? "primary" : "grey"}
                variant='bare'
                onPress={() => ableAddMore && appendField()}>
                {appendText ? appendText : `Add more ${groupedName}`}
            </Button>
        </Div>
    )
}
