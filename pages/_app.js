import '../styles/app.scss';
import {ThemeProvider} from "../context/themeContext";

export default function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider>
          <Component {...pageProps} />
      </ThemeProvider>
  )
}
