import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { InsurancesType } from './mocks/summary.mock.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App
        storeToken="691c8caf6d186e46500cbc3e"
        insuranceType={InsurancesType.DRIVE_INSURANCE}
      />
    </QueryClientProvider>
  </StrictMode>
);
