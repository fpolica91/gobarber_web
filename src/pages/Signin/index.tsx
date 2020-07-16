import React, { useRef, useCallback } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import * as Yup from 'yup'
import logo from '../../assets/logo.svg'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Content, Background } from './styles'
import getValidationError from '../../utilities/getValidationError'
export interface SignInProps {}

const SignIn: React.SFC<SignInProps> = () => {
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string().email().required('Please enter a valid email'),
        password: Yup.string().required('Please enter your password'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(data)
    } catch (error) {
      const errors = getValidationError(error)
      formRef.current?.setErrors(errors)
    }
  }, [])

  const formRef = useRef<FormHandles>(null)
  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon={FiLock}
          />
          <Button type="submit">Log In</Button>
          <a href="forgot">Forgot my password</a>
        </Form>
        <a href="signup">
          <FiLogIn size={16} />
          Create Account
        </a>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
