import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { AddPhotoAlternate, Delete, Edit } from "@mui/icons-material";

type SlideData = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  ssorder: number;
};

const Slideshow = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [newSlide, setNewSlide] = useState({
    title: "",
    description: "",
    image: null as File | null,
    link: "",
    ssorder: 1,
  });

  const fetchSlides = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/slideshows/");
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setSlides(data);
      } else {
        const text = await response.text();
        console.error("Received non-JSON response:", text);
      }
    } catch (error) {
      console.error("Failed to fetch slides:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setNewSlide({
      title: "",
      description: "",
      image: null,
      link: "",
      ssorder: 1,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSlide({ ...newSlide, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewSlide({ ...newSlide, image: file });
    }
  };

  const handleEdit = (slide: SlideData) => {
    setNewSlide({
      title: slide.title,
      description: slide.description,
      image: null,
      link: slide.link,
      ssorder: slide.ssorder,
    });
    setEditingId(slide.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/slideshows/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete slide");
      }

      setSlides(slides.filter((s) => s.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleAddSlide = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newSlide.title);
      formData.append("description", newSlide.description);
      formData.append("link", newSlide.link);
      formData.append("ssorder", newSlide.ssorder.toString());
      if (newSlide.image) {
        formData.append("image", newSlide.image);
      }

      const url = editingId
        ? `http://127.0.0.1:8000/api/slideshows/slideshow/${editingId}`
        : "http://127.0.0.1:8000/api/slideshows/slideshow{id}";
      const method = editingId ? "POST" : "POST"; // Change to PUT/PATCH if your backend supports it

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to save slide");
      }

      const result = await response.json();

      if (editingId) {
        setSlides(slides.map((s) => (s.id === editingId ? result : s)));
      } else {
        setSlides([...slides, result]);
      }

      handleClose();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      alert("Error: " + errMsg);
    } finally {
      setLoading(false);
      setEditingId(null);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Slideshow</Typography>
        <Button variant="contained" startIcon={<AddPhotoAlternate />} onClick={handleOpen}>
          Add Slide
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slides.map((slide) => (
              <TableRow key={slide.id}>
                <TableCell>
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    style={{ width: 200, height: 200, borderRadius: 4 }}
                  />
                </TableCell>
                <TableCell>{slide.title}</TableCell>
                <TableCell>{slide.description}</TableCell>
                <TableCell>
                  <a href={slide.link} target="_blank" rel="noopener noreferrer">
                    {slide.link}
                  </a>
                </TableCell>
                <TableCell>{slide.ssorder}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(slide)} sx={{ mr: 1 }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error"  onClick={() => handleDelete(slide.id)}>
                   <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Slide Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Edit Slide" : "Add New Slide"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField name="title" label="Title" value={newSlide.title} onChange={handleChange} />
          <TextField
            name="description"
            label="Description"
            value={newSlide.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField name="link" label="Link" value={newSlide.link} onChange={handleChange} />
          <TextField
            name="ssorder"
            label="Slide Order"
            type="number"
            value={newSlide.ssorder}
            onChange={handleChange}
          />
          <Button variant="outlined" component="label">
            Choose Image
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          {newSlide.image && (
            <Box mt={2}>
              <Typography variant="body2">Selected Image:</Typography>
              <img
                src={URL.createObjectURL(newSlide.image)}
                alt="Selected"
                style={{ width: 200, height: 200, borderRadius: 4 }}
              />
            </Box>
          )}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSlide} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : editingId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Slideshow;
