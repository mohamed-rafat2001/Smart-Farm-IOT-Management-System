import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { queryClient } from './shared/utils/queryClient.js';
import { Router } from './routing/Router.jsx';
import { NotificationProvider } from './features/notifications';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position="bottom-right"
          gutter={12}
          containerStyle={{ margin: '8px', zIndex: 999999 }}
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: '#10b981',
                color: '#fff',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              borderRadius: '12px',
            },
          }}
        />
        <RouterProvider router={Router} />
      </NotificationProvider>
    </QueryClientProvider>
  );
}
export default App;
