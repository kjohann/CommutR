import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient } from '@tanstack/react-query';
import { Overview } from './pages/overview/Overview';
import { Journey } from './pages/journey/Journey';
import { Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import * as routes from './routes';
import { NewLeg } from './pages/leg/NewLeg';

var queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Route path={routes.home.path} component={Overview} />
        <Route path={routes.journey.path} component={Journey} />
        <Route path={routes.newLeg.path} component={NewLeg} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
)
