import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AddNew from './components/AddNew.tsx'
import Learn from './components/Learn.tsx'
import Test from './components/Test.tsx'
import Login from './components/Login.tsx'
import Result from './components/Result.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainMenu from './components/MainMenu.tsx'
import SignUp from './components/SignUp.tsx'

const router=createBrowserRouter([
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/',
          element:<MainMenu/>
        },
        {
          path:'add-new',
          element:<AddNew/>
        },
        {
          path:'learn',
          element:<Learn/>
        },
        {
          path:'test',
          element:<Test/>
        },
        {
          path:'results',
          element:<Result/>
        }
      ]
    },
    {
      path : '/auth',
      element: <App/>,
      children : [
        {
          path : 'login',
          element : <Login/>
        },
        {
          path : 'signup',
          element : <SignUp/>
        }
      ]
    }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
