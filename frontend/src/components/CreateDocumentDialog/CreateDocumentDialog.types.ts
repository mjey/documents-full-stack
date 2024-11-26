// CreateDocumentDialog.types.ts
export interface CreateDocumentPayload {
    name: string;
    content: string;
  }
  
  export interface CreateDocumentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: () => void;
    newDocument: CreateDocumentPayload;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  