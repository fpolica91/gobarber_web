import React from 'react'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'
import { Container, Toast } from './styles'

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDecription={true} type={'error'}>
        <FiAlertCircle size={20} />
        <div>
          <strong>An Error Ocurred</strong>
          <p>Unfortunately you cannot access the application</p>
        </div>
        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
    </Container>
  )
}

export default ToastContainer
