import { useLocation } from 'react-router-dom'
import './App.css'
import useRouteElement from './app/routes/useRouteElement'
import { useEffect } from 'react'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const routeElement = useRouteElement()

  return (
    <>
      <ScrollToTop />
      {routeElement}
    </>
  )
}

export default App
