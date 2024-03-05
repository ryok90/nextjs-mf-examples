declare module 'remote/table' {
  export * from '@remote/components/table/table';
  import table from '@remote/components/table/table';
  export default table;
}

declare module 'remote/error' {
  export default () => null;
}
