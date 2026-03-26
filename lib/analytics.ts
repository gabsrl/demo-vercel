export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
export const GA_DEBUG_MODE =
  process.env.NEXT_PUBLIC_GA_DEBUG === 'true' || process.env.NODE_ENV !== 'production'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer?: object[]
  }
}

function emitGtag(...args: unknown[]) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return

  if (typeof window.gtag === 'function') {
    window.gtag(...args)
    return
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

export const initAnalytics = () => {
  emitGtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    debug_mode: GA_DEBUG_MODE,
  })
}

export const pageview = (url: string) => {
  emitGtag('event', 'page_view', {
    page_path: url,
    debug_mode: GA_DEBUG_MODE,
  })
}

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  emitGtag('event', eventName, {
    ...params,
    debug_mode: GA_DEBUG_MODE,
  })
}