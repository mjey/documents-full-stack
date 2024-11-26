import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Stack,
  Box,
} from "@mui/material";
import { EditDocumentDialogProps } from "./EditDocumentDialog.types";

const EditDocumentDialog: React.FC<EditDocumentDialogProps> = ({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  document,
  onInputChange,
}) => {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Edit Document
          <Button
            onClick={() => onDelete(document.id)}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </Box>
      </DialogTitle>
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
        <TextField
          margin="dense"
          label="Created At"
          fullWidth
          disabled
          value={new Date(document.created_at).toLocaleString()}
        />
      </DialogContent>
      <DialogActions>
        <Stack direction="row" justifyContent="right" width="100%">
          
          <Stack direction="row" spacing={2}>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onUpdate} variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EditDocumentDialog;
