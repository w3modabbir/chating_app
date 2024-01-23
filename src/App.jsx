
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Home from './pages/home/Home';
import Notification from './pages/notification/Notification';
import Settings from './pages/setting/Settings';
import LoginOut from './pages/loginout/LoginOut';
import RootLayout from "./componants/layout/RootLayout";
import Message from "./pages/message/Message";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route  path='/' element={<Login/>} />
        <Route  path='/registration' element={<Registration/>} />
        <Route element={<RootLayout/>}>
          <Route  path='/home' element={<Home/>} />
          <Route  path='/message' element={<Message/>} />
          <Route  path='/notification' element={<Notification/>} />
          <Route  path='/settings' element={<Settings/>} />
          <Route  path='/loginout' element={<LoginOut/>} />
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
