import crypto from "node:crypto";
import { type HelixEnvironmentConstrainedJsonSchema, type HelixEnvironmentSourceManifest, type HelixEnvironmentConnectorProbeRequest, type HelixEnvironmentConnectorProbeResult, type HelixEnvironmentPairingSession } from "../../contract/v1/index.js";
export declare const validateConnectorManifest: (value: unknown) => HelixEnvironmentSourceManifest;
export declare const compileConstrainedConnectorSchema: (schema: HelixEnvironmentConstrainedJsonSchema) => (value: unknown) => {
    ok: boolean;
    issues: import("../../contract/v1/index.js").EnvironmentConnectorSchemaIssue[];
};
export type ConnectorFetch = typeof fetch;
export type ConnectorLease = {
    schema: "helix.environment_connector.probe_lease.v1";
    probe_attempt_id: string;
    lease_token: string;
    lease_expires_at: string;
    capability_id: string;
    capability_version: number;
    catalog_snapshot_id: string;
    capability_request: HelixEnvironmentConnectorProbeRequest;
    request: null;
};
export type ConnectorPairingIdentity = {
    publicKeyPem: string;
    privateKey: crypto.KeyObject;
    publicKeyHash: `sha256:${string}`;
};
export type ConnectorPairingClaimReceipt = {
    deviceId: string;
    installationId: string;
    environmentBindingId: string;
    catalogSnapshotId: string;
    deviceCredentialExpiresAt: string;
    scopes: string[];
};
export type ConnectorHeartbeatReceipt = {
    health: string;
    commandExecution: "command_execution_not_enabled";
};
export declare const connectorSha256: (value: unknown) => `sha256:${string}`;
export declare const createConnectorPairingIdentity: () => ConnectorPairingIdentity;
export declare const pairingStartMessage: (input: {
    packageVersionId: string;
    deviceNonce: string;
    requestedCapabilityIds: string[];
    devicePublicKeyHash: string;
}) => string;
export declare const pairingClaimMessage: (input: {
    pairingSessionId: string;
    claimChallenge: string;
}) => string;
export declare class HelixEnvironmentConnectorClient {
    #private;
    private readonly baseUrl;
    private readonly fetchImpl;
    constructor(baseUrl: string, fetchImpl?: ConnectorFetch, deviceCredential?: string | null);
    setDeviceCredentialOnce(value: string): void;
    startPairing(input: {
        packageVersionId: string;
        identity: ConnectorPairingIdentity;
        requestedCapabilityIds: string[];
        deviceNonce?: string;
    }): Promise<{
        session: HelixEnvironmentPairingSession;
        claimChallenge: string;
    }>;
    claimPairing(input: {
        pairingSessionId: string;
        claimChallenge: string;
        identity: ConnectorPairingIdentity;
    }): Promise<ConnectorPairingClaimReceipt>;
    poll(limit?: number): Promise<ConnectorLease[]>;
    submit(lease: ConnectorLease, result: HelixEnvironmentConnectorProbeResult): Promise<void>;
    heartbeat(): Promise<ConnectorHeartbeatReceipt>;
    private authorizationHeaders;
}
export declare const createSucceededProbeResult: (input: {
    request: HelixEnvironmentConnectorProbeRequest;
    summary: string;
    result: Record<string, unknown>;
    now?: Date;
}) => HelixEnvironmentConnectorProbeResult;
