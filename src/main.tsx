import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Journey } from './pages/journey/Journey';
import { Route } from 'wouter';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Route path="/" component={App} />
    <Route path="/journey/:id" component={Journey} />
  </React.StrictMode>,
)
