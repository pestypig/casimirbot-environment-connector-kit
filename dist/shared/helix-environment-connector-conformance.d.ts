import type { HelixEnvironmentConstrainedJsonSchema } from "./helix-environment-connector.js";
export type EnvironmentConnectorSchemaIssue = {
    path: string;
    code: string;
    message: string;
};
export declare const validateEnvironmentConnectorSchemaValue: (schema: HelixEnvironmentConstrainedJsonSchema, value: unknown, path?: string) => EnvironmentConnectorSchemaIssue[];
export declare const compileEnvironmentConnectorSchema: (schema: HelixEnvironmentConstrainedJsonSchema) => ((value: unknown) => {
    ok: boolean;
    issues: EnvironmentConnectorSchemaIssue[];
});
