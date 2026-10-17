import { HelixEnvironmentConnectorClient } from "../../sdk/typescript/index.js";
export declare const runReadOnlyConnectorOnce: (client: HelixEnvironmentConnectorClient) => Promise<"idle" | "handled">;
