import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { Document } from "../api/dataApi";

interface EditDocumentFormProps {
  isOpen: boolean;
  document: Document | null;
  onClose: () => void;
  onUpdate: (updatedDocument: Document) => Promise<void>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EditDocumentForm: React.FC<EditDocumentFormProps> = ({
  isOpen,
  document,
  onClose,
  onUpdate,
  onInputChange,
}) => {
  if (!document) return null;

  const handleUpdate = async () => {
    await onUpdate(document);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Document</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={document.name}
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          label="Content"
          name="content"
          fullWidth
          value={document.content}
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          label="Size"
          name="size"
          fullWidth
          value={document.size}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDocumentForm;
