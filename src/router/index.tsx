import { useRoutes, Navigate } from 'react-router-dom'
import SideMenu from '../layouts/SideMenu'
// import SimpleMenu from '../layouts/SimpleMenu'
// import TopMenu from '../layouts/TopMenu'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Login from '../pages/Login'
import Corporate from '../pages/Corporate'
import Entity from '../pages/Entity'
import { ForgotPassword } from '../pages/Login/ForgotPassword'
import { ConfirmPassword } from '../pages/Login/ConfirmPassword'
import { useDispatch, useSelector } from 'react-redux'

function Router() {
  let authState: any = useSelector(
    (state: any) => state.authentication.authenticationData,
  )

  let routes

  routes = [
    { path: 'Login', element: <Login /> },
    { path: 'ForgotPassword', element: <ForgotPassword /> },
    // { path: 'ForgotPassword', element: <ConfirmPassword /> },
    { path: '*', element:  <Navigate to = "Login"></Navigate>  },
   
  ]
  if (authState === true) {
    routes = [
      { path: '*', element:  <Navigate to = "/Home/user-setup"></Navigate>  },
      {
        path: '/Home',
        // element: <Login />,
        element: <SideMenu />,
        children: [
          {
            path: 'user-setup',
            element: <Page1 />,
          },
          {
            path: 'corporate',
            element: <Corporate />,
          },
          {
            path: 'entity',
            element: <Entity />,
          },
          {
            path: 'add-user',
            element: <Page2 />,
          },
          {
            path: 'edit-user',
            element: <Page2 />,
          },
        ],
      },
    ]
  }

  return useRoutes(routes)
}

export default Router
