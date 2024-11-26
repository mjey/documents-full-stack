import React from "react";
import { TextField } from "@mui/material";

interface DocumentSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentSearch: React.FC<DocumentSearchProps> = ({ value, onChange }) => {
  return (
    <TextField
      label="Search Documents"
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
    />
  );
};

export default DocumentSearch;
