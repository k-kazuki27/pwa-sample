if ('serviceWorker' in navigator) {
  window.onload = async () => {
    navigator.serviceWorker.oncontrollerchange = () => {
      window.location.reload()
    }
    const registration = await navigator.serviceWorker.register('/service-worker.js')
    if (registration.waiting) {
      return
    }
    const stateChange = (event) => {
      if (event.target.state === 'installed') {
        if (!registration.waiting) {
          return
        }
        update(registration)
      }
    }

    if (registration.installing) {
      registration.installing.onstatechange = stateChange
    }

    const updateFound = () => {
      registration.installing.onstatechange = stateChange
    }
    registration.onupdatefound = updateFound

    setInterval(() => {
      registration.update()
    }, 10000)
  }
}

const update = (registration) => {
  console.log('start update')
  if (!registration.waiting) {
    return
  }
  registration.waiting.postMessage({ action: 'skipWaiting' })
}
