import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registration from './Registration';
import Dashboard from './Dashboard';

const router = createBrowserRouter([{
  path:'/',
  element:<App/>
},
{
  path:'/registration',
  element:<Registration/>
},{
  path:'/login',
  element:<App/>
},{
  path:'/dashboard',
  element:<Dashboard/>
}

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
