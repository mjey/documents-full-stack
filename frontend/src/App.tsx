import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { dataApi, Document, CreateDocumentPayload, Meta } from "./api/dataApi";
import useDebounce from "./hooks/useDebounce";
import DocumentTable from "./components/DocumentTable/DocumentTable";
import CreateDocumentDialog from "./components/CreateDocumentDialog/CreateDocumentDialog";
import EditDocumentDialog from "./components/EditDocumentDialog/EditDocumentDialog";
import Notifications from "./components/Notifications/Notifications";

const App: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [newDocument, setNewDocument] = useState<CreateDocumentPayload>({
    name: "",
    content: "",
  });

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("id");
  const [order, setOrder] = useState<string>("asc");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const { documents, meta } = await dataApi.getDocuments(
        page,
        limit,
        sortBy,
        order,
        debouncedSearchQuery
      );
      setDocuments(documents);
      setMeta(meta);
    } catch (err) {
      setError("Failed to fetch documents." + err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, order, debouncedSearchQuery]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleRowClick = async (id: string) => {
    try {
      const document = await dataApi.getDocumentById(id);
      setSelectedDocument(document);
      setIsEditDialogOpen(true);
    } catch {
      setError("Failed to fetch document details.");
    }
  };

  const handleCreateDocument = async () => {
    try {
      await dataApi.createDocument(newDocument);
      fetchDocuments();
      setSuccessMessage("Document created successfully.");
      setIsCreateDialogOpen(false);
      setNewDocument({ name: "", content: "" });
    } catch {
      setError("Failed to create document.");
    }
  };

  const handleUpdateDocument = async () => {
    if (selectedDocument) {
      try {
        await dataApi.updateDocument(selectedDocument.id, {
          name: selectedDocument.name,
          content: selectedDocument.content,
          size: parseInt(selectedDocument.size),
        });
        fetchDocuments(); // Refresh the table
        setSuccessMessage("Document updated successfully.");
        setIsEditDialogOpen(false);
      } catch {
        setError("Failed to update document.");
      }
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      await dataApi.deleteDocument(id);
      fetchDocuments(); // Refresh the table
      setSuccessMessage("Document deleted successfully.");
      setIsEditDialogOpen(false);
    } catch {
      setError("Failed to delete document.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          Documents
        </Typography>
        <TextField
          label="Search Documents"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" onClick={() => setIsCreateDialogOpen(true)}>
          Create Document
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} mb={3}>
        <FormControl size="small">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <MenuItem value="id">Id</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="content">Content</MenuItem>
          <MenuItem value="size">Size</MenuItem>
          <MenuItem value="created_at">Created At</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>Order</InputLabel>
          <Select value={order} onChange={(e) => setOrder(e.target.value)}>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel>Limit</InputLabel>
          <Select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <DocumentTable documents={documents} onRowClick={handleRowClick} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        {meta && (
          <Pagination
            count={meta.total_pages}
            page={meta.current_page}
            onChange={(_, value) => setPage(value)}
          />
        )}
      </Box>

      <CreateDocumentDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateDocument}
        newDocument={newDocument}
        onInputChange={(e) =>
          setNewDocument((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />

      <EditDocumentDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onUpdate={handleUpdateDocument}
        onDelete={handleDeleteDocument}
        document={selectedDocument}
        onInputChange={(e) =>
          setSelectedDocument((prev) =>
            prev ? { ...prev, [e.target.name]: e.target.value } : null
          )
        }
      />

      <Notifications
        message={successMessage}
        severity="success"
        onClose={() => setSuccessMessage(null)}
      />
      <Notifications
        message={error}
        severity="error"
        onClose={() => setError(null)}
      />
    </Box>
  );
};

export default App;
