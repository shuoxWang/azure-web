export const msalConfig = {
    CLUSTER_URI: process.env.REACT_APP_CLUSTER_URI as string,
CLIENT_ID: process.env.REACT_APP_CLIENT_ID || '',
CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET|| '', 
TENANT_ID: process.env.REACT_APP_TENANT_ID|| ''
};