import React from 'react'
import ReactDOM from 'react-dom/client'
import { Overview } from './pages/overview/Overview';
import { Journey } from './pages/journey/Journey';
import { Route } from 'wouter';
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Route path="/" component={Overview} />
    <Route path="/journey/:id" component={Journey} />
  </React.StrictMode>,
)
