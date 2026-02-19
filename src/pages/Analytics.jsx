import { useState } from "react";
import {
  Grid, Card, CardContent, Typography, Box, Chip,
  FormControl, Select, MenuItem, InputLabel, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// ── DATA ──────────────────────────────────────────────────────────────────────
const allData = {
  week: {
    sales: [
      { period: "Mon", sales: 45000, orders: 18 },
      { period: "Tue", sales: 62000, orders: 24 },
      { period: "Wed", sales: 38000, orders: 15 },
      { period: "Thu", sales: 71000, orders: 28 },
      { period: "Fri", sales: 89000, orders: 35 },
      { period: "Sat", sales: 95000, orders: 40 },
      { period: "Sun", sales: 52000, orders: 20 },
    ],
    customers: [
      { period: "Mon", newCustomers: 8, returningCustomers: 10 },
      { period: "Tue", newCustomers: 12, returningCustomers: 12 },
      { period: "Wed", newCustomers: 6, returningCustomers: 9 },
      { period: "Thu", newCustomers: 14, returningCustomers: 14 },
      { period: "Fri", newCustomers: 18, returningCustomers: 17 },
      { period: "Sat", newCustomers: 20, returningCustomers: 20 },
      { period: "Sun", newCustomers: 10, returningCustomers: 10 },
    ],
    refunds: [
      { period: "Mon", refunds: 2, amount: 7000 },
      { period: "Tue", refunds: 4, amount: 15000 },
      { period: "Wed", refunds: 1, amount: 4000 },
      { period: "Thu", refunds: 5, amount: 18000 },
      { period: "Fri", refunds: 3, amount: 11000 },
      { period: "Sat", refunds: 6, amount: 22000 },
      { period: "Sun", refunds: 2, amount: 8000 },
    ],
    stats: { revenue: "PKR 452K", orders: 180, refunds: 23, profit: "PKR 136K" },
  },
  month: {
    sales: [
      { period: "Week 1", sales: 320000, orders: 120 },
      { period: "Week 2", sales: 410000, orders: 145 },
      { period: "Week 3", sales: 380000, orders: 132 },
      { period: "Week 4", sales: 520000, orders: 189 },
    ],
    customers: [
      { period: "Week 1", newCustomers: 45, returningCustomers: 75 },
      { period: "Week 2", newCustomers: 52, returningCustomers: 93 },
      { period: "Week 3", newCustomers: 48, returningCustomers: 84 },
      { period: "Week 4", newCustomers: 70, returningCustomers: 119 },
    ],
    refunds: [
      { period: "Week 1", refunds: 12, amount: 45000 },
      { period: "Week 2", refunds: 18, amount: 67000 },
      { period: "Week 3", refunds: 14, amount: 52000 },
      { period: "Week 4", refunds: 22, amount: 89000 },
    ],
    stats: { revenue: "PKR 1.63M", orders: 586, refunds: 66, profit: "PKR 489K" },
  },
  year: {
    sales: [
      { period: "Sep", sales: 320000, orders: 120 },
      { period: "Oct", sales: 410000, orders: 145 },
      { period: "Nov", sales: 380000, orders: 132 },
      { period: "Dec", sales: 520000, orders: 189 },
      { period: "Jan", sales: 490000, orders: 175 },
      { period: "Feb", sales: 610000, orders: 210 },
    ],
    customers: [
      { period: "Sep", newCustomers: 45, returningCustomers: 75 },
      { period: "Oct", newCustomers: 52, returningCustomers: 93 },
      { period: "Nov", newCustomers: 48, returningCustomers: 84 },
      { period: "Dec", newCustomers: 70, returningCustomers: 119 },
      { period: "Jan", newCustomers: 61, returningCustomers: 114 },
      { period: "Feb", newCustomers: 78, returningCustomers: 132 },
    ],
    refunds: [
      { period: "Sep", refunds: 12, amount: 45000 },
      { period: "Oct", refunds: 18, amount: 67000 },
      { period: "Nov", refunds: 14, amount: 52000 },
      { period: "Dec", refunds: 22, amount: 89000 },
      { period: "Jan", refunds: 16, amount: 61000 },
      { period: "Feb", refunds: 19, amount: 74000 },
    ],
    stats: { revenue: "PKR 8.4M", orders: 2890, refunds: 289, profit: "PKR 2.5M" },
  },
};

const storeData = {
  all: [
    { store: "Electronics", revenue: 890000, orders: 456, profit: 213600 },
    { store: "Fashion", revenue: 450000, orders: 234, profit: 139500 },
    { store: "Home Decor", revenue: 320000, orders: 189, profit: 89600 },
    { store: "Sports", revenue: 180000, orders: 98, profit: 54000 },
  ],
  "Electronics Hub": [
    { store: "Electronics", revenue: 890000, orders: 456, profit: 213600 },
  ],
  "Fashion Store": [
    { store: "Fashion", revenue: 450000, orders: 234, profit: 139500 },
  ],
  "Home Decor": [
    { store: "Home Decor", revenue: 320000, orders: 189, profit: 89600 },
  ],
  "Sports Shop": [
    { store: "Sports", revenue: 180000, orders: 98, profit: 54000 },
  ],
};

const productProfitability = [
  { name: "iPhone 14", revenue: 449550, cost: 337500, profit: 112050 },
  { name: "Nike Air Max", revenue: 456000, cost: 304000, profit: 152000 },
  { name: "Laptop HP", revenue: 197780, cost: 143000, profit: 54780 },
  { name: "Cricket Bat", revenue: 255000, cost: 150000, profit: 105000 },
  { name: "Coffee Maker", revenue: 126000, cost: 84000, profit: 42000 },
];

const refundReasons = [
  { name: "Product Defective", value: 35, color: "#f44336" },
  { name: "Wrong Size", value: 25, color: "#ff9800" },
  { name: "Late Delivery", value: 20, color: "#2196f3" },
  { name: "Wrong Color", value: 12, color: "#9c27b0" },
  { name: "Changed Mind", value: 8, color: "#9e9e9e" },
];

// ── STAT CARD ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, color, bg }) => (
  <Card sx={{ height: "100%", borderLeft: `4px solid ${color}` }}>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">{label}</Typography>
          <Typography variant="h5" fontWeight="bold">{value}</Typography>
        </Box>
        <Box sx={{ bgcolor: bg, borderRadius: 2, p: 1 }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Analytics() {
  const [timePeriod, setTimePeriod] = useState("month");
  const [selectedStore, setSelectedStore] = useState("all");

  const data = allData[timePeriod];
  const storeChartData = storeData[selectedStore];

  return (
    <Box sx={{ width: "100%" }}>

      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">📊 Analytics</Typography>
          <Typography variant="body2" color="textSecondary">
            Detailed insights across all your stores
          </Typography>
        </Box>

        {/* FILTERS */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
          {/* STORE FILTER */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Filter by Store</InputLabel>
            <Select
              value={selectedStore}
              label="Filter by Store"
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <MenuItem value="all">All Stores</MenuItem>
              <MenuItem value="Electronics Hub">Electronics Hub</MenuItem>
              <MenuItem value="Fashion Store">Fashion Store</MenuItem>
              <MenuItem value="Home Decor">Home Decor</MenuItem>
              <MenuItem value="Sports Shop">Sports Shop</MenuItem>
            </Select>
          </FormControl>

          {/* TIME FILTER */}
          <ToggleButtonGroup
            value={timePeriod}
            exclusive
            onChange={(e, val) => { if (val) setTimePeriod(val); }}
            size="small"
          >
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="year">Year</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* STAT CARDS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Revenue" value={data.stats.revenue} color="#1976d2" bg="#e3f2fd"
            icon={<TrendingUpIcon sx={{ color: "#1976d2" }} />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Orders" value={data.stats.orders} color="#388e3c" bg="#e8f5e9"
            icon={<ShoppingCartIcon sx={{ color: "#388e3c" }} />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Refunds" value={data.stats.refunds} color="#f44336" bg="#ffebee"
            icon={<AssignmentReturnIcon sx={{ color: "#f44336" }} />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Profit" value={data.stats.profit} color="#7b1fa2" bg="#f3e5f5"
            icon={<AttachMoneyIcon sx={{ color: "#7b1fa2" }} />} />
        </Grid>
      </Grid>

      {/* ROW 1 - Sales Trend + Refund Reasons */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">📈 Sales Trend</Typography>
                  <Typography variant="body2" color="textSecondary">Sales and orders overview</Typography>
                </Box>
                <Chip label={timePeriod === "week" ? "This Week" : timePeriod === "month" ? "This Month" : "This Year"} color="primary" size="small" />
              </Box>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.sales} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="period" />
                    <YAxis tickFormatter={(v) => `${v / 1000}K`} />
                    <Tooltip formatter={(value, name) => [
                      name === "sales" ? `PKR ${value.toLocaleString()}` : value,
                      name === "sales" ? "Sales (PKR)" : "Orders"
                    ]} />
                    <Legend />
                    <Area type="monotone" dataKey="sales" stroke="#1976d2" strokeWidth={3} fill="url(#salesGrad)" name="sales" />
                    <Line type="monotone" dataKey="orders" stroke="#f57c00" strokeWidth={2} name="orders" dot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">🥧 Refund Reasons</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>Why customers return</Typography>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={refundReasons} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" paddingAngle={3}>
                      {refundReasons.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <Box sx={{ mt: 1 }}>
                {refundReasons.map((item) => (
                  <Box key={item.name} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color }} />
                      <Typography variant="caption" color="textSecondary">{item.name}</Typography>
                    </Box>
                    <Typography variant="caption" fontWeight="bold">{item.value}%</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ROW 2 - Store Comparison */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">🏪 Store Revenue vs Profit</Typography>
                  <Typography variant="body2" color="textSecondary">Comparison across stores</Typography>
                </Box>
                <Chip label={selectedStore === "all" ? "All Stores" : selectedStore} color="primary" size="small" variant="outlined" />
              </Box>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={storeChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="store" />
                    <YAxis tickFormatter={(v) => `${v / 1000}K`} />
                    <Tooltip formatter={(value) => [`PKR ${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#1976d2" name="Revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" fill="#4caf50" name="Profit" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ROW 3 - Product Profitability + Customer Behavior */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">💰 Product Profitability</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Revenue vs cost vs profit</Typography>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productProfitability} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => `${v / 1000}K`} />
                    <Tooltip formatter={(value) => [`PKR ${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#1976d2" name="Revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="cost" fill="#f44336" name="Cost" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" fill="#4caf50" name="Profit" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">👥 Customer Behavior</Typography>
                  <Typography variant="body2" color="textSecondary">New vs returning customers</Typography>
                </Box>
                <Chip label={timePeriod === "week" ? "This Week" : timePeriod === "month" ? "This Month" : "This Year"} size="small" color="success" />
              </Box>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.customers} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newCustomers" fill="#1976d2" name="New Customers" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="returningCustomers" fill="#4caf50" name="Returning Customers" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ROW 4 - Refund Trends */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">📉 Refund Trends</Typography>
                  <Typography variant="body2" color="textSecondary">Refund count and amount over time</Typography>
                </Box>
                <Chip label={timePeriod === "week" ? "This Week" : timePeriod === "month" ? "This Month" : "This Year"} size="small" color="error" />
              </Box>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.refunds} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="period" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v / 1000}K`} />
                    <Tooltip formatter={(value, name) => [
                      name === "amount" ? `PKR ${value.toLocaleString()}` : value,
                      name === "amount" ? "Refund Amount" : "Refund Count"
                    ]} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="refunds" stroke="#f44336" strokeWidth={3} name="refunds" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                    <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#ff9800" strokeWidth={3} name="amount" dot={{ r: 5 }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}