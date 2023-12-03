import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Main from './Components/Main/Main'
import Chat from './Components/Chat/Chat'
import UserContextProvider from './Context/userContext'

export default function App() {
 
  let roots = createBrowserRouter([
    { path: '/', element: <Layout  />, children:[
      {index: true, element:<Main/>},
      {path: 'home', element:<Home/>},
      {path: 'chat', element:<Chat/>},

    ] }
  ])
  return <>
   <UserContextProvider>
  <RouterProvider router={roots}></RouterProvider>
  </UserContextProvider> 
  
    </>
  
}
