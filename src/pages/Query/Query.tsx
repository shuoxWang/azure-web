import authService from "../../services/authService";
import React, { useState, useEffect, CSSProperties, useMemo } from 'react';
import { AgGridReact } from "ag-grid-react";
// import { ColDef, SizeColumnsToContentStrategy,SizeColumnsToFitGridStrategy,SizeColumnsToFitProvidedWidthStrategy,} from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from '@codemirror/lang-sql';
import ScrollableJsonCell from "../../components/ScrollableJsonCell/ScrollableJsonCell";
import "./Query.css"
import {useQueryData} from "../../hooks/useQueryData";


const Dashboard = () => {
    const [query, setQuery] = useState("");
    const { rowData, loading, fetchData, columnDefs, autoSizeStrategy} = useQueryData();
    // const [gridHeight, setGridHeight] = useState(400);
    // const [startY, setStartY] = useState(0);
    // const autoSizeStrategy: SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy= {
    //     type: "fitCellContents",
    //     // type: "fitGridWidth",
    //     // defaultMaxWidth: 200
    //     // columnLimits: [
    //     //   {
    //     //     colId: "country",
    //     //     minWidth: 900,
    //     //   },
    //     // ],
    //   };

    const handleQuery = async () => {
        if (!query) {
            alert("Please enter a query!")
            return;
        }
        fetchData(query);
    };

    // const fetchData = async () => {
    //     try {
    //         setLoading(true);
    //         const queryData = await authService.getQueryData(query);
    //         setRowData([queryData.data]);
    //         setLoading(false);

    //     } catch (error) {
    //         console.log("Error fetching data:", error);
    //         setLoading(false);
    //     }
    // };

    // const flatData = rowData.flat();
    // const columnDefs = useMemo(() => {
    //     return Object.keys(flatData[0] || {}).map((key) => ({
    //         field: key,
    //         headerName: key.charAt(0).toUpperCase() + key.slice(1),
    //         sortable: true,
    //         filter: true,
    //         ...(typeof flatData[0][key] === 'object' && {
    //             cellRenderer: ScrollableJsonCell,
    //         }),
    //         autoHeight: true,
    //     }))
    // }, [flatData]);

    // const handleMouseDown = (e: any) => {
    //     setStartY(e.clientY);
    //     document.addEventListener('mousemove', handleMouseMove);
    //     document.addEventListener('mouseup', handleMouseUp);
    // };
    // const handleMouseMove = (e: any) => {
    //     const delta = e.clientY - startY;
    //     setGridHeight((prevHeight) => prevHeight + delta)
    //     setStartY(e.clientY);
    // };

    // const handleMouseUp = () => {
    //     document.removeEventListener('mousemove', handleMouseMove);
    //     document.removeEventListener('mouseup', handleMouseUp);
    // }



    return (
        <div className="queryPage">
            <div className="queryBox">
                <div className="query-button">
                    <button className="btn btn-primary query-button" onClick={handleQuery}>Run Query</button>
                </div>
                <CodeMirror
                    className="queryInput"
                    value={query}
                    extensions={[sql()]}
                    theme="light"
                    onChange={(value) => setQuery(value)}
                />
            </div>
            <div className="resize-bar" ></div>


            <div className="ag-theme-alpine ag-grid-container">
                <AgGridReact
                    rowData={rowData[0]}
                    columnDefs={columnDefs}
                    rowBuffer={10}
                    defaultColDef={{ resizable: true }}
                    suppressColumnVirtualisation={false}
                    suppressRowVirtualisation={false}
                    suppressAnimationFrame={false}
                    debounceVerticalScrollbar={true}
                    domLayout="normal"
                    autoSizeStrategy={autoSizeStrategy}
                />

            </div>
        </div>
    );
}
export default Dashboard;