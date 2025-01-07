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
import { useQueryData } from "../../hooks/useQueryData";
import { useCreateGrid } from "../../hooks/useCreateGrid";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";

const Dashboard = () => {
    const [query, setQuery] = useState("");
    const { rowData, loading, fetchData, columnDefs, autoSizeStrategy, rowsCount} = useQueryData();
    const handleQuery = async () => {
        if (!query) {
            alert("Please enter a query!")
            return;
        }
        fetchData(query);
    };

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
            <div className="rows-count-tab">
                <div className="rows-records">
                    <img src="/numbered-list-svgrepo-com.svg" alt="number-icon" className="number-icon" />
                    <p>{rowsCount} records</p>
                </div>
            </div>

            <div className="ag-theme-alpine ag-grid-container">
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData[0]}
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