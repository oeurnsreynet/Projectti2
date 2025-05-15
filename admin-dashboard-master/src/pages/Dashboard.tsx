import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const summaryCards = [
  { title: "Total Products", value: 120 },
  { title: "Total Customers", value: 80 },
  { title: "Total Orders", value: 45 },
  { title: "Total Revenue", value: "$12,500" },
];

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
];

const recentOrders = [
  { id: 1, customer: "John Doe", amount: "$120", date: "2024-04-20" },
  { id: 2, customer: "Jane Smith", amount: "$250", date: "2024-04-21" },
  { id: 3, customer: "Michael Brown", amount: "$80", date: "2024-04-22" },
];

const DashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Summary Cards */}
      <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
        {summaryCards.map((card, index) => (
          <Card
            key={index}
            sx={{
              flex: "1 1 200px",
              backgroundColor: "#FFF7E6",
              boxShadow: 3,
              minWidth: 200,
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                {card.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold" mt={1}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Middle Section (Sales Chart + Recent Orders) */}
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
        {/* Sales Chart */}
        <Paper sx={{ flex: 2, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Sales Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#ff7300"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* Recent Orders */}
        <Paper sx={{ flex: 1, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Recent Orders
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage;
