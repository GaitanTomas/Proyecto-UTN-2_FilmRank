import React from 'react'
import AppRoutes from './routes/AppRoutes.jsx'
import useScrollToTop from './hooks/useScrollToTop.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useScrollToTop();
  return (
    <>
      <AppRoutes />
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        toastClassName="custom-toast"
      />
    </>
  )
}

export default App