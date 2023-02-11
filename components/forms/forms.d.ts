import React from "react"
import { Control, DeepPartial, FieldValues, UseFormHandleSubmit, UseFormReset } from "react-hook-form"
import { DivProps as RNMContainerProps } from "react-native-magnus"

export type IInputState = "success" | "warning" | "danger"


export interface IFormRef<T extends FieldValues> {
    showAlert?: any;
    submit?: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
    reset: UseFormReset<T>
    setFocus: (string) => void
}

export interface IFormProps<T extends FieldValues> extends RNMContainerProps {
    onChange?: (data: T) => void
    onSubmit?: (data: T) => void
    defaultValues?: DeepPartial<T>;
    children: React.ReactElement | React.ReactElement[]
    height?: number | string;
}

export type PropsWithStandardRef<T extends FieldValues> = IFormProps<T> & { ref?: React.Ref<IFormRef<T>> };

export interface ICommonFormProps {
    name: string;
    control?: Control<FieldValues, unknown>;
    label?: string;
    helperText?: string;
    state?: IInputState;
    children: React.ReactElement | React.ReactElement[]
    required?: boolean
}