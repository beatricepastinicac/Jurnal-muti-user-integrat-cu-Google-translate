// src/Routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Journal from './pages/Journal';
import PrivateRoute from './components/PrivateRoute';

const PublicRoute = ({ children }) => {
 const { isAuthenticated } = useAuth();
 return !isAuthenticated ? children : <Navigate to="/journal" />;
};

const AppRoutes = () => {
 return (
   <Routes>
     <Route 
       path="/login" 
       element={
         <PublicRoute>
           <Login />
         </PublicRoute>
       } 
     />
     <Route 
       path="/register" 
       element={
         <PublicRoute>
           <Register />
         </PublicRoute>
       } 
     />
     <Route 
       path="/journal" 
       element={
         <PrivateRoute>
           <Journal />
         </PrivateRoute>
       } 
     />
     <Route 
       path="/journal/:id" 
       element={
         <PrivateRoute>
           <Journal />
         </PrivateRoute>
       } 
     />
     <Route path="/" element={<Navigate to="/login" />} />
     <Route path="*" element={<Navigate to="/login" />} /> {/* Pentru rute inexistente */}
   </Routes>
 );
};

export default AppRoutes;