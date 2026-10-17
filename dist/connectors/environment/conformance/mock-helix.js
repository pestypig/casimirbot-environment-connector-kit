export class MockHelixConnectorEndpoint {
    submitted = [];
    pending = [];
    enqueue(lease) {
        this.pending.push(structuredClone(lease));
    }
    fetch = async (input, init) => {
        const url = new URL(typeof input === "string"
            ? input
            : input instanceof URL
                ? input.toString()
                : input.url);
        {
            const authorization = new Headers(init?.headers ?? (input instanceof Request ? input.headers : undefined)).get("authorization");
            if (authorization !== "Bearer helix_env_device_mock_credential_123456") {
                return Response.json({ message: "device_credential_invalid" }, { status: 401 });
            }
        }
        if (url.pathname.endsWith("/device/probes/pending")) {
            const lease = this.pending.shift();
            return Response.json({ leases: lease ? [lease] : [] });
        }
        if (url.pathname.endsWith("/device/probes/result")) {
            const submission = JSON.parse(String(init?.body ?? "{}"));
            this.submitted.push({
                probeAttemptId: String(submission.probe_attempt_id),
                result: submission.result,
            });
            return Response.json({ ok: true });
        }
        if (url.pathname.endsWith("/device/heartbeat")) {
            return Response.json({ ok: true, health: "online", command_execution: "command_execution_not_enabled" });
        }
        return Response.json({ message: "route_not_found" }, { status: 404 });
    };
}
