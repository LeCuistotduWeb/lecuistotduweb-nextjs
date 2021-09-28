import '../styles/bases/globals.scss'
import {AuthProvider} from "../auth/authContext";

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  )
}

export default MyApp
