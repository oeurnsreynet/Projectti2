import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

type LogoData = {
  id: number;
  title: string;
  image: string;
  image_url?: string;
};

const Logo = () => {
  const [logos, setLogos] = useState<LogoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    image: File | null;
  }>({
    title: "",
    image: null,
  });

  const fetchLogos = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/logos");
      const data = await res.json();
      setLogos(data);
    } catch (err) {
      console.error("Error fetching logos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleOpen = () => {
    setFormData({ title: "", image: null });
    setIsEditMode(false);
    setEditId(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ title: "", image: null });
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = (logo: LogoData) => {
    setFormData({ title: logo.title, image: null });
    setIsEditMode(true);
    setEditId(logo.id);
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmitLogo = async () => {
    try {
      const form = new FormData();
      form.append("title", formData.title);
      if (formData.image) form.append("image", formData.image);

      const url = isEditMode
        ? `http://127.0.0.1:8000/api/logos/${editId}`
        : "http://127.0.0.1:8000/api/logos/logo";

      const method = "POST"; // Use PUT if your Laravel backend supports it

      const res = await fetch(url, {
        method,
        body: form,
      });

      if (!res.ok) throw new Error("Failed to submit logo");

      await fetchLogos();
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Error submitting logo");
    }
  };

  const handleDeleteLogo = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this logo?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/logos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete logo");

      await fetchLogos();
    } catch (err) {
      console.error(err);
      alert("Error deleting logo");
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Logos</Typography>
        <Button variant="contained" startIcon={<Add />} color="primary" onClick={handleOpen}>
          Add Logo
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logos.map((logo) => (
                <TableRow key={logo.id}>
                  <TableCell>{logo.id}</TableCell>
                  <TableCell>{logo.title}</TableCell>
                  <TableCell>
                    <img
                      src={logo.image_url || `/storage/${logo.image}`}
                      alt={logo.title}
                      width="50"
                      height="50"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(logo)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteLogo(logo.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? "Edit Logo" : "Add Logo"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Button variant="outlined" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          {formData.image && (
            <Typography variant="body2" mt={1}>
              Selected File: {formData.image.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitLogo}>
            {isEditMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Logo;
