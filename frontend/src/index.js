import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from "./components/header.js";
import reportWebVitals from './reportWebVitals';
import Index from "./components/index.js";
import Category from "./components/category.js";
import Forgot from "./components/forgot.js";
import ResetPassword from "./components/resetPassword.js";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";  
import AuthPage from './components/auth';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/login" element={<AuthPage/>} />
          <Route path="/" element={<Index/>} />
          <Route path="/addCat" element={<Category/>} />
          <Route path="/forgot" element={<Forgot/>} />
          <Route path="/password/reset/:token" element={<ResetPassword/>} />
        </Routes>  
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
