import { z } from "zod";
export const HELIX_ENVIRONMENT_CONNECTOR_CONTRACT_VERSION = "v1";
export const HELIX_ENVIRONMENT_CAPABILITY_DESCRIPTOR_SCHEMA = "helix.environment_connector.capability_descriptor.v1";
export const HELIX_ENVIRONMENT_CATALOG_SNAPSHOT_SCHEMA = "helix.environment_connector.catalog_snapshot.v1";
export const HELIX_ENVIRONMENT_PROBE_SUBMISSION_SCHEMA = "helix.environment_connector.probe_submission.v1";
export const HELIX_ENVIRONMENT_PROBE_REQUEST_V1_SCHEMA = "helix.environment_connector.probe_request.v1";
export const HELIX_ENVIRONMENT_PROBE_RESULT_V1_SCHEMA = "helix.environment_connector.probe_result.v1";
export const HELIX_ENVIRONMENT_PROBE_OBSERVATION_SCHEMA = "helix.environment_connector.probe_observation.v1";
export const HELIX_ENVIRONMENT_PAIRING_SESSION_SCHEMA = "helix.environment_connector.pairing_session.v1";
export const HELIX_ENVIRONMENT_PROBE_CAPABILITY = "room.environment.probe";
export const HELIX_SYNTHETIC_REACHABILITY_CAPABILITY = "com.casimirbot.synthetic.reachability.check";
export const HELIX_SYSTEM_CLOCK_READ_CAPABILITY = "com.casimirbot.system.clock.read";
const identifierSchema = z
    .string()
    .trim()
    .min(1)
    .max(320)
    .regex(/^[a-zA-Z0-9:._/-]+$/);
