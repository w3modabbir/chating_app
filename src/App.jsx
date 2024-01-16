import { useState } from 'react'



import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Home from './pages/home/Home';
import RootLayout from './componants/layout/RootLayout';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(

      <>
        <Route  path='/' element={<Login/>} />
        <Route  path='/registration' element={<Registration/>} />
        <Route element={<RootLayout/>}>
          <Route  path='/home' element={<Home/>} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider
      router={router}
      />
    </>
  )
}

export default App
