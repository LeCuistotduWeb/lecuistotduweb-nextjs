export const pageview = (url) => {
  // @ts-ignore
  console.log({url});
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    // @ts-ignore
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
}

// log specific events happening.
export const event = ({ action, params }) => {
  // @ts-ignore
  window.gtag('event', action, params)
}

export const addToCart = (productName) => {
  event({
    action: "add_to_cart",
    params : {
      product: productName
    }
  })
}