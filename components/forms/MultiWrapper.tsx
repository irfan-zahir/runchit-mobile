import React from 'react'
import { Control, FieldValues, useFormContext } from 'react-hook-form';
import { Container, Typography } from '..';
import { Button, Div, Icon, Tag, DivProps } from 'react-native-magnus';

export interface IMultiWrapperRef<T extends FieldValues> {
    addMore: () => void;
    removeField: (i: number) => void;
    fields: T[]
}

interface IMultiWrapperProps extends DivProps {
    name: string;
    children: React.ReactElement[];
    title?: string;
    bordered?: boolean
}


export const MultiWrapper: React.FC<IMultiWrapperProps> = ({
    name: groupedName,
    children,
    title,
    bordered = true,
    ...containerProps
}) => {
    const {
        setValue: setParentValue, formState, watch, resetField, trigger, control
    } = useFormContext();

    const [fields, setFields] = React.useState([] as any[]);

    const validateFields = async () => {
        const index = watch(groupedName)?.length ?? 1 - 1
        const names = React.Children.map(children, child => `${groupedName}.${fields.length}.${child.props.name}`);
        const validation = await Promise.all(names.map(async (name) => await trigger(name)));
        if (validation && validation.indexOf(false) < 0) return index
        return -1
    };

    const resetMultiInput = () => {
        const names = React.Children.map(children, child => child.props.name);
        names.forEach(name => resetField(`${groupedName}.${fields.length}.${name}`));
    };

    const addMore = async () => {
        const newFields = watch(`${groupedName}.${fields.length}`)
        const validated = await validateFields()
        if (validated && validated > -1) setFields([...fields, newFields])
    };

    const removeField = (index: number) => {
        const removed = fields.filter((_, i) => i !== index);
        setFields(removed);
        setParentValue(groupedName, removed);
    };

    React.useEffect(() => {
        if (fields.length > 0) resetMultiInput();

        return () => { };
    }, [fields]);

    React.useEffect(() => {
        if (formState.isSubmitSuccessful)
            setFields([]);

        return () => { };
    }, [formState.isSubmitSuccessful]);

    const label = title ?? `Add ${groupedName}`

    if (bordered) containerProps = { ...containerProps, borderWidth: 1, borderColor: "#cbd5e0" }

    return (
        <>
            {
                title &&
                <Typography>
                    {label}
                </Typography>
            }

            <Container
                px={4}
                py={12}
                rounded="xl"
                {...containerProps}>
                {
                    React.Children.map(
                        children,
                        (child) => {
                            let { name, ...props } = child.props;
                            name = `${groupedName}.${fields.length}.${name}`;
                            return React.cloneElement(child, { ...props, name, control });
                        })
                }

                <Div flexDir='row' flexWrap='wrap' mt={8} style={{ rowGap: 4, columnGap: 8 }} shadow="xs">
                    <Button px={12} py={6} bg='indigo600' onPress={addMore}
                        prefix={<Icon mr={8} name="plus" color="#fff" fontSize={16} />}>
                        {label}
                    </Button>
                    {
                        fields &&
                        fields.map((store, i) => {
                            const onPress = () => removeField(i)

                            return (
                                <Tag
                                    key={i}
                                    suffix={<RemoveIcon onPress={onPress} />}>
                                    {store.name}
                                </Tag>
                            )
                        })
                    }
                </Div>
            </Container>
        </>
    )
}

interface IRemoveIconProps {
    onPress: () => void
}

const RemoveIcon: React.FC<IRemoveIconProps> = ({ onPress }) => {
    return (
        <Button p={0} ml={8} bg='transparent' onPress={onPress} alignSelf='center'>
            <Icon name="close" color="red600" fontSize={16} />
        </Button>
    )
}