import authService from "../../services/authService";
import React, { useState, useEffect, CSSProperties } from 'react';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from '@codemirror/lang-sql';
import ScrollableJsonCell from "../../components/ScrollableJsonCell/ScrollableJsonCell";
import "../Dashboard/Dashboard.css"


const Dashboard = () => {
    const [rowData, setRowData]: any[] = useState([]);
    const [loading, setLoading] = useState(true);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
    // const [columnDefs] = useState([
    //     {
    //         field: "CandleMetrics",
    //         headerName: "CandleMetrics",
    //         sortable: true,
    //         filter: true,
    //         cellRenderer: ScrollableJsonCell,
    //         autoHeight: true,
    //         minWidth: 300
    //     }
    // ]);
    const [query, setQuery] = useState("");

    const handleQuery = async () => {
        if (!query) {
            alert("Please enter a query!")
            return;
        }
        fetchData();
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            //fetch data from back end
            //lazy-loading virtualization UI
            const queryData = await authService.getQueryData(query);
            //set row and columns for AgGrid
            setRowData([queryData.data]);
            const data = queryData.data;
            const columns: ColDef[] = Object.keys(data[0]).map((key) => {
                if (typeof data[0][key] !== 'string' && data[0][key] !== null) {
                    return {
                        field: key,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1),
                        sortable: true,
                        filter: true,
                        cellRenderer: ScrollableJsonCell,
                        autoHeight: true,
                        minWidth: 300
                    }
                } else {
                    return {
                        field: key,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1),
                        sortable: true,
                        filter: true
                    }
                };
            });
            setColumnDefs(columns);

        } catch (error) {
            console.log("Error fetching data:", error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Dashboard page</h2>
            <div className="queryBox">
                <CodeMirror
                    className="queryInput"
                    value={query}
                    extensions={[sql()]}
                    theme="light"
                    onChange={(value) => setQuery(value)}
                />
                <button className="btn btn-primary" onClick={handleQuery}>Run Query</button>
            </div>

            <div className="ag-theme-alpine" style={{ height: 400, marginTop: "20px", overflowX: "auto" }}>
                <AgGridReact
                    rowData={rowData[0]}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    defaultColDef={{ resizable: true }}
                //suppressColumnVirtualisation={false}
                // suppressRowVirtualisation={false}
                //domLayout="normal"
                />
            </div>
        </div>
    );
}
export default Dashboard;