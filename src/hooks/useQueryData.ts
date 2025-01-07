import authService from "../services/authService";
import ScrollableJsonCell from "../components/ScrollableJsonCell/ScrollableJsonCell";
import React, { useState, useEffect, CSSProperties, useMemo, useCallback } from 'react';
import { ColDef, SizeColumnsToContentStrategy,SizeColumnsToFitGridStrategy,SizeColumnsToFitProvidedWidthStrategy,} from 'ag-grid-community';

export const useQueryData = () => {
    const [rowData, setRowData]: any[] = useState([]);
    const [loading, setLoading] = useState(true);
    const autoSizeStrategy: SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy= {
        type: "fitCellContents",
      };
    const fetchData = async (query: string) => {
        try {
            setLoading(true);
            const queryData = await authService.getQueryData(query);
            setRowData([queryData.data]);
            setLoading(false);

        } catch (error) {
            console.log("Error fetching data:", error);
            setLoading(false);
        }
    };

    const flatData = rowData.flat();
    const rowsCount = Object.keys(flatData).length;
    const columnDefs = useMemo(() => {
        return Object.keys(flatData[0] || {}).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            sortable: true,
            filter: true,
            ...(typeof flatData[0][key] === 'object' && {
                cellRenderer: ScrollableJsonCell,
            }),
            initialWidth: 10,
            autoHeight: true,
            wrapText: true,
            resizable: false
            
        }))
    }, [flatData]);

    return { rowData, loading, fetchData, columnDefs, autoSizeStrategy, rowsCount};

}
