import type { HelixEnvironmentConnectorProbeResult } from "../contract/v1/index.js";
import type { ConnectorLease, ConnectorFetch } from "../sdk/typescript/index.js";
type Submitted = {
    probeAttemptId: string;
    result: HelixEnvironmentConnectorProbeResult;
};
export declare class MockHelixConnectorEndpoint {
    readonly submitted: Submitted[];
    private readonly pending;
    enqueue(lease: ConnectorLease): void;
    readonly fetch: ConnectorFetch;
}
export {};
