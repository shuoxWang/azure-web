import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import "../Sidebar/Sidebar.css";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
    const location = useLocation();
    return (

        <div className={`sidebar ${collapsed ? "collapsed" : ""}`} >
            <div className="sidebar-content">
                <div className={`nav-item ${location.pathname === "/query" ? "active" : ""}`}>
                    <Link to="/query" className="nav-link-custom">
                        <img src="/query-svgrepo-com.svg" alt="query icon" className="nav-icon" />
                        <span>Query</span>
                    </Link>
                </div>
                <div className={`nav-item ${location.pathname === "/dashboards" ? "active" : ""}`}>
                    <Link to="/dashboards" className="nav-link-custom">
                        <img src="/compass-svgrepo-com.svg" alt="dashboards icon" className="nav-icon" />
                        <span>Dashboards</span>
                    </Link>
                </div>
            </div>
        </div>

    );
};
export default Sidebar;
