export const pageview = (url) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
}

// log specific events happening.
export const event = ({ action, params }) => {
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