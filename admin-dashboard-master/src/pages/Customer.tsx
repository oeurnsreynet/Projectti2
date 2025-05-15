import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

type Order = {
  orderId: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  note: string;
  subtotal: number;
  shipping: number;
  total: number;
  orderDate: string;
};

const Customer = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/orders/");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();

        // Assuming API returns data with keys matching your Order type
        // If keys differ, map/transform data accordingly here
        const formattedOrders = data.map((order: any) => ({
          orderId: order.id,
          name: order.name,
          email: order.email,
          address: order.address,
          phone: order.phone,
          note: order.note || "",
          subtotal: Number(order.subtotal),
          shipping: Number(order.shipping),
          total: Number(order.total),
          orderDate: order.order_date,
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error(error);
        alert("Error loading orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Customer Orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Subtotal ($)</TableCell>
                <TableCell>Shipping ($)</TableCell>
                <TableCell>Total ($)</TableCell>
                <TableCell>Order Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.note || "-"}</TableCell>
                  <TableCell>{order.subtotal.toFixed(2)}</TableCell>
                  <TableCell>{order.shipping.toFixed(2)}</TableCell>
                  <TableCell>{order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Customer;
