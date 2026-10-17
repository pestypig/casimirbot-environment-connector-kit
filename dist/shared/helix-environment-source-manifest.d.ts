import type { HelixEnvironmentDomain } from "./helix-environment-state-snapshot.js";
import { type HelixEnvironmentSensorScope } from "./helix-environment-sensor-scope.js";
import { z } from "zod";
export declare const HELIX_ENVIRONMENT_SOURCE_MANIFEST_SCHEMA: "helix.environment_source_manifest.v1";
export declare const HELIX_ENVIRONMENT_SOURCE_HEARTBEAT_SCHEMA: "helix.environment_source_heartbeat.v1";
export type HelixEnvironmentSourceModality = "environment_state" | "environment_affordance" | "procedure_graph" | "simulation_stream" | "visual_frame" | "audio_transcript";
export type HelixEnvironmentSnapshotSection = "actor_state" | "inventory_state" | "object_state" | "local_map" | "chunk_snapshot_summary" | "focus" | "affordances" | "domain_specific";
export type HelixEnvironmentManifestProbeType = "actor_status" | "nearby_entities" | "route_feasibility" | "reachability" | "line_of_sight" | "container_freshness" | "crop_state" | "hazard_check" | "inventory_check" | "local_map_summary" | "spatial_region" | "perception_snapshot" | "registry_fact" | "recipe_fact";
export type HelixEnvironmentForbiddenProbeType = "move_actor" | "use_item" | "take_item" | "place_block" | "break_block" | "attack_entity" | "open_container";
export type HelixEnvironmentSourceManifest = {
    schema: typeof HELIX_ENVIRONMENT_SOURCE_MANIFEST_SCHEMA;
    manifest_id: string;
    source_id: string;
    room_id: string;
    domain: HelixEnvironmentDomain;
    domain_adapter: string;
    source_label: string;
    adapter_version: string;
    protocol_version: string;
    modalities: HelixEnvironmentSourceModality[];
    supported_snapshot_sections: HelixEnvironmentSnapshotSection[];
    supported_probe_types: HelixEnvironmentManifestProbeType[];
    forbidden_probe_types: HelixEnvironmentForbiddenProbeType[];
    snapshot_policy: {
        baseline_interval_ms: number;
        burst_interval_ms?: number | null;
        send_only_changed_sections: boolean;
        include_section_hashes: boolean;
        max_payload_bytes: number;
        raw_payload_included: false;
        raw_nbt_included?: false;
    };
    sensor_scope_policy: {
        default_scope: HelixEnvironmentSensorScope;
        can_report_privileged_state: boolean;
        privileged_state_requires_caveat: true;
        player_memory_requires_prior_observation: true;
    };
    execution_policy: {
        may_execute_live_actions: false;
        may_perform_read_only_probes: true;
        require_human_approval_for_execution: true;
    };
    auth_policy: {
        bearer_required: boolean;
        source_signature_required?: boolean;
    };
    assistant_answer: false;
    raw_content_included: false;
    context_policy: "compact_context_pack_only";
    created_at: string;
};
export type HelixEnvironmentSourceHeartbeat = {
    schema: typeof HELIX_ENVIRONMENT_SOURCE_HEARTBEAT_SCHEMA;
    heartbeat_id: string;
    source_id: string;
    room_id: string;
    domain: string;
    domain_adapter: string;
    status: "active" | "degraded" | "paused" | "stale" | "error";
    server_tick?: number | null;
    latest_snapshot_id?: string | null;
    latest_snapshot_ts?: string | null;
    active_players?: Array<{
        actor_id: string;
        stable_actor_id?: string | null;
        actor_label: string;
        dimension?: string | null;
    }>;
    pending_probe_count?: number;
    backpressure?: {
        snapshot_upload_pending: boolean;
        skipped_snapshot_count: number;
        avg_payload_bytes?: number | null;
    };
    runtime_status?: {
        upload_queue?: string | null;
        backoff_state?: string | null;
        auth_failure_count?: number | null;
        oversized_payload_count?: number | null;
        contract_failure_count?: number | null;
        last_error?: string | null;
    };
    evidence_refs: string[];
    assistant_answer: false;
    raw_content_included: false;
    created_at: string;
};
export declare const helixEnvironmentSourceManifestSchema: z.ZodObject<{
    schema: z.ZodLiteral<"helix.environment_source_manifest.v1">;
    manifest_id: z.ZodString;
    source_id: z.ZodString;
    room_id: z.ZodString;
    domain: z.ZodString;
    domain_adapter: z.ZodString;
    source_label: z.ZodString;
    adapter_version: z.ZodString;
    protocol_version: z.ZodString;
    modalities: z.ZodArray<z.ZodEnum<["environment_state", "environment_affordance", "procedure_graph", "simulation_stream", "visual_frame", "audio_transcript"]>, "many">;
    supported_snapshot_sections: z.ZodArray<z.ZodEnum<["actor_state", "inventory_state", "object_state", "local_map", "chunk_snapshot_summary", "focus", "affordances", "domain_specific"]>, "many">;
    supported_probe_types: z.ZodArray<z.ZodEnum<["actor_status", "nearby_entities", "route_feasibility", "reachability", "line_of_sight", "container_freshness", "crop_state", "hazard_check", "inventory_check", "local_map_summary", "spatial_region", "perception_snapshot", "registry_fact", "recipe_fact"]>, "many">;
    forbidden_probe_types: z.ZodArray<z.ZodEnum<["move_actor", "use_item", "take_item", "place_block", "break_block", "attack_entity", "open_container"]>, "many">;
    snapshot_policy: z.ZodObject<{
        baseline_interval_ms: z.ZodNumber;
        burst_interval_ms: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        send_only_changed_sections: z.ZodBoolean;
        include_section_hashes: z.ZodBoolean;
        max_payload_bytes: z.ZodNumber;
        raw_payload_included: z.ZodLiteral<false>;
        raw_nbt_included: z.ZodOptional<z.ZodLiteral<false>>;
    }, "strict", z.ZodTypeAny, {
        baseline_interval_ms: number;
        send_only_changed_sections: boolean;
        include_section_hashes: boolean;
        max_payload_bytes: number;
        raw_payload_included: false;
        burst_interval_ms?: number | null | undefined;
        raw_nbt_included?: false | undefined;
    }, {
        baseline_interval_ms: number;
        send_only_changed_sections: boolean;
        include_section_hashes: boolean;
        max_payload_bytes: number;
        raw_payload_included: false;
        burst_interval_ms?: number | null | undefined;
        raw_nbt_included?: false | undefined;
    }>;
    sensor_scope_policy: z.ZodObject<{
        default_scope: z.ZodType<HelixEnvironmentSensorScope, z.ZodTypeDef, HelixEnvironmentSensorScope>;
        can_report_privileged_state: z.ZodBoolean;
        privileged_state_requires_caveat: z.ZodLiteral<true>;
        player_memory_requires_prior_observation: z.ZodLiteral<true>;
    }, "strict", z.ZodTypeAny, {
        default_scope: HelixEnvironmentSensorScope;
        can_report_privileged_state: boolean;
        privileged_state_requires_caveat: true;
        player_memory_requires_prior_observation: true;
    }, {
        default_scope: HelixEnvironmentSensorScope;
        can_report_privileged_state: boolean;
        privileged_state_requires_caveat: true;
        player_memory_requires_prior_observation: true;
    }>;
    execution_policy: z.ZodObject<{
        may_execute_live_actions: z.ZodLiteral<false>;
        may_perform_read_only_probes: z.ZodLiteral<true>;
        require_human_approval_for_execution: z.ZodLiteral<true>;
    }, "strict", z.ZodTypeAny, {
        may_execute_live_actions: false;
        may_perform_read_only_probes: true;
        require_human_approval_for_execution: true;
    }, {
        may_execute_live_actions: false;
        may_perform_read_only_probes: true;
        require_human_approval_for_execution: true;
    }>;
    auth_policy: z.ZodObject<{
        bearer_required: z.ZodBoolean;
        source_signature_required: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        bearer_required: boolean;
        source_signature_required?: boolean | undefined;
    }, {
        bearer_required: boolean;
        source_signature_required?: boolean | undefined;
    }>;
    assistant_answer: z.ZodLiteral<false>;
    raw_content_included: z.ZodLiteral<false>;
    context_policy: z.ZodLiteral<"compact_context_pack_only">;
    created_at: z.ZodEffects<z.ZodString, string, string>;
}, "strict", z.ZodTypeAny, {
    schema: "helix.environment_source_manifest.v1";
    domain: string;
    assistant_answer: false;
    raw_content_included: false;
    created_at: string;
    manifest_id: string;
    source_id: string;
    room_id: string;
    domain_adapter: string;
    source_label: string;
    adapter_version: string;
    protocol_version: string;
    modalities: ("environment_state" | "environment_affordance" | "procedure_graph" | "simulation_stream" | "visual_frame" | "audio_transcript")[];
    supported_snapshot_sections: ("actor_state" | "inventory_state" | "object_state" | "local_map" | "chunk_snapshot_summary" | "focus" | "affordances" | "domain_specific")[];
    supported_probe_types: ("actor_status" | "nearby_entities" | "route_feasibility" | "reachability" | "line_of_sight" | "container_freshness" | "crop_state" | "hazard_check" | "inventory_check" | "local_map_summary" | "spatial_region" | "perception_snapshot" | "registry_fact" | "recipe_fact")[];
    forbidden_probe_types: ("move_actor" | "use_item" | "take_item" | "place_block" | "break_block" | "attack_entity" | "open_container")[];
    snapshot_policy: {
        baseline_interval_ms: number;
        send_only_changed_sections: boolean;
        include_section_hashes: boolean;
        max_payload_bytes: number;
        raw_payload_included: false;
        burst_interval_ms?: number | null | undefined;
        raw_nbt_included?: false | undefined;
    };
    sensor_scope_policy: {
        default_scope: HelixEnvironmentSensorScope;
        can_report_privileged_state: boolean;
        privileged_state_requires_caveat: true;
        player_memory_requires_prior_observation: true;
    };
    execution_policy: {
        may_execute_live_actions: false;
        may_perform_read_only_probes: true;
        require_human_approval_for_execution: true;
    };
    auth_policy: {
        bearer_required: boolean;
        source_signature_required?: boolean | undefined;
    };
    context_policy: "compact_context_pack_only";
}, {
    schema: "helix.environment_source_manifest.v1";
    domain: string;
    assistant_answer: false;
    raw_content_included: false;
    created_at: string;
    manifest_id: string;
    source_id: string;
    room_id: string;
    domain_adapter: string;
    source_label: string;
    adapter_version: string;
    protocol_version: string;
    modalities: ("environment_state" | "environment_affordance" | "procedure_graph" | "simulation_stream" | "visual_frame" | "audio_transcript")[];
    supported_snapshot_sections: ("actor_state" | "inventory_state" | "object_state" | "local_map" | "chunk_snapshot_summary" | "focus" | "affordances" | "domain_specific")[];
    supported_probe_types: ("actor_status" | "nearby_entities" | "route_feasibility" | "reachability" | "line_of_sight" | "container_freshness" | "crop_state" | "hazard_check" | "inventory_check" | "local_map_summary" | "spatial_region" | "perception_snapshot" | "registry_fact" | "recipe_fact")[];
    forbidden_probe_types: ("move_actor" | "use_item" | "take_item" | "place_block" | "break_block" | "attack_entity" | "open_container")[];
    snapshot_policy: {
        baseline_interval_ms: number;
        send_only_changed_sections: boolean;
        include_section_hashes: boolean;
        max_payload_bytes: number;
        raw_payload_included: false;
        burst_interval_ms?: number | null | undefined;
        raw_nbt_included?: false | undefined;
    };
    sensor_scope_policy: {
        default_scope: HelixEnvironmentSensorScope;
        can_report_privileged_state: boolean;
        privileged_state_requires_caveat: true;
        player_memory_requires_prior_observation: true;
    };
    execution_policy: {
        may_execute_live_actions: false;
        may_perform_read_only_probes: true;
        require_human_approval_for_execution: true;
    };
    auth_policy: {
        bearer_required: boolean;
        source_signature_required?: boolean | undefined;
    };
    context_policy: "compact_context_pack_only";
}>;
export declare const helixEnvironmentSourceHeartbeatSchema: z.ZodObject<{
    schema: z.ZodLiteral<"helix.environment_source_heartbeat.v1">;
    heartbeat_id: z.ZodString;
    source_id: z.ZodString;
    room_id: z.ZodString;
    domain: z.ZodString;
    domain_adapter: z.ZodString;
    status: z.ZodEnum<["active", "degraded", "paused", "stale", "error"]>;
    server_tick: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    latest_snapshot_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    latest_snapshot_ts: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    active_players: z.ZodOptional<z.ZodArray<z.ZodObject<{
        actor_id: z.ZodString;
        stable_actor_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        actor_label: z.ZodString;
        dimension: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strict", z.ZodTypeAny, {
        actor_id: string;
        actor_label: string;
        stable_actor_id?: string | null | undefined;
        dimension?: string | null | undefined;
    }, {
        actor_id: string;
        actor_label: string;
        stable_actor_id?: string | null | undefined;
        dimension?: string | null | undefined;
    }>, "many">>;
    pending_probe_count: z.ZodOptional<z.ZodNumber>;
    backpressure: z.ZodOptional<z.ZodObject<{
        snapshot_upload_pending: z.ZodBoolean;
        skipped_snapshot_count: z.ZodNumber;
        avg_payload_bytes: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        snapshot_upload_pending: boolean;
        skipped_snapshot_count: number;
        avg_payload_bytes?: number | null | undefined;
    }, {
        snapshot_upload_pending: boolean;
        skipped_snapshot_count: number;
        avg_payload_bytes?: number | null | undefined;
    }>>;
    runtime_status: z.ZodOptional<z.ZodObject<{
        upload_queue: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        backoff_state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        auth_failure_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        oversized_payload_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        contract_failure_count: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        last_error: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strict", z.ZodTypeAny, {
        upload_queue?: string | null | undefined;
        backoff_state?: string | null | undefined;
        auth_failure_count?: number | null | undefined;
        oversized_payload_count?: number | null | undefined;
        contract_failure_count?: number | null | undefined;
        last_error?: string | null | undefined;
    }, {
        upload_queue?: string | null | undefined;
        backoff_state?: string | null | undefined;
        auth_failure_count?: number | null | undefined;
        oversized_payload_count?: number | null | undefined;
        contract_failure_count?: number | null | undefined;
        last_error?: string | null | undefined;
    }>>;
    evidence_refs: z.ZodArray<z.ZodString, "many">;
    assistant_answer: z.ZodLiteral<false>;
    raw_content_included: z.ZodLiteral<false>;
    created_at: z.ZodEffects<z.ZodString, string, string>;
}, "strict", z.ZodTypeAny, {
    status: "active" | "degraded" | "paused" | "stale" | "error";
    schema: "helix.environment_source_heartbeat.v1";
    domain: string;
    assistant_answer: false;
    raw_content_included: false;
    created_at: string;
    source_id: string;
    room_id: string;
    domain_adapter: string;
    heartbeat_id: string;
    evidence_refs: string[];
    server_tick?: number | null | undefined;
    latest_snapshot_id?: string | null | undefined;
    latest_snapshot_ts?: string | null | undefined;
    active_players?: {
        actor_id: string;
        actor_label: string;
        stable_actor_id?: string | null | undefined;
        dimension?: string | null | undefined;
    }[] | undefined;
    pending_probe_count?: number | undefined;
    backpressure?: {
        snapshot_upload_pending: boolean;
        skipped_snapshot_count: number;
        avg_payload_bytes?: number | null | undefined;
    } | undefined;
    runtime_status?: {
        upload_queue?: string | null | undefined;
        backoff_state?: string | null | undefined;
        auth_failure_count?: number | null | undefined;
        oversized_payload_count?: number | null | undefined;
        contract_failure_count?: number | null | undefined;
        last_error?: string | null | undefined;
    } | undefined;
}, {
    status: "active" | "degraded" | "paused" | "stale" | "error";
    schema: "helix.environment_source_heartbeat.v1";
    domain: string;
    assistant_answer: false;
    raw_content_included: false;
    created_at: string;
    source_id: string;
    room_id: string;
    domain_adapter: string;
    heartbeat_id: string;
    evidence_refs: string[];
    server_tick?: number | null | undefined;
    latest_snapshot_id?: string | null | undefined;
    latest_snapshot_ts?: string | null | undefined;
    active_players?: {
        actor_id: string;
        actor_label: string;
        stable_actor_id?: string | null | undefined;
        dimension?: string | null | undefined;
    }[] | undefined;
    pending_probe_count?: number | undefined;
    backpressure?: {
        snapshot_upload_pending: boolean;
        skipped_snapshot_count: number;
        avg_payload_bytes?: number | null | undefined;
    } | undefined;
    runtime_status?: {
        upload_queue?: string | null | undefined;
        backoff_state?: string | null | undefined;
        auth_failure_count?: number | null | undefined;
        oversized_payload_count?: number | null | undefined;
        contract_failure_count?: number | null | undefined;
        last_error?: string | null | undefined;
    } | undefined;
}>;
