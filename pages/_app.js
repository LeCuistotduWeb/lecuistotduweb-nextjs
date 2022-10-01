import '../styles/app.scss';
import {ThemeProvider} from "../context/themeContext";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {pageview} from "../utils/ga";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', pageview)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return (
      <ThemeProvider>
          <Component {...pageProps} />
      </ThemeProvider>
  )
}
