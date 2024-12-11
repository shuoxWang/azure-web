import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

//pages import
import LoginPage from './pages/LoginPage/LoginPage';
import Query from './pages/Query/Query';
//import Query from './pages/Query/QueryInfiniteScroll';
import Dashboards from './pages/Dashboards/Dashboards';
import Sidebar from './components/Sidebar/Sidebar';
import ADXNavbar from './components/ADXNavbar/ADXNavbar';

function App() {
  const [isSidebarCollapsed, setisSidebarCollapsed] = useState(false);
  const toggleSidebar = () => {
    setisSidebarCollapsed(!isSidebarCollapsed);
  }
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <div className='All-content'>
            <ADXNavbar toggleSidebar={toggleSidebar}/>
            <div className='ADX-content-wrapper'>
              <Sidebar collapsed={isSidebarCollapsed}/>
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<LoginPage />}></Route>
                  <Route path="/query" element={<Query />}></Route>
                  <Route path="/dashboards" element={<Dashboards />}></Route>
                  {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route> */}
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </div>

  );
}

export default App;
