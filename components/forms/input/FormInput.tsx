import React from 'react'
import { Input as RNMInput, InputProps as RNMInputProps } from "react-native-magnus"
import { Wrapper } from '../Wrapper'
import { ICommonFormProps } from "../forms.d"

type IWrapperProps = Omit<ICommonFormProps, "children"> 

interface IFormInputProps extends RNMInputProps, IWrapperProps {
  required?: boolean
}

export const FormInput: React.FC<IFormInputProps> = ({ state, helperText, label, name, control, variant, required, ...props }) => {

  const wrapperProps: IWrapperProps = { state, helperText, label, name, control, required }

  const stateProps: Omit<IFormInputProps, "name"> = { borderBottomWidth: 4, borderColor: state ?? "primary" }

  return (
    <Wrapper {...wrapperProps} >
      <RNMInput {...props} {...stateProps} />
    </Wrapper>
  )
}
