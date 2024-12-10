import { Link } from "react-router-dom";
import { useState } from "react";

import "../Sidebar/Sidebar.css";

const Sidebar = ({ collapsed}: {collapsed: boolean}) => {

    return (

        <div className={`sidebar ${collapsed ? "collapsed" : ""}`} >
            <div className="sidebar-content">
                <div className="nav-item">
                    <img src="/query-svgrepo-com.svg" alt="query icon" className="nav-icon" />
                    <Link to="/query" className="nav-link-custom">Query</Link>
                </div>
                <div className="nav-item">
                    <img src="/compass-svgrepo-com.svg" alt="dashboards icon" className="nav-icon" />
                    <Link to="/dashboards" className="nav-link-custom">Dashboards</Link>
                </div>
            </div>
        </div>

    );
};
export default Sidebar;
