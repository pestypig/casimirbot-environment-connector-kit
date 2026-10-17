import { HELIX_SYNTHETIC_REACHABILITY_CAPABILITY, } from "../../contract/v1/index.js";
import { createSucceededProbeResult, } from "../../sdk/typescript/index.js";
export const handleSyntheticReachabilityLease = (lease, fixture, now = new Date()) => {
    if (lease.capability_id !== HELIX_SYNTHETIC_REACHABILITY_CAPABILITY ||
        lease.capability_request.capability_id !==
            HELIX_SYNTHETIC_REACHABILITY_CAPABILITY) {
        throw new Error("synthetic_capability_mismatch");
    }
    const summary = fixture.reachable
        ? `The synthetic target is reachable at distance ${fixture.distance}.`
        : "The synthetic target is not reachable.";
    return createSucceededProbeResult({
        request: lease.capability_request,
        summary,
        result: {
            result_summary: summary,
            reachable: fixture.reachable,
            distance: fixture.distance,
        },
        now,
    });
};
