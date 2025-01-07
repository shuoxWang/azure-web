import { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useQueryData } from "../../hooks/useQueryData";
import { AgGridReact } from "ag-grid-react";
const Dashboards = () => {
    const { rowData, loading, columnDefs, fetchData, autoSizeStrategy } = useQueryData();

    const query = "TechnicalInsights | project Id, Slug, Symbol, Interval, RetracementsIndicator";
    useEffect(() => {
        fetchData(query);
    }, []);


    return (
        <div className="dashboardPage">
            <div className="ag-theme-alpine" style={{ height: 400, padding: 10}}>
                <AgGridReact
                    rowData={rowData[0]}
                    columnDefs={columnDefs}
                    rowBuffer={20}
                    defaultColDef={{ resizable: true }}
                    suppressColumnVirtualisation={false}
                    suppressRowVirtualisation={false}
                    suppressAnimationFrame={false}
                    debounceVerticalScrollbar={true}
                    domLayout="normal"
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
            <div className="ag-theme-alpine" style={{ height: 400, padding: 10 }}>
                <AgGridReact
                    rowData={rowData[0]}
                    columnDefs={columnDefs}
                    rowBuffer={20}
                    defaultColDef={{ resizable: true }}
                    suppressColumnVirtualisation={false}
                    suppressRowVirtualisation={false}
                    suppressAnimationFrame={false}
                    debounceVerticalScrollbar={true}
                    domLayout="normal"
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
            <div className="ag-theme-alpine" style={{ height: 400, padding: 10 }}>
                <AgGridReact
                    rowData={rowData[0]}
                    columnDefs={columnDefs}
                    rowBuffer={20}
                    defaultColDef={{ resizable: true }}
                    suppressColumnVirtualisation={false}
                    suppressRowVirtualisation={false}
                    suppressAnimationFrame={false}
                    debounceVerticalScrollbar={true}
                    domLayout="normal"
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
            <div className="ag-theme-alpine" style={{ height: 400, padding: 10 }}>
                <AgGridReact
                    rowData={rowData[0]}
                    columnDefs={columnDefs}
                    rowBuffer={20}
                    defaultColDef={{ resizable: true }}
                    suppressColumnVirtualisation={false}
                    suppressRowVirtualisation={false}
                    suppressAnimationFrame={false}
                    debounceVerticalScrollbar={true}
                    domLayout="normal"
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
            <div className="ag-theme-alpine" style={{ height: 400, padding: 10 }}>
                <AgGridReact
                    rowData={rowData[0]}
                    columnDefs={columnDefs}
                    rowBuffer={20}
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
export default Dashboards;