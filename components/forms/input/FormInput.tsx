import React from 'react'
import { Input as RNMInput, InputProps as RNMInputProps } from "react-native-magnus"
import { Wrapper } from '../Wrapper'
import { IInputState, ICommonFormProps } from "../forms.d"

interface IFormInputProps extends RNMInputProps, Omit<ICommonFormProps, "children"> {

}

export const FormInput: React.FC<IFormInputProps> = ({ state, helperText, label, name, control, variant, ...props }) => {

  const wrapperProps = { state, helperText, label, name, control }

  const stateProps: Omit<IFormInputProps, "name"> = { borderBottomWidth: 4, borderColor: state ?? "primary" }

  return (
    <Wrapper {...wrapperProps} >
      <RNMInput {...props} {...stateProps} />
    </Wrapper>
  )
}