const sha256Schema = z.string().regex(/^sha256:[a-f0-9]{64}$/);
const timestampSchema = z.string().datetime({ offset: true });
export const helixEnvironmentCapabilityClassSchema = z.enum([
    "observe",
    "probe",
    "act",
]);
export const helixEnvironmentProbeOutcomeSchema = z.enum([
    "succeeded",
    "connector_offline",
    "probe_timeout",
    "capability_unavailable",
    "capability_version_changed",
    "target_unavailable",
    "target_ambiguous",
    "subject_binding_required",
    "subject_binding_stale",
    "subject_offline",
    "wrong_environment",
    "wrong_world",
    "permission_revoked",
    "binding_revoked",
    "schema_validation_failed",
    "result_stale",
    "request_canceled",
    "request_superseded",
    "producer_epoch_mismatch",
    "environment_adapter_contract_changed",
    "probe_failed",
]);
export const helixEnvironmentConstrainedJsonSchema = z.lazy(() => z
    .object({
    type: z.enum(["object", "array", "string", "number", "integer", "boolean"]),
    description: z.string().max(500).optional(),
    enum: z.array(z.union([z.string(), z.number(), z.boolean()])).max(64).optional(),
    oneOf: z
        .array(helixEnvironmentConstrainedJsonSchema)
        .min(2)
        .max(32)
        .optional(),
    properties: z
        .record(z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,79}$/), helixEnvironmentConstrainedJsonSchema)
        .optional(),
    required: z.array(z.string()).max(64).optional(),
    additionalProperties: z.literal(false).optional(),
    items: helixEnvironmentConstrainedJsonSchema.optional(),
    minItems: z.number().int().nonnegative().optional(),
    maxItems: z.number().int().positive().max(256).optional(),
    minimum: z.number().finite().optional(),
    maximum: z.number().finite().optional(),
    minLength: z.number().int().nonnegative().optional(),
    maxLength: z.number().int().positive().max(16000).optional(),
})
    .strict()
    .superRefine((rawSchema, context) => {
    const schema = rawSchema;
    if (schema.type === "object" && !schema.properties && !schema.oneOf) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Object connector schemas require explicit properties.",
        });
    }
    if (schema.type === "array" && !schema.items && !schema.oneOf) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Array connector schemas require explicit items.",
        });
    }
    if (schema.oneOf &&
        (schema.properties !== undefined ||
            schema.required !== undefined ||
            schema.additionalProperties !== undefined ||
            schema.items !== undefined ||
            schema.enum !== undefined ||
            schema.minItems !== undefined ||
            schema.maxItems !== undefined ||
            schema.minimum !== undefined ||
            schema.maximum !== undefined ||
            schema.minLength !== undefined ||
            schema.maxLength !== undefined)) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Connector oneOf schemas must be exclusive alternative wrappers without sibling validation keywords.",
        });
    }
    if (schema.properties &&
        Object.keys(schema.properties).length > 64) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Connector schemas may declare at most 64 properties.",
        });
    }
    if (schema.minimum !== undefined && schema.maximum !== undefined &&
        schema.minimum > schema.maximum) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Schema minimum cannot exceed maximum.",
        });
    }
}));
export const helixEnvironmentCapabilityDescriptorSchema = z
    .object({
    schema: z.literal(HELIX_ENVIRONMENT_CAPABILITY_DESCRIPTOR_SCHEMA),
    capability_id: identifierSchema,
    capability_version: z.number().int().positive(),
    capability_class: helixEnvironmentCapabilityClassSchema,
    domain: identifierSchema,
    adapter_profile_ids: z.array(identifierSchema).min(1).max(64),
    trusted_model_label: z.string().trim().min(1).max(120),
    trusted_model_description: z.string().trim().min(1).max(800),
    input_schema: helixEnvironmentConstrainedJsonSchema,
    input_schema_hash: sha256Schema,
    output_schema: helixEnvironmentConstrainedJsonSchema,
    output_schema_hash: sha256Schema,
    freshness_ceiling_ms: z.number().int().positive().max(60 * 60 * 1000),
    timeout_ceiling_ms: z.number().int().positive().max(30 * 60 * 1000),
    read_only: z.boolean(),
    side_effects_allowed: z.boolean(),
    requires_current_turn_reentry: z.literal(true),
    publisher_metadata_lane: z.literal("ui_only_untrusted"),
    assistant_answer: z.literal(false),
    raw_content_included: z.literal(false),
})
    .strict()
    .superRefine((descriptor, context) => {
    if (descriptor.capability_class === "probe" &&
        (!descriptor.read_only || descriptor.side_effects_allowed)) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Environment probes must remain read-only and side-effect free.",
        });
    }
    if (descriptor.capability_class === "act" &&
        descriptor.read_only) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Action descriptors cannot be projected as read-only probes.",
        });
    }
});
export const helixEnvironmentCatalogSnapshotSchema = z
    .object({
    schema: z.literal(HELIX_ENVIRONMENT_CATALOG_SNAPSHOT_SCHEMA),
    catalog_snapshot_id: identifierSchema,
    catalog_hash: sha256Schema,
    environment_binding_ref: identifierSchema,
    connector_installation_ref: identifierSchema,
    device_ref: identifierSchema,
    adapter_profile_id: identifierSchema,
    adapter_profile_version: z.number().int().positive(),
    adapter_contract_hash: sha256Schema,
    manifest_hash: sha256Schema,
    capability_descriptors: z
        .array(helixEnvironmentCapabilityDescriptorSchema)
        .min(1)
        .max(128),
    frozen_at: timestampSchema,
    expires_at: timestampSchema.nullable(),
    content_role: z.literal("server_owned_capability_catalog"),
    answer_authority: z.literal(false),
    assistant_answer: z.literal(false),
    terminal_eligible: z.literal(false),
    raw_content_included: z.literal(false),
})
    .strict();
export const helixEnvironmentProbeSubmissionSchema = z
    .object({
    schema: z.literal(HELIX_ENVIRONMENT_PROBE_SUBMISSION_SCHEMA),
    probe_attempt_id: identifierSchema,
    lease_token: z.string().min(32).max(512),
    result: z.unknown(),
    submitted_at: timestampSchema,
})
    .strict();
