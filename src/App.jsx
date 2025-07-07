import React from 'react'
import AppRoutes from './routes/AppRoutes.jsx'
import useScrollToTop from './hooks/useScrollToTop.js';

function App() {
  useScrollToTop();
  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App