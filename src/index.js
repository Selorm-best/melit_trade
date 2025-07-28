import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About'
import Service from './pages/Service'
import Products from './pages/Products';
import Contact from './pages/Contact';

import Tracking from './pages/Tracking';
import QuoteForm from './components/QuoteForm';
import "core-js/stable";
import "regenerator-runtime/runtime";
import 'core-js/features/promise';
import 'whatwg-fetch';



const router = createBrowserRouter([{
path: "/",
element: <App />,
children: [
  {
    path: "/",
    element: <HomePage />

 },
 {
  path: "/about",
  element: <About />

},
{
  path: "/service",
  element: <Service />

},
{
  path: "/products",
  element: <Products />

},
{
  path: "/quotes",
  element: <QuoteForm />

},
{
  path: "/tracking",
  element: <Tracking />

},
{
  path: "/contact",
  element: <Contact />
},

]



}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
