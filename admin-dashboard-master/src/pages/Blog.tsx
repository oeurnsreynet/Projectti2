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

type BlogData = {
  id: number;
  title: string;
  content: string;
  author: string;
  published_at?: string;
  image_url?: string;
};

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [open, setOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
    published_at: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setNewBlog({ title: "", content: "", author: "", published_at: "" });
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("content", newBlog.content);
      formData.append("author", newBlog.author);
      if (newBlog.published_at) formData.append("published_at", newBlog.published_at);
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch("http://127.0.0.1:8000/api/blogs/blog", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add blog");
      }

      const createdBlog = await response.json();
      setBlogs([...blogs, createdBlog]);
      handleClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("Failed to create blog: " + errorMessage);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setBlogs(blogs.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Blogs</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
          Add Blog
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published At</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.id}</TableCell>
                <TableCell>
                  {blog.image_url ? (
                    <img src={blog.image_url} alt="blog" width={50} height={50} />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.published_at || "N/A"}</TableCell>
                <TableCell>{blog.content}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => alert("Edit not implemented yet")}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteBlog(blog.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Blog</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField name="title" label="Title" value={newBlog.title} onChange={handleChange} />
          <TextField
            name="content"
            label="Content"
            multiline
            rows={3}
            value={newBlog.content}
            onChange={handleChange}
          />
          <TextField name="author" label="Author" value={newBlog.author} onChange={handleChange} />
          <TextField
            name="published_at"
            label="Published At"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newBlog.published_at}
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
          <Button variant="contained" onClick={handleAddBlog}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Blog;
