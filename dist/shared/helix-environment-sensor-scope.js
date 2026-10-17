export function isHelixEnvironmentSensorScope(value) {
    return (value === "player_observable" ||
        value === "player_memory" ||
        value === "sensor_observable" ||
        value === "privileged_server_state" ||
        value === "unknown");
}
