import SchemaField from "./SchemaField";

export default interface Schema {
    name: string;
    schema: Map<string, SchemaField>;
}