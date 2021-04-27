export default interface SchemaField {
    type: string;
    unique?: boolean;
    required?: boolean;
    trim?: boolean;
    default?: any;
}