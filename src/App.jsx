import { useState } from 'react'



import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(

      <>
        <Route  path='/' element={<Login/>} />
        <Route  path='/registration' element={<Registration/>} />
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
