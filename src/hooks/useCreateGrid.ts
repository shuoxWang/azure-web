'use client';
import authService from "../services/authService";
import ScrollableJsonCell from "../components/ScrollableJsonCell/ScrollableJsonCell";
import React, { useState, useEffect, CSSProperties, useMemo, useCallback, useRef } from 'react';
import { ColDef, ColGroupDef, GridApi, GridOptions, ICellRendererParams, IDatasource, IGetRowsParams, ModuleRegistry, RowModelType, createGrid, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy, } from "@ag-grid-community/core";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import { TechnicalInsightsData } from "../pages/Query/DataModel";
import { GridReadyEvent } from "ag-grid-community";

ModuleRegistry.registerModules([InfiniteRowModelModule]);
// let gridApi: GridApi<TechnicalInsightsData>;

export const useCreateGrid = () => {
    const [columnDefs, setColumnDefs] = useState<ColDef[] | any>();
    const [loading, setLoading] = useState(false);
    // const [gridApi, setGridApi] = useState<GridApi<TechnicalInsightsData> | any>();
    const gridRef = useRef<any>(null);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 100,
            sortable: true,
            resizable: true
        };
    }, []);
    // const onGridReady = useCallback((params: GridReadyEvent) => {
        
    // }, []);
    const setDatasource = useCallback(
        (data: any) => {
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
           gridRef.current?.api.setGridOption("datasource", dataSource);
        },
        [gridRef]
    );
    const fetchData = async (query: string) => {
        try {
            setLoading(true);
            const queryData = await authService.getQueryData(query);
            const rowData = [queryData.data];
            setLoading(false);
            const flatData = rowData.flat();
            const rowsCount = Object.keys(flatData).length;
            const columnDefs = () => {
                return Object.keys(flatData[0] || {}).map((key) => ({
                    field: key,
                    headerName: key.charAt(0).toUpperCase() + key.slice(1),
                    sortable: true,
                    filter: true,
                    // ...(typeof flatData[0][key] === 'object' && {
                    //     cellRenderer: ScrollableJsonCell,
                    // }),
                    rowGroup: true,
                    autoHeight: true,
                }))
            };
            setColumnDefs(columnDefs)
            const data = queryData.data;
            setDatasource(data);
        } catch (error) {
            console.log("Error fetching data:", error);
            setLoading(false);
        }
    };

    return {
        columnDefs,
        defaultColDef,
        fetchData,
        gridRef
    };
























    // const [rowData, setRowData]: any[] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const autoSizeStrategy: SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy= {
    //     type: "fitCellContents",
    //   };
    // const gridApiRef = useRef<any>(null);


    // const onGridReady = useCallback((params: GridReadyEvent, query: string) => 

    //             setLoading(true);
    //             const queryData = await authService.getQueryData(query);
    //             setRowData([queryData.data]);
    //             setLoading(false);
    //             const data = queryData.data;
    //             const dataSource: IDatasource = {
    //                 rowCount: undefined, // behave as infinite scroll
    //                 getRows: (params: IGetRowsParams) => {
    //                     console.log("asking for " + params.startRow + " to " + params.endRow);

    //                     const rowsThisPage = data.slice(params.startRow, params.endRow);
    //                     console.log("rowsThisPage: ", rowsThisPage);
    //                     let lastRow = -1;
    //                     if (data.length <= params.endRow) {
    //                         lastRow = data.length;
    //                     }
    //                     params.successCallback(rowsThisPage, lastRow);
    //                 },
    //             };
    //             params.api.setGridOption("datasource", dataSource);

    //             const flatData = rowData.flat();
    //             const rowsCount = Object.keys(flatData).length;
    //             const columnDefs = useMemo(() => {
    //                 return Object.keys(flatData[0] || {}).map((key) => ({
    //                     field: key,
    //                     headerName: key.charAt(0).toUpperCase() + key.slice(1),
    //                     sortable: true,
    //                     filter: true,
    //                     ...(typeof flatData[0][key] === 'object' && {
    //                         cellRenderer: ScrollableJsonCell,
    //                     }),
    //                     rowGroup: true,
    //                     autoHeight: true,
    //                 }))
    //             }, [flatData]);
    //             setColumnDefs(columnDefs)

    // },[]);

    // const fetchData = async (query: string) => {
    //     try {
    //         setLoading(true);
    //         const queryData = await authService.getQueryData(query);
    //         setRowData([queryData.data]);
    //         setLoading(false);
    //         const data = queryData.data;
    //         const dataSource: IDatasource = {
    //             rowCount: undefined, // behave as infinite scroll
    //             getRows: (params: IGetRowsParams) => {
    //                 console.log("asking for " + params.startRow + " to " + params.endRow);

    //                 const rowsThisPage = data.slice(params.startRow, params.endRow);
    //                 console.log("rowsThisPage: ", rowsThisPage);
    //                 let lastRow = -1;
    //                 if (data.length <= params.endRow) {
    //                     lastRow = data.length;
    //                 }
    //                 params.successCallback(rowsThisPage, lastRow);
    //             },
    //         };
    //         setDataSource(dataSource);

    //     } catch (error) {
    //         console.log("Error fetching data:", error);
    //         setLoading(false);
    //     }
    // };

    // const flatData = rowData.flat();
    // const rowsCount = Object.keys(flatData).length;
    // const columnDefs = useMemo(() => {
    //     return Object.keys(flatData[0] || {}).map((key) => ({
    //         field: key,
    //         headerName: key.charAt(0).toUpperCase() + key.slice(1),
    //         sortable: true,
    //         filter: true,
    //         ...(typeof flatData[0][key] === 'object' && {
    //             cellRenderer: ScrollableJsonCell,
    //         }),
    //         rowGroup: true,
    //         autoHeight: true,
    //     }))
    // }, [flatData]);

    // const defaultColDef = useMemo<ColDef>(() => {
    //     return {
    //       flex: 1,
    //       minWidth: 100,
    //       sortable: false,
    //     };
    //   }, []);


}
