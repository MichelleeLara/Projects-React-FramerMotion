import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Thanks from './Thanks.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import Thanks from './thanks.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/thanks' element={<Thanks/>}/>
      </Routes>
      {/* <Thanks /> */}
    </React.StrictMode>,
  </BrowserRouter>
)
