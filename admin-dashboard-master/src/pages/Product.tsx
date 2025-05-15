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
  MenuItem,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

type Category = {
  id: number;
  name: string;
};

type ProductData = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image_url: string;
  description: string;
};

const Product = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    category_id: string;
    price: string;
    image: File | null;
    description: string;
  }>({
    name: "",
    category_id: "",
    price: "",
    image: null,
    description: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/api/products/");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/categories/");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setFormData({
      name: "",
      category_id: "",
      price: "",
      image: null,
      description: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedProductId(null);
    setFormData({
      name: "",
      category_id: "",
      price: "",
      image: null,
      description: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleAddProduct = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("category_id", formData.category_id);
      form.append("price", formData.price);
      form.append("description", formData.description);
      if (formData.image) form.append("image", formData.image);

      const res = await fetch("http://127.0.0.1:8000/api/products/product", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to add product");

      await fetchProducts();
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  const handleEditClick = (product: ProductData) => {
    setEditMode(true);
    setSelectedProductId(product.id);
    setFormData({
      name: product.name,
      category_id: String(product.category?.id || ""),
      price: String(product.price),
      image: null,
      description: product.description,
    });
    setOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!selectedProductId) return;

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("category_id", formData.category_id);
      form.append("price", formData.price);
      form.append("description", formData.description);
      if (formData.image) form.append("image", formData.image);

      const res = await fetch(`http://127.0.0.1:8000/api/products/product/product{id}`, {
        method: "POST", // Laravel expects POST + _method=PUT
        headers: {
          Accept: "application/json",
        },
        body: (() => {
          form.append("_method", "PUT");
          return form;
        })(),
      });

      if (!res.ok) throw new Error("Failed to update product");

      await fetchProducts();
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      await fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" startIcon={<Add />} color="primary" onClick={handleOpen}>
          Add Product
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
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <img src={product.image_url} alt={product.name} width="50" height="50" />
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteProduct(product.id)}>
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
        <DialogTitle>{editMode ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField name="name" label="Name" value={formData.name} onChange={handleChange} />
          <TextField
            select
            name="category_id"
            label="Category"
            value={formData.category_id}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField name="price" label="Price" value={formData.price} onChange={handleChange} />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <TextField
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={editMode ? handleUpdateProduct : handleAddProduct}>
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
