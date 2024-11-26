import { Document } from "../DocumentTable/DocumentTable.types";

export interface EditDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: (id: string) => void;
  document: Document | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
