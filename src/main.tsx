import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient } from '@tanstack/react-query';
import { Overview } from './pages/overview/Overview';
import { Journey } from './pages/journey/Journey';
import { Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';

var queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Route path="/" component={Overview} />
        <Route path="/journey/:journeyId" component={Journey} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
)
