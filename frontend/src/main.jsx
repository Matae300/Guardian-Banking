import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Account from './pages/Account.jsx'
import Register from './pages/Signup.jsx'
import Management from './pages/Management.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Problem displaying page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/register',
        element: <Register/>
      }, 
      {
        path: '/account',
        element: <Account/>
      },
      {
        path: '/management',
        element: <Management/>
      } 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)