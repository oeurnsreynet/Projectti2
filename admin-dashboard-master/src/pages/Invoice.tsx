import React, { useEffect, useState } from "react";
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
  Chip,
} from "@mui/material";

type Invoice = {
  id: number;
  customer: string;
  amount: number;
  status: string;
  date: string;
};

const Invoice = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/orders"); // Reusing order data as invoice base
        if (!response.ok) {
          throw new Error("Failed to fetch invoices");
        }

        const data = await response.json();

        const formatted = data.map((order: any, index: number) => ({
          id: order.id,
          customer: order.name,
          amount: Number(order.total),
          status: "Paid", // Or change this based on order.status if available
          date: order.order_date,
        }));

        setInvoices(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load invoice data");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Invoice List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount ($)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={invoice.status}
                      color={invoice.status === "Paid" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Invoice;
