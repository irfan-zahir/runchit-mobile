import React from 'react'
import { Input as RNMInput, InputProps as RNMInputProps } from "react-native-magnus"
import { Wrapper } from '../Wrapper'
import { ICommonFormProps } from "../forms.d"
import { Keyboard, TextInput } from 'react-native'

type IWrapperProps = Omit<ICommonFormProps, "children">

interface IFormInputProps extends RNMInputProps, IWrapperProps {
  required?: boolean;
  ref?: React.Ref<TextInput>
}

export const FormInput: React.FC<IFormInputProps> = React.forwardRef(({
  state, helperText, label, name, control, variant, required, ...props
}, ref) => {

  const wrapperProps: IWrapperProps = { state, helperText, label, name, control, required }

  const stateProps: Omit<IFormInputProps, "name"> = { borderBottomWidth: 4, borderColor: state ?? "primary" }

  return (
    <Wrapper {...wrapperProps} >
      <RNMInput {...stateProps} {...props} onBlur={() => Keyboard.dismiss()} ref={ref} />
    </Wrapper>
  )
})
