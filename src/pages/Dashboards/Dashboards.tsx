import Sidebar from "../../components/Sidebar/Sidebar";
import { useQueryData } from "../../hooks/useQueryData";
import { AgGridReact } from "ag-grid-react";
const Dashboards = () => {
    const { rowData, loading, columnDefs, fetchData, autoSizeStrategy } = useQueryData();

    const query = "TechnicalInsights | take 2";
    // fetchData(query);

    return (
        <div className="dashboardPage">
            {/* <div className="ag-theme-alpine ag-grid-container">
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
            </div> */}
        </div>
    );
}
export default Dashboards;