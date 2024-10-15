import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Tester } from './pages/Tester'
import { Documentation } from './pages/Documentation'
import { Home } from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'tests',
        element: <Tester />,
      },
      {
        path: 'documentation',
        element: <Documentation />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
