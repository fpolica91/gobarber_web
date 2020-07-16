import React, { useCallback, useRef } from 'react'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import logo from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Content, Background } from './styles'
import getValidationError from '../../utilities/getValidationError'
export interface SignInProps {}

const SignIn: React.SFC<SignInProps> = () => {
  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required().email('Email is required'),
        password: Yup.string().min(5, 'Password must be at least 6 characters'),
      })
      await schema.validate(data, {
        abortEarly: false,
      })
    } catch (error) {
      const errors = getValidationError(error)
      formRef.current?.setErrors(errors)
    }
  }, [])

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{ name: 'Fabricio', email: 'admin@test.com' }}
        >
          <Input name="name" type="text" placeholder="name" icon={FiUser} />
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon={FiLock}
          />
          <Button type="submit">Register</Button>
          <a href="forgot">Forgot my password</a>
        </Form>
        <a href="signup">
          <FiArrowLeft size={16} />
          Log In
        </a>
      </Content>
    </Container>
  )
}

export default SignIn
