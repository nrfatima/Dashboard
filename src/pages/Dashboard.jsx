import { Grid, Card, CardContent, Typography, Box, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';

const revenueData = [
  { month: "Sep", storeA: 120000, storeB: 95000 },
  { month: "Oct", storeA: 150000, storeB: 110000 },
  { month: "Nov", storeA: 180000, storeB: 130000 },
  { month: "Dec", storeA: 220000, storeB: 160000 },
  { month: "Jan", storeA: 200000, storeB: 175000 },
  { month: "Feb", storeA: 240000, storeB: 190000 },
];

const orderStatusData = [
  { name: "Delivered", value: 450, color: "#4caf50" },
  { name: "Processing", value: 120, color: "#2196f3" },
  { name: "Shipped", value: 80, color: "#ff9800" },
  { name: "Pending", value: 38, color: "#9e9e9e" },
  { name: "Cancelled", value: 12, color: "#f44336" },
];

const topProducts = [
  { name: "iPhone 14 Pro", store: "Electronics Hub", sales: 45, revenue: "PKR 449,550" },
  { name: "Nike Air Max", store: "Fashion Store", sales: 38, revenue: "PKR 456,000" },
  { name: "Laptop HP", store: "Electronics Hub", sales: 22, revenue: "PKR 197,780" },
  { name: "Cricket Bat", store: "Sports Shop", sales: 30, revenue: "PKR 255,000" },
  { name: "Coffee Maker", store: "Home Decor", sales: 28, revenue: "PKR 126,000" },
];

const recentOrders = [
  { id: "#ORD-010", customer: "Mariam Khan", store: "Fashion Store", amount: "PKR 9,500", status: "Processing" },
  { id: "#ORD-009", customer: "Bilal Ahmed", store: "Electronics Hub", amount: "PKR 85,000", status: "Delivered" },
  { id: "#ORD-008", customer: "Zainab Ahmed", store: "Fashion Store", amount: "PKR 11,500", status: "Shipped" },
  { id: "#ORD-007", customer: "Usman Khan", store: "Home Decor", amount: "PKR 3,600", status: "Delivered" },
  { id: "#ORD-006", customer: "Ayesha Ali", store: "Electronics Hub", amount: "PKR 89,900", status: "Cancelled" },
];

const lowStockItems = [
  { name: "Jeans Denim", stock: 3 },
  { name: "Nike Air Max", stock: 0 },
  { name: "Cricket Bat", stock: 0 },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered": return "success";
    case "Shipped": return "info";
    case "Processing": return "warning";
    case "Pending": return "default";
    case "Cancelled": return "error";
    default: return "default";
  }
};

