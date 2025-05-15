import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Slideshow from "./pages/Slideshow";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Customer from "./pages/Customer";
import Invoice from "./pages/Invoice";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Logo from "./pages/Logo";
import Contact from "./pages/Contact";
import { Box } from "@mui/material";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Box sx={{ flexGrow: 1 }}>
          <Navbar collapsed={collapsed} />
          <Box sx={{ p: 2, mt: 8 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/slideshow" element={<Slideshow />} />
              <Route path="/category" element={<Category />} />
              <Route path="/product" element={<Product />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/logo" element={<Logo />} />
             
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
