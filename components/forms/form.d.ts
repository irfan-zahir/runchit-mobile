
import { DeepPartial, FieldValues, UseFormReset, UseFormSetValue, Control, UseControllerProps, ValidationMode, UseFormWatch, FormState } from "react-hook-form"

export interface IFormRef<T extends FieldValues> {
    showAlert?: any;
    submit?: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
    reset: UseFormReset<T>
    getFormValues: UseFormWatch<T>
    setValue: UseFormSetValue<T>
    getFormState: () => FormState<T>
}

export interface IFormProps<T extends FieldValues> {
    onChange?: (data: T) => void
    onSubmit: (data: T) => void
    defaultValues?: DeepPartial<T>;
    children: React.ReactElement | React.ReactElement[];
    mode?: keyof ValidationMode
}

export type PropsWithStandardRef<T extends FieldValues> = IFormProps<T> & { ref?: React.Ref<IFormRef<T>> };

interface ICommonFormProps {
    name: string;
    control?: Control<FieldValues, unknown>;
    helperText?: string;
    required?: string | boolean;
    rules?: UseControllerProps["rules"]
}