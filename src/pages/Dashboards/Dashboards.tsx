import { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useQueryData } from "../../hooks/useQueryData";
import { AgGridReact } from "ag-grid-react";
const Dashboards = () => {
    const { rowData, loading, columnDefs, fetchData, autoSizeStrategy } = useQueryData();

    const query = "TechnicalInsights | take 10 | project Id, Slug, Symbol, Exchange, Interval, CandleMetrics, AwesomeIndicator, WillyIndicator, MacdIndicator, MovingAveragesIndicator, RetracementsIndicator, RsiIndicator, ObvIndicator, BopIndicator, CciIndicator, CmfIndicator, ForceIndexIndicator, KeyReversalsIndicator, MarubozuIndicator, MfiIndicator, SqueezeIndicator, TrixIndicator, UltimateIndicator, TdSequentialIndicator, DateIngested";
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
                    
                />
            </div>
        </div>
    );
}
export default Dashboards;