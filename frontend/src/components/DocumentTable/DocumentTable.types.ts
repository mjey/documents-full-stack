// DocumentTable.types.ts
export interface Document {
    id: string;
    name: string;
    content: string;
    size: string;
    created_at: string;
  }
  
  export interface DocumentTableProps {
    documents: Document[];
    onRowClick: (id: string) => void;
  }
  