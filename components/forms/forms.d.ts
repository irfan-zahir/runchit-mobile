import React from "react"
import {Control, FieldValues, UseFormHandleSubmit, UseFormReset} from "react-hook-form"
import {DivProps as RNMContainerProps} from "react-native-magnus"

export type IInputState = "success" | "warning" | "danger"


export interface IFormRef {
    showAlert?: any;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
    reset: UseFormReset<FieldValues>
}

export interface IFormProps<T extends FieldValues> extends RNMContainerProps {
    onSubmit: (data: T)=>void
    defaultValues?: DeepPartial<T> | AsyncDefaultValues<T> | undefined;
    children: React.ReactElement | React.ReactElement[]
    height?: number | string;
}

export type PropsWithStandardRef<T extends FieldValues> = IFormProps<T> & { ref?: React.Ref<IFormRef> };

export interface ICommonFormProps {
    name: string;
    control?:Control<FieldValues, unknown>;
    label?: string;
    helperText?: string;
    state?: IInputState;
    children: React.ReactElement
}