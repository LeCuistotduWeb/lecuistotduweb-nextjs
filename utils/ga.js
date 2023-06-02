export const pageview = (url) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
}

export const event = ({ action, params }) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params)
  }
}

export const CVdownloaded = () => {
  event({
    action: "cv_downloaded",
    params : {}
  })
}

// export const addToCart = (productName) => {
//   event({
//     action: "add_to_cart",
//     params : {
//       product: productName
//     }
//   })
// }

const ga = {
  CVdownloaded,
}

export default ga;