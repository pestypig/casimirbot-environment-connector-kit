import { type HelixEnvironmentConnectorProbeResult } from "../../contract/v1/index.js";
import { type ConnectorLease } from "../../sdk/typescript/index.js";
/**
 * A real non-game host probe. It reads only a monotonic process clock and has
 * no player, block, chunk, world-command, game-version, shell, or filesystem
 * dependency.
 */
export declare const handleSystemClockLease: (lease: ConnectorLease, readUptimeMs?: () => number, now?: Date) => HelixEnvironmentConnectorProbeResult;