export default function Dashboard() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>📊 Dashboard Overview</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Welcome back! Here's what's happening across your stores.
      </Typography>

      {/* LOW STOCK ALERT */}
      <Alert severity="warning" sx={{ mb: 3 }} icon={<WarningIcon />}>
        <strong>⚠️ Low Stock Alert!</strong>{" "}
        {lowStockItems.map((item) => (
          <Chip key={item.name}
            label={`${item.name} (${item.stock === 0 ? "Out of Stock" : item.stock + " left"})`}
            size="small" color={item.stock === 0 ? "error" : "warning"} sx={{ mr: 0.5, ml: 0.5 }} />
        ))}
      </Alert>

      {/* STAT CARDS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          { label: "Total Revenue", value: "PKR 1.84M", sub: "↑ 12% this month", subColor: "success.main", icon: <TrendingUpIcon sx={{ fontSize: 45, opacity: 0.3, color: "#1976d2" }} />, border: "#1976d2" },
          { label: "Total Orders", value: "688", sub: "↑ 8% this month", subColor: "success.main", icon: <ShoppingCartIcon sx={{ fontSize: 45, opacity: 0.3, color: "#388e3c" }} />, border: "#388e3c" },
          { label: "Connected Stores", value: "4", sub: "1 disconnected", subColor: "warning.main", icon: <StoreIcon sx={{ fontSize: 45, opacity: 0.3, color: "#f57c00" }} />, border: "#f57c00" },
          { label: "Total Products", value: "1,245", sub: "3 low stock", subColor: "error.main", icon: <InventoryIcon sx={{ fontSize: 45, opacity: 0.3, color: "#7b1fa2" }} />, border: "#7b1fa2" },
        ].map((card) => (
          <Grid item xs={12} md={3} key={card.label}>
            <Card sx={{ borderLeft: `4px solid ${card.border}`, height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">{card.label}</Typography>
                    <Typography variant="h5" fontWeight="bold">{card.value}</Typography>
                    <Typography variant="body2" color={card.subColor}>{card.sub}</Typography>
                  </Box>
                  {card.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CHARTS ROW */}
      <Grid container spacing={3} sx={{ mb: 3 }}>

        {/* LINE CHART */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" fontWeight="bold">📈 Revenue Trend — Store A vs Store B</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Monthly revenue in PKR</Typography>
              {/* THIS IS THE FIX - wrap in a div with explicit height */}
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v) => `${v / 1000}K`} />
                    <Tooltip formatter={(value) => [`PKR ${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="storeA" stroke="#1976d2" strokeWidth={3} name="Store A (Electronics)" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                    <Line type="monotone" dataKey="storeB" stroke="#388e3c" strokeWidth={3} name="Store B (Fashion)" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* PIE CHART */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">🥧 Order Status</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>Total 700 orders</Typography>
              {/* THIS IS THE FIX - wrap in a div with explicit height */}
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                      {orderStatusData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} orders`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* LEGEND */}
              <Box sx={{ mt: 1 }}>
                {orderStatusData.map((item) => (
                  <Box key={item.name} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color }} />
                      <Typography variant="caption" color="textSecondary">{item.name}</Typography>
                    </Box>
                    <Typography variant="caption" fontWeight="bold">{item.value}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* STORE COMPARISON */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>🏪 Store Performance Comparison</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Head-to-head metrics</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2.5, bgcolor: "#e3f2fd", borderRadius: 2, borderLeft: "4px solid #1976d2" }}>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>🏬 Store A — Electronics Hub</Typography>
                <Grid container spacing={2}>
                  {[{ l: "Revenue", v: "PKR 890,000" }, { l: "Orders", v: "456" }, { l: "Products", v: "198" }, { l: "Profit Margin", v: "24%" }].map((s) => (
                    <Grid item xs={6} key={s.l}>
                      <Box sx={{ bgcolor: "white", borderRadius: 1.5, p: 1.5 }}>
                        <Typography variant="caption" color="textSecondary">{s.l}</Typography>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary">{s.v}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2.5, bgcolor: "#e8f5e9", borderRadius: 2, borderLeft: "4px solid #388e3c" }}>
                <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>🏬 Store B — Fashion Store</Typography>
                <Grid container spacing={2}>
                  {[{ l: "Revenue", v: "PKR 450,000" }, { l: "Orders", v: "234" }, { l: "Products", v: "145" }, { l: "Profit Margin", v: "31%" }].map((s) => (
                    <Grid item xs={6} key={s.l}>
                      <Box sx={{ bgcolor: "white", borderRadius: 1.5, p: 1.5 }}>
                        <Typography variant="caption" color="textSecondary">{s.l}</Typography>
                        <Typography variant="subtitle2" fontWeight="bold" color="success.main">{s.v}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* BOTTOM ROW */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>🛒 Recent Orders</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Latest 5 orders across all stores</Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f5f7fa" }}>
                      <TableCell><strong>Order ID</strong></TableCell>
                      <TableCell><strong>Customer</strong></TableCell>
                      <TableCell><strong>Store</strong></TableCell>
                      <TableCell><strong>Amount</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell><strong>{order.id}</strong></TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell><Chip label={order.store} size="small" variant="outlined" color="primary" /></TableCell>
                        <TableCell><strong>{order.amount}</strong></TableCell>
                        <TableCell><Chip label={order.status} color={getStatusColor(order.status)} size="small" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>🏆 Top Selling Products</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Best performers this month</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {topProducts.map((product, index) => (
                  <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #f0f0f0", "&:hover": { bgcolor: "#f0f0f0" } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 28, height: 28, borderRadius: 1.5, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: index === 0 ? "#fef3c7" : index === 1 ? "#dbeafe" : "#f0fdf4" }}>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: index === 0 ? "#d97706" : index === 1 ? "#1d4ed8" : "#15803d" }}>
                          {index + 1}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">{product.name}</Typography>
                        <Typography variant="caption" color="textSecondary">{product.store}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="body2" fontWeight="bold" color="success.main">{product.revenue}</Typography>
                      <Typography variant="caption" color="textSecondary">{product.sales} sold</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}