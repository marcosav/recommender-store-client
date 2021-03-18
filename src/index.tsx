import React from 'react'
import ReactDOM from 'react-dom'
import './i18n'
import App from './App'
import reportWebVitals from './reportWebVitals'

import './index.css'

ReactDOM.render(
    //<React.StrictMode>
    <App />,
    //</React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals(/*console.log*/)
