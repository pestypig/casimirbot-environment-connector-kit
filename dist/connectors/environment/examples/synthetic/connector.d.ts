import { type HelixEnvironmentConnectorProbeResult } from "../../contract/v1/index.js";
import { type ConnectorLease } from "../../sdk/typescript/index.js";
export declare const handleSyntheticReachabilityLease: (lease: ConnectorLease, fixture: {
    reachable: boolean;
    distance: number;
}, now?: Date) => HelixEnvironmentConnectorProbeResult;
