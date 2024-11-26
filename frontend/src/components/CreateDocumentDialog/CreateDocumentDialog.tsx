// CreateDocumentDialog.tsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { CreateDocumentDialogProps } from "./CreateDocumentDialog.types";

const CreateDocumentDialog: React.FC<CreateDocumentDialogProps> = ({
  isOpen,
  onClose,
  onCreate,
  newDocument,
  onInputChange,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Document</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={newDocument.name}
          onChange={onInputChange}
        />
        <TextField
          margin="dense"
          label="Content"
          name="content"
          fullWidth
          value={newDocument.content}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDocumentDialog;
