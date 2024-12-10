// @ts-ignore
import { Client as KustoClient, KustoConnectionStringBuilder } from 'azure-kusto-data';
import { InteractiveBrowserCredentialInBrowserOptions } from "@azure/identity";

// export const runQueryService = async () => {
//     const clusterUri = "https://help.kusto.windows.net";
//     const authOptions = {
//         clientId: "00001111-aaaa-2222-bbbb-3333cccc4444",
//         redirectUri: "http://localhost:5173",
//     } as InteractiveBrowserCredentialInBrowserOptions;
//     console.log("run query....");
//     const kcsb = KustoConnectionStringBuilder.withUserPrompt(clusterUri, authOptions);
//     const kustoClient = new KustoClient(kcsb);
  
//     const database = "Samples";
//     const query = `StormEvents
//                    | where EventType == 'Tornado'
//                    | extend TotalDamage = DamageProperty + DamageCrops
//                    | where DailyDamage > 100000000
//                    | order by DailyDamage desc`;
//     const response = await kustoClient.execute(database, query);
//     console.log("run query....");
//     console.log("Daily tornado damages over 100,000,000$:");
//     for (var row of response.primaryResults[0].rows()) {
//       console.log(row["StartTime"].toString(), "-", row["State"].toString(), ",", row["DailyDamage"].toString(), "$");
//     }
//     return response;
// }