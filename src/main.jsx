import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateTrip from './create-trip'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]'
import Mytrips from './my-trips'
// import Footer from './view-trip/components/Footer'
import NotFound from './components/custom/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: 'view-trip/:tripId',
    element: <ViewTrip />
  },
  {
    path: 'my-trips',
    element: <Mytrips />
  },
  {
    path: '*',
    element: <NotFound />
  }
  // Add more routes as needed
])

createRoot(document.getElementById('root')).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </>
)
