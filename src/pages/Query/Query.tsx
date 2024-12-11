import authService from "../../services/authService";
import React, { useState, useEffect, CSSProperties, useMemo } from 'react';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from '@codemirror/lang-sql';
import ScrollableJsonCell from "../../components/ScrollableJsonCell/ScrollableJsonCell";
import "./Query.css"


const Dashboard = () => {
    const [rowData, setRowData]: any[] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
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
            setLoading(false);
            // const data = queryData.data;
            // const columns: ColDef[] = Object.keys(data[0]).map((key) => {
            //     if (typeof data[0][key] !== 'string' && data[0][key] !== null) {
            //         return {
            //             field: key,
            //             headerName: key.charAt(0).toUpperCase() + key.slice(1),
            //             sortable: true,
            //             filter: true,
            //             cellRenderer: ScrollableJsonCell,
            //             autoHeight: true,
            //             minWidth: 300
            //         }
            //     } else {
            //         return {
            //             field: key,
            //             headerName: key.charAt(0).toUpperCase() + key.slice(1),
            //             sortable: true,
            //             filter: true
            //         }
            //     };
            // });
            // setColumnDefs(columns);

        } catch (error) {
            console.log("Error fetching data:", error);
            setLoading(false);
        }
    };

    const flatData = rowData.flat();
    const columnDefs = useMemo(() => {
        return Object.keys(flatData[0] || {}).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            sortable: true,
            filter: true,
            // valueFormatter: (params: any) => {
            //     if (typeof params.value === 'object' && params.value != null) {
            //         return JSON.stringify(params.value, null, 2).slice(0, 200);
            //     }
            //     return params.value;
            // },
            ...(typeof flatData[0][key] === 'object' && {
                cellRenderer: ScrollableJsonCell,
            }),
            autoHeight: true,
        }))
    }, [flatData]);

    
    // const flatData = rowData.flat();
    // const allColumnDefs = useMemo(() => {
    //     return Object.keys(flatData[0] || {}).map((key) => ({
    //         field: key,
    //         headerName: key.charAt(0).toUpperCase() + key.slice(1),
    //         sortable: true,
    //         filter: true,
    //         valueFormatter: (params: any) => {
    //             if (typeof params.value === 'object' && params.value != null) {
    //                 return JSON.stringify(params.value, null, 2);
    //             }
    //             return params.value;
    //         },
    //     }))
    // }, [flatData]);
    // setColumnDefs(allColumnDefs.slice(0, 6));

    // const handleBodyScroll = (params: any) => {
    //     const horizontalScroll = params.api.getHorizontalPixelRange();
    //     const viewportEnd = horizontalScroll.end;
    //     const gridWidth = params.api.getWidthForSizeColsToFit();
    //     const gridBodyWidth = params.api.gridBodyCtrl.getBodyViewportScrollWidth();

    //     if (viewportEnd > gridBodyWidth - 200 && columnDefs.length < allColumnDefs.length){
    //         const newColumns = allColumnDefs.slice(0, columnDefs.length + 2);
    //         if (newColumns.length !== columnDefs.length){
    //             setColumnDefs(newColumns);
    //         }
    //     }
    // };

    return (
        <div>
            <div className="queryBox">
                <div className="query-button">
                <button className="btn btn-primary" onClick={handleQuery}>Run Query</button>
                </div>
                <CodeMirror
                    className="queryInput"
                    value={query}
                    extensions={[sql()]}
                    theme="light"
                    onChange={(value) => setQuery(value)}
                />
            </div>

            <div className="ag-theme-alpine" style={{ height: 400, marginTop: "14%", overflowX: "auto" }}>
                <AgGridReact
                    rowData={rowData[0]}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    rowBuffer={10}
                    defaultColDef={{ resizable: true }}
                    suppressColumnVirtualisation={false}
                    suppressRowVirtualisation={false}
                    suppressAnimationFrame={false}
                    debounceVerticalScrollbar={true}
                    domLayout="normal"
                    // onBodyScroll={handleBodyScroll}
                />
            </div>
        </div>
    );
}
export default Dashboard;