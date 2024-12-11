import authService from "../../services/authService";
import React, { useState, useEffect, CSSProperties, useMemo } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from '@codemirror/lang-sql';
import ScrollableJsonCell from "../../components/ScrollableJsonCell/ScrollableJsonCell";
import "./Query.css"
import {
    ColDef,
    ColGroupDef,
    GridApi,
    GridOptions,
    ICellRendererParams,
    IDatasource,
    IGetRowsParams,
    ModuleRegistry,
    RowModelType,
    createGrid,
} from "@ag-grid-community/core";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import { TechnicalInsightsData } from "./DataModel";

ModuleRegistry.registerModules([InfiniteRowModelModule]);
let gridApi: GridApi<TechnicalInsightsData>;

const Dashboard = () => {

    const initializeGrid = () => {
        const gridOptions: GridOptions<TechnicalInsightsData> = {
            columnDefs: [
                {
                    headerName: "ID",
                    maxWidth: 100,
                    // it is important to have node.id here, so that when the id changes (which happens
                    // when the row is loaded) then the cell is refreshed.
                    valueGetter: "node.id",
                    cellRenderer: (params: ICellRendererParams) => {
                        if (params.value !== undefined) {
                            return params.value;
                        } else {
                            return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
                        }
                    },
                },
                { field: "Id", minWidth: 150 },
                { field: "Slug" },
                { field: "Symbol", minWidth: 150 },
                { field: "Exchange" },
                { field: "Interval", minWidth: 150 },
                {
                    field: "CandleMetrics",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "AwesomeIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "WillyIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "MacdIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "MovingAveragesIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "RetracementsIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "RsiIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "ObvIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "BopIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "CciIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "CmfIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "ForceIndexIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "KeyReversalsIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "MarubozuIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "MfiIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "SqueezeIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "TrixIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "UltimateIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "TdSequentialIndicator",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                },
                {
                    field: "DateIngested",
                    minWidth: 150,
                    sortable: true,
                    filter: true,
                    valueFormatter: (params: any) => {
                        if (typeof params.value === 'object' && params.value != null) {
                            return JSON.stringify(params.value, null, 2);
                        }
                        return params.value;
                    },
                }
            ],
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                sortable: false,
            },
            rowBuffer: 0,
            rowModelType: "infinite",
            cacheBlockSize: 100,
            cacheOverflowSize: 2,
            maxConcurrentDatasourceRequests: 1,
            infiniteInitialRowCount: 1000,
            maxBlocksInCache: 10,
        };
        const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
        gridApi = createGrid(gridDiv, gridOptions);
    }

    const [query, setQuery] = useState("");

    const handleQuery = async () => {
        if (!query) {
            alert("Please enter a query!")
            return;
        }
        const queryData = await authService.getQueryData(query);
        const data = queryData.data;
        console.log(data);
        const dataSource: IDatasource = {
            rowCount: undefined, // behave as infinite scroll
            getRows: (params: IGetRowsParams) => {
                console.log("asking for " + params.startRow + " to " + params.endRow);

                const rowsThisPage = data.slice(params.startRow, params.endRow);
                console.log("rowsThisPage: ", rowsThisPage);
                let lastRow = -1;
                if (data.length <= params.endRow) {
                    lastRow = data.length;
                }
                params.successCallback(rowsThisPage, lastRow);
            },
        };
        gridApi!.setGridOption("datasource", dataSource);

        console.log("dataSource: ", dataSource);
        // initializeGrid();
    };

    useEffect(() => { initializeGrid(); }, []);


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
            <div id="myGrid" className="ag-theme-alpine" style={{ height: 400, marginTop: "14%", overflowX: "auto" }}>
            </div>

        </div>
    );
}
export default Dashboard;