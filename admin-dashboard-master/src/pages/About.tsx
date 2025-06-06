import React, { useEffect, useState } from "react";
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
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

type AboutData = {
  id: number;
  title: string;
  content: string;
  image_url?: string;
};

const About = () => {
  const [abouts, setAbouts] = useState<AboutData[]>([]);
  const [open, setOpen] = useState(false);
  const [newAbout, setNewAbout] = useState({ title: "", content: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchAbouts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/abouts");
      const data = await response.json();
      setAbouts(data);
    } catch (error) {
      console.error("Failed to fetch abouts:", error);
    }
  };

  useEffect(() => {
    fetchAbouts();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setNewAbout({ title: "", content: "" });
    setImageFile(null);
    setIsEditing(false);
    setEditingId(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAbout({ ...newAbout, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddOrUpdateAbout = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newAbout.title);
      formData.append("content", newAbout.content);
      if (imageFile) formData.append("image", imageFile);
      if (isEditing) formData.append("_method", "PUT"); // Laravel expects this for updates

      const url = isEditing
        ? `http://127.0.0.1:8000/api/abouts/${editingId}`
        : "http://127.0.0.1:8000/api/abouts/about";

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text(); // parse as text, not JSON
        throw new Error(text || "Failed to submit form");
      }

      await fetchAbouts();
      handleClose();
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("Failed to submit: " + errorMessage);
    }
  };

  const handleEditAbout = (about: AboutData) => {
    setIsEditing(true);
    setEditingId(about.id);
    setNewAbout({ title: about.title, content: about.content });
    setPreviewUrl(about.image_url || null);
    setOpen(true);
  };

  const handleDeleteAbout = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/abouts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setAbouts(abouts.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Abouts</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
          Add About
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {abouts.map((about) => (
              <TableRow key={about.id}>
                <TableCell>{about.id}</TableCell>
                <TableCell>
                  {about.image_url ? (
                    <img src={about.image_url} alt="about" width={50} height={50} />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>{about.title}</TableCell>
                <TableCell>{about.content}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditAbout(about)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteAbout(about.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Edit About" : "Add About"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            name="title"
            label="Title"
            value={newAbout.title}
            onChange={handleChange}
          />
          <TextField
            name="content"
            label="Content"
            multiline
            rows={3}
            value={newAbout.content}
            onChange={handleChange}
          />
          <Button variant="outlined" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          {imageFile && <Typography variant="body2">{imageFile.name}</Typography>}
          {previewUrl && (
            <Box mt={2} mb={2}>
              <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200 }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddOrUpdateAbout}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default About;
