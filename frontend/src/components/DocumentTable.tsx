import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Document } from "../api/dataApi";

interface DocumentTableProps {
  documents: Document[];
  onRowClick: (id: number) => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onRowClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((doc) => (
            <TableRow
              key={doc.id}
              onClick={() => onRowClick(parseInt(doc.id))}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{doc.id}</TableCell>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.content}</TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell>{new Date(doc.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentTable;