export const helixEnvironmentConnectorProbeRequestSchema = z
    .object({
    schema: z.literal(HELIX_ENVIRONMENT_PROBE_REQUEST_V1_SCHEMA),
    probe_request_id: identifierSchema,
    capability_id: identifierSchema,
    capability_version: z.number().int().positive(),
    catalog_snapshot_id: identifierSchema,
    arguments: z.record(z.string(), z.unknown()),
    constraints: z
        .object({
        read_only: z.literal(true),
        side_effects_allowed: z.literal(false),
        max_duration_ms: z.number().int().positive(),
    })
        .strict(),
    created_at: timestampSchema,
    deadline_at: timestampSchema,
    assistant_answer: z.literal(false),
    raw_content_included: z.literal(false),
})
    .strict();
export const helixEnvironmentConnectorProbeResultSchema = z
    .object({
    schema: z.literal(HELIX_ENVIRONMENT_PROBE_RESULT_V1_SCHEMA),
    probe_request_id: identifierSchema,
    capability_id: identifierSchema,
    capability_version: z.number().int().positive(),
    outcome: helixEnvironmentProbeOutcomeSchema,
    summary: z.string().trim().min(1).max(2000),
    result: z.record(z.string(), z.unknown()),
    side_effects_performed: z.literal(false),
    commands_executed: z.array(z.unknown()).length(0),
    environment_mutation_performed: z.literal(false),
    deterministic: z.literal(true),
    model_invoked: z.literal(false),
    assistant_answer: z.literal(false),
    raw_content_included: z.literal(false),
    created_at: timestampSchema,
})
    .strict();
export const helixEnvironmentProbeObservationSchema = z
    .object({
    schema: z.literal(HELIX_ENVIRONMENT_PROBE_OBSERVATION_SCHEMA),
    probe_request_ref: identifierSchema,
    environment_binding_ref: identifierSchema.optional(),
    probe_attempt_ref: identifierSchema.nullable(),
    capability_id: identifierSchema,
    capability_version: z.number().int().positive(),
    outcome: helixEnvironmentProbeOutcomeSchema,
    summary: z.string().trim().min(1).max(2000),
    result: z.record(z.string(), z.unknown()),
    evidence_ref: identifierSchema,
    observation_revision: z.number().int().nonnegative().optional(),
    observed_at: timestampSchema,
    freshness_age_ms: z.number().int().nonnegative().nullable(),
    provenance_valid: z.boolean(),
    eligible_for_current_turn_reentry: z.boolean(),
    late_result_disposition: z
        .enum([
        "late_after_turn_closed",
        "late_after_timeout",
        "late_after_cancellation",
        "late_after_supersession",
    ])
        .nullable(),
    content_role: z.literal("environment_probe_observation_not_assistant_answer"),
    reentry_required: z.literal(true),
    answer_authority: z.literal(false),
    assistant_answer: z.literal(false),
    terminal_eligible: z.literal(false),
    raw_content_included: z.literal(false),
})
    .strict();
export const helixEnvironmentPairingSessionSchema = z
    .object({
    schema: z.literal(HELIX_ENVIRONMENT_PAIRING_SESSION_SCHEMA),
    pairing_session_id: identifierSchema,
    verification_uri: z.string().url(),
    user_code: z.string().regex(/^[A-Z0-9-]{6,20}$/),
    expires_at: timestampSchema,
    interval_seconds: z.number().int().min(2).max(60),
    status: z.enum(["pending", "approved", "claimed", "expired", "revoked"]),
    requested_capability_ids: z.array(identifierSchema).min(1).max(64),
    credential_included: z.literal(false),
    assistant_answer: z.literal(false),
    raw_content_included: z.literal(false),
})
    .strict();
