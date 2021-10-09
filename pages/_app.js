import '../styles/bases/globals.scss'
import {AuthProvider} from "../context/authContext"
import {ThemeProvider} from "../context/themeContext";

function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
      </ThemeProvider>
  )
}

export default MyApp
