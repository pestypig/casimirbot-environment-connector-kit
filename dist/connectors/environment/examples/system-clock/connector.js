import { HELIX_SYSTEM_CLOCK_READ_CAPABILITY, } from "../../contract/v1/index.js";
import { createSucceededProbeResult, } from "../../sdk/typescript/index.js";
/**
 * A real non-game host probe. It reads only a monotonic process clock and has
 * no player, block, chunk, world-command, game-version, shell, or filesystem
 * dependency.
 */
export const handleSystemClockLease = (lease, readUptimeMs = () => process.uptime() * 1_000, now = new Date()) => {
    if (lease.capability_id !== HELIX_SYSTEM_CLOCK_READ_CAPABILITY ||
        lease.capability_request.capability_id !==
            HELIX_SYSTEM_CLOCK_READ_CAPABILITY ||
        lease.capability_request.arguments.clock !== "monotonic") {
        throw new Error("system_clock_capability_mismatch");
    }
    const uptimeMs = Math.max(0, Math.floor(readUptimeMs()));
    const summary = `The connector process monotonic uptime is ${uptimeMs} ms.`;
    return createSucceededProbeResult({
        request: lease.capability_request,
        summary,
        result: { result_summary: summary, uptime_ms: uptimeMs },
        now,
    });
};
