import { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Button,
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Chip, Box,
  FormControl, InputLabel, Select, MenuItem,
  TextField, InputAdornment, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

export default function Orders() {
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRefundStatus, setSelectedRefundStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const allOrders = [
    { 
      id: "#ORD-001", 
      date: "2024-01-28", 
      customer: "Ali Hassan", 
      store: "Fashion Store", 
      products: "Nike Shoes (x2)", 
      total: "PKR 24,000", 
      status: "Delivered",
      canRefund: false,
      issues: []
    },
    { 
      id: "#ORD-002", 
      date: "2024-01-27", 
      customer: "Sara Khan", 
      store: "Electronics Hub", 
      products: "iPhone 14 (x1)", 
      total: "PKR 99,900", 
      status: "Processing",
      canRefund: true,
      issues: [
        { type: "Wrong Postal Code", detail: "Entered: 54000, Should be: 54600" },
        { type: "Customer Complained", detail: "Product description not matching" }
      ]
    },
    { 
      id: "#ORD-003", 
      date: "2024-01-27", 
      customer: "Ahmed Raza", 
      store: "Home Decor", 
      products: "LED Lamp (x3), Coffee Maker (x1)", 
      total: "PKR 12,000", 
      status: "Shipped",
      canRefund: false,
      issues: []
    },
    { 
      id: "#ORD-004", 
      date: "2024-01-26", 
      customer: "Fatima Noor", 
      store: "Fashion Store", 
      products: "T-Shirt (x5)", 
      total: "PKR 7,500", 
      status: "Pending",
      canRefund: true,
      issues: [
        { type: "Wrong Address", detail: "Customer moved to new address, needs update" }
      ]
    },
    { 
      id: "#ORD-005", 
      date: "2024-01-26", 
      customer: "Hassan Malik", 
      store: "Sports Shop", 
      products: "Cricket Bat (x1), Football (x2)", 
      total: "PKR 13,000", 
      status: "Delivered",
      canRefund: false,
      issues: []
    },
    { 
      id: "#ORD-006", 
      date: "2024-01-25", 
      customer: "Ayesha Ali", 
      store: "Electronics Hub", 
      products: "Laptop HP (x1)", 
      total: "PKR 89,900", 
      status: "Cancelled",
      canRefund: true,
      issues: [
        { type: "Customer Requested Refund", detail: "Found better price elsewhere" }
      ]
    },
    { 
      id: "#ORD-007", 
      date: "2024-01-25", 
      customer: "Usman Khan", 
      store: "Home Decor", 
      products: "Wall Clock (x2)", 
      total: "PKR 3,600", 
      status: "Delivered",
      canRefund: false,
      issues: []
    },
    { 
      id: "#ORD-008", 
      date: "2024-01-24", 
      customer: "Zainab Ahmed", 
      store: "Fashion Store", 
      products: "Jeans Denim (x2), T-Shirt (x3)", 
      total: "PKR 11,500", 
      status: "Shipped",
      canRefund: true,
      issues: [
        { type: "Late Delivery", detail: "Order delayed by 10 days from expected date" },
        { type: "Product Defective", detail: "One jeans has manufacturing defect - zipper broken" }
      ]
    },
    { 
      id: "#ORD-009", 
      date: "2024-01-24", 
      customer: "Bilal Ahmed", 
      store: "Electronics Hub", 
      products: "Samsung Galaxy S23 (x1)", 
      total: "PKR 85,000", 
      status: "Delivered",
      canRefund: false,
      issues: []
    },
    { 
      id: "#ORD-010", 
      date: "2024-01-23", 
      customer: "Mariam Khan", 
      store: "Fashion Store", 
      products: "Adidas Shoes (x1)", 
      total: "PKR 9,500", 
      status: "Processing",
      canRefund: true,
      issues: [
        { type: "Wrong Postal Code", detail: "Postal code 44000 should be 45000" }
      ]
    },
  ];

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStore = selectedStore === 'all' || order.store === selectedStore;
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesRefund = 
      selectedRefundStatus === 'all' || 
      (selectedRefundStatus === 'can-refund' && order.canRefund) ||
      (selectedRefundStatus === 'no-issues' && !order.canRefund);
    
    let matchesDate = true;
    if (fromDate && toDate) {
      const orderDate = new Date(order.date);
      matchesDate = orderDate >= new Date(fromDate) && orderDate <= new Date(toDate);
    }
    
    return matchesSearch && matchesStore && matchesStatus && matchesRefund && matchesDate;
  });

  const stores = ['all', ...new Set(allOrders.map(o => o.store))];

  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter(o => o.status === "Pending" || o.status === "Processing").length;
  const completedOrders = allOrders.filter(o => o.status === "Delivered").length;
  const refundableOrders = allOrders.filter(o => o.canRefund).length;
  const totalRevenue = allOrders.reduce((sum, order) => {
    const amount = parseInt(order.total.replace(/[^0-9]/g, ''));
    return sum + amount;
  }, 0);

  const handleViewIssues = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleProcessRefund = () => {
    alert(`Processing refund for ${selectedOrder.id}\n\nThis will:\n1. Create refund entry\n2. Calculate loss\n3. Update stock if resaleable\n4. Notify customer`);
    handleCloseDialog();
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "success";
      case "Shipped": return "info";
      case "Processing": return "warning";
      case "Pending": return "default";
      case "Cancelled": return "error";
      default: return "default";
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          🛒 Orders Management
        </Typography>
      </Box>

      {/* SUMMARY CARDS - keeping previous code */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* ... all 5 cards same as before ... */}
      </Grid>

      {/* FILTERS - keeping previous code */}
      <Card sx={{ mb: 3 }}>
        {/* ... filters same as before ... */}
      </Card>

      {/* ORDERS TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Orders List ({filteredOrders.length} items)
          </Typography>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                  <TableCell><strong>Order ID</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Customer</strong></TableCell>
                  <TableCell><strong>Store</strong></TableCell>
                  <TableCell><strong>Products</strong></TableCell>
                  <TableCell><strong>Total Amount</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Refund Check</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell><strong>{order.id}</strong></TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <Chip label={order.store} size="small" variant="outlined" color="primary" />
                      </TableCell>
                      <TableCell>{order.products}</TableCell>
                      <TableCell><strong>{order.total}</strong></TableCell>
                      <TableCell>
                        <Chip 
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {order.canRefund ? (
                          <Chip 
                            label={`🔴 Can Refund (${order.issues.length})`}
                            color="error"
                            size="small"
                            onClick={() => handleViewIssues(order)}
                            sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                          />
                        ) : (
                          <Chip 
                            label="✅ No Issues"
                            color="success"
                            size="small"
                            icon={<CheckCircleIcon />}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          variant="outlined"
                          onClick={() => handleViewDetails(order)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Typography variant="body2" color="textSecondary" sx={{ py: 3 }}>
                        No orders found. Try adjusting your filters.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* ISSUES DIALOG - keeping previous code */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {/* ... issues dialog same as before ... */}
      </Dialog>

      {/* ORDER DETAILS DIALOG - NEW */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
        {selectedOrder && (
          <>
            <DialogTitle>
              <Typography variant="h6">📋 Order Details - {selectedOrder.id}</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Order ID:</Typography>
                  <Typography variant="h6">{selectedOrder.id}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Order Date:</Typography>
                  <Typography variant="h6">{selectedOrder.date}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Customer Name:</Typography>
                  <Typography variant="h6">{selectedOrder.customer}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Store:</Typography>
                  <Chip label={selectedOrder.store} color="primary" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">Products:</Typography>
                  <Typography variant="body1">{selectedOrder.products}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Total Amount:</Typography>
                  <Typography variant="h5" color="primary">{selectedOrder.total}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Order Status:</Typography>
                  <Chip 
                    label={selectedOrder.status}
                    color={getStatusColor(selectedOrder.status)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>Refund Status:</Typography>
                  {selectedOrder.canRefund ? (
                    <Alert severity="error">
                      ⚠️ This order has {selectedOrder.issues.length} issue(s) and can be refunded.
                    </Alert>
                  ) : (
                    <Alert severity="success">
                      ✅ No issues with this order.
                    </Alert>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>Close</Button>
              {selectedOrder.canRefund && (
                <Button 
                  onClick={() => {
                    handleCloseDetailsDialog();
                    handleViewIssues(selectedOrder);
                  }}
                  variant="contained" 
                  color="error"
                >
                  View Issues & Process Refund
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}