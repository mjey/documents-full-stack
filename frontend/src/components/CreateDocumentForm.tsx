import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { CreateDocumentPayload } from "../api/dataApi";

interface CreateDocumentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: CreateDocumentPayload) => Promise<void>;
}

const CreateDocumentForm: React.FC<CreateDocumentFormProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [newDocument, setNewDocument] = useState<CreateDocumentPayload>({
    name: "",
    content: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewDocument({
      ...newDocument,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    await onCreate(newDocument);
    setNewDocument({ name: "", content: "" });
  };

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
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Content"
          name="content"
          fullWidth
          value={newDocument.content}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDocumentForm;
