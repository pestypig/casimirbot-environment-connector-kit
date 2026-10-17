export type HelixEnvironmentSensorScope = "player_observable" | "player_memory" | "sensor_observable" | "privileged_server_state" | "unknown";
export function isHelixEnvironmentSensorScope(value: unknown): value is HelixEnvironmentSensorScope {
    return (value === "player_observable" ||
        value === "player_memory" ||
        value === "sensor_observable" ||
        value === "privileged_server_state" ||
        value === "unknown");
}
