import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

//pages import
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
    <AuthProvider>
      <Router>
       <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route> */}
        </Routes>
      </Router>
      

      
    </AuthProvider>
    </div>

  );
}

export default App;
