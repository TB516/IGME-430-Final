import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import './index.css'
import NeedsAuth from './components/NeedsAuth'
import AccountPortal from './Pages/AccountPortal'
import GenericSpellPage from './Pages/GenericSpellPage'
import AuthBlocker from './components/AuthBlocker'
import Home from './Pages/Home'
import Account from './Pages/Account'

const router = createBrowserRouter([
  {
    path: '',
    element: <NeedsAuth child={<Navbar></Navbar>}></NeedsAuth>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'sorceries',
        element: <GenericSpellPage key='Sorceries' type='Sorceries'></GenericSpellPage>,
      },
      {
        path: 'incantations',
        element: <GenericSpellPage key='Incantations' type='Incantations'></GenericSpellPage>,
      },
      {
        path: 'account',
        element: <Account></Account>
      }
    ]
  },
  {
    path: 'login',
    element: <AuthBlocker child={<AccountPortal></AccountPortal>}></AuthBlocker>
  },
  {
    path: '*',
    element: <h1>This isn't a route, go back now!</h1>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
