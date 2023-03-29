import type { AppProps } from 'next/app'
import { Container } from '../styles/pages/app'

import { globalStyles } from '../styles/global'
import { CartContextProvider } from '../contexts/CartContext'
import { Header } from '../components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <CartContextProvider>
      <Container>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
