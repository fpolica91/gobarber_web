import React from 'react'
import Signup from './pages/Signup'
import GlobalStyles from './styles/Global'
import AppProvider from './hooks/index'
import ToastContainer from './components/Toast/index'

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Signup />
      </AppProvider>
      <ToastContainer />
      <GlobalStyles />
    </>
  )
}

export default App
