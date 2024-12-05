import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'


import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDi1fKSC7COTutpuBJndihoHNqIvNCi1v4',
  authDomain: 'elemento-madera.firebaseapp.com',
  projectId: 'elemento-madera',
  storageBucket: 'elemento-madera.appspot.com',
  messagingSenderId: '453764795877',
  appId: '1:453764795877:web:340f79ea07b41da0f6f30c',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <App />,
  //  </React.StrictMode>
)


reportWebVitals()
