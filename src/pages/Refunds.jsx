import { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Button, Box,
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Chip,
  FormControl, InputLabel, Select, MenuItem,
  TextField, InputAdornment, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert, IconButton,
  ToggleButton, ToggleButtonGroup, Radio, RadioGroup,
  FormControlLabel, Divider
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Refunds() {
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedReason, setSelectedReason] = useState('all');
  const [selectedResaleable, setSelectedResaleable] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);
  
  // Edit form state
  const [editReason, setEditReason] = useState('');
  const [editCondition, setEditCondition] = useState('');
  const [editResaleable, setEditResaleable] = useState(true);

  // Sample refunds data
  const [refundsData, setRefundsData] = useState([
    { 
      id: "#REF-001", 
      date: "2024-01-25", 
      orderId: "#ORD-002",
      store: "Fashion Store", 
      product: "Nike Air Max",
      customer: "Ali Hassan",
      reason: "Product Defective",
      amount: "3,500",
      resaleable: false,
      condition: "Damaged",
      supplierCost: "1,800",
      packagingCost: "50",
      deliveryCost: "200",
      returnCost: "200",
      loss: "2,250"
    },
    { 
      id: "#REF-002", 
      date: "2024-01-26", 
      orderId: "#ORD-003",
      store: "Electronics Hub", 
      product: "Phone Case",
      customer: "Sara Khan",
      reason: "Wrong Size",
      amount: "800",
      resaleable: true,
      condition: "New",
      supplierCost: "300",
      packagingCost: "30",
      deliveryCost: "150",
      returnCost: "150",
      loss: "330"
    },
    { 
      id: "#REF-003", 
      date: "2024-01-26", 
      orderId: "#ORD-005",
      store: "Home Decor", 
      product: "LED Lamp",
      customer: "Ahmed Raza",
      reason: "Late Delivery",
      amount: "1,200",
      resaleable: true,
      condition: "New",
      supplierCost: "500",
      packagingCost: "40",
      deliveryCost: "180",
      returnCost: "180",
      loss: "400"
    },
    { 
      id: "#REF-004", 
      date: "2024-01-27", 
      orderId: "#ORD-007",
      store: "Fashion Store", 
      product: "T-Shirt Cotton",
      customer: "Fatima Noor",
      reason: "Wrong Color",
      amount: "1,500",
      resaleable: true,
      condition: "New",
      supplierCost: "400",
      packagingCost: "40",
      deliveryCost: "180",
      returnCost: "180",
      loss: "400"
    },
    { 
      id: "#REF-005", 
      date: "2024-01-27", 
      orderId: "#ORD-009",
      store: "Sports Shop", 
      product: "Cricket Bat",
      customer: "Hassan Malik",
      reason: "Product Defective",
      amount: "4,500",
      resaleable: false,
      condition: "Damaged",
      supplierCost: "2,500",
      packagingCost: "50",
      deliveryCost: "300",
      returnCost: "300",
      loss: "3,150"
    },
    { 
      id: "#REF-006", 
      date: "2024-01-28", 
      orderId: "#ORD-011",
      store: "Electronics Hub", 
      product: "Wireless Mouse",
      customer: "Ayesha Ali",
      reason: "Changed Mind",
      amount: "1,200",
      resaleable: true,
      condition: "New",
      supplierCost: "700",
      packagingCost: "30",
      deliveryCost: "150",
      returnCost: "150",
      loss: "330"
    },
  ]);

  // Filter refunds
  const filteredRefunds = refundsData.filter(refund => {
    const matchesSearch = 
      refund.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStore = selectedStore === 'all' || refund.store === selectedStore;
    const matchesReason = selectedReason === 'all' || refund.reason === selectedReason;
    const matchesResaleable = 
      selectedResaleable === 'all' || 
      (selectedResaleable === 'yes' && refund.resaleable) ||
      (selectedResaleable === 'no' && !refund.resaleable);
    const matchesCondition = selectedCondition === 'all' || refund.condition === selectedCondition;
    
    return matchesSearch && matchesStore && matchesReason && matchesResaleable && matchesCondition;
  });

  // Get unique values
  const stores = ['all', ...new Set(refundsData.map(r => r.store))];
  const reasons = ['all', ...new Set(refundsData.map(r => r.reason))];

  // Calculate stats
  const totalRefunds = refundsData.length;
  const totalRefundAmount = refundsData.reduce((sum, r) => sum + parseFloat(r.amount.replace(/,/g, '')), 0);
  const totalLoss = refundsData.reduce((sum, r) => sum + parseFloat(r.loss.replace(/,/g, '')), 0);
  const resaleableCount = refundsData.filter(r => r.resaleable).length;
  const resaleablePercentage = ((resaleableCount / totalRefunds) * 100).toFixed(0);

  // Calculate loss for editing
  const calculateLoss = (supplierCost, packagingCost, deliveryCost, returnCost, isResaleable) => {
    const supplier = parseFloat(supplierCost.replace(/,/g, ''));
    const packaging = parseFloat(packagingCost);
    const delivery = parseFloat(deliveryCost);
    const returnD = parseFloat(returnCost);
    
    if (isResaleable) {
      return packaging + delivery + returnD;
    } else {
      return supplier + packaging + delivery + returnD;
    }
  };

  const handleViewDetails = (refund) => {
    setSelectedRefund(refund);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedRefund(null);
  };

  const handleOpenEdit = (refund) => {
    setSelectedRefund(refund);
    setEditReason(refund.reason);
    setEditCondition(refund.condition);
    setEditResaleable(refund.resaleable);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedRefund(null);
  };

  const handleSaveEdit = () => {
    // Calculate new loss
    const newLoss = calculateLoss(
      selectedRefund.supplierCost,
      selectedRefund.packagingCost,
      selectedRefund.deliveryCost,
      selectedRefund.returnCost,
      editResaleable
    );

    // Update refund in state
    setRefundsData(refundsData.map(refund => 
      refund.id === selectedRefund.id 
        ? {
            ...refund,
            reason: editReason,
            condition: editCondition,
            resaleable: editResaleable,
            loss: newLoss.toLocaleString()
          }
        : refund
    ));

    alert(`✅ Refund ${selectedRefund.id} updated!\n\nNew Loss: PKR ${newLoss.toLocaleString()}\nResaleable: ${editResaleable ? 'Yes' : 'No'}`);
    handleCloseEditDialog();
  };

  const getReasonColor = (reason) => {
    switch(reason) {
      case "Product Defective": return "error";
      case "Wrong Size": return "warning";
      case "Wrong Color": return "warning";
      case "Late Delivery": return "info";
      case "Changed Mind": return "default";
      default: return "default";
    }
  };

  const getConditionColor = (condition) => {
    switch(condition) {
      case "New": return "success";
      case "Used": return "warning";
      case "Damaged": return "error";
      default: return "default";
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        ↩️ Refund Management
      </Typography>

      {/* SUMMARY CARDS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Refunds</Typography>
              <Typography variant="h4">{totalRefunds}</Typography>
              <Typography variant="body2" color="textSecondary">This month</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#fee', borderLeft: '4px solid #d32f2f' }}>
            <CardContent>
              <Typography variant="subtitle2" color="error">Refund Amount</Typography>
              <Typography variant="h4" color="error">PKR {totalRefundAmount.toLocaleString()}</Typography>
              <Typography variant="body2" color="error">Given to customers</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#fee', borderLeft: '4px solid #d32f2f' }}>
            <CardContent>
              <Typography variant="subtitle2" color="error">Total Loss</Typography>
              <Typography variant="h4" color="error">PKR {totalLoss.toLocaleString()}</Typography>
              <Typography variant="body2" color="error">Non-resaleable items</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#d4edda', borderLeft: '4px solid #28a745' }}>
            <CardContent>
              <Typography variant="subtitle2" color="success.dark">Resaleable</Typography>
              <Typography variant="h4" color="success.dark">{resaleableCount}</Typography>
              <Typography variant="body2" color="success.dark">{resaleablePercentage}% can be resold</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FILTERS */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FilterListIcon color="primary" />
            <Typography variant="h6">Filters</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={2.4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search refunds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={2.4}>
              <FormControl fullWidth size="small">
                <InputLabel>Store</InputLabel>
                <Select value={selectedStore} label="Store" onChange={(e) => setSelectedStore(e.target.value)}>
                  <MenuItem value="all">All Stores</MenuItem>
                  {stores.filter(s => s !== 'all').map(store => (
                    <MenuItem key={store} value={store}>{store}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2.4}>
              <FormControl fullWidth size="small">
                <InputLabel>Refund Reason</InputLabel>
                <Select value={selectedReason} label="Refund Reason" onChange={(e) => setSelectedReason(e.target.value)}>
                  <MenuItem value="all">All Reasons</MenuItem>
                  {reasons.filter(r => r !== 'all').map(reason => (
                    <MenuItem key={reason} value={reason}>{reason}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2.4}>
              <FormControl fullWidth size="small">
                <InputLabel>Resaleable</InputLabel>
                <Select value={selectedResaleable} label="Resaleable" onChange={(e) => setSelectedResaleable(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="yes">✅ Resaleable</MenuItem>
                  <MenuItem value="no">❌ Not Resaleable</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2.4}>
              <FormControl fullWidth size="small">
                <InputLabel>Condition</InputLabel>
                <Select value={selectedCondition} label="Condition" onChange={(e) => setSelectedCondition(e.target.value)}>
                  <MenuItem value="all">All Conditions</MenuItem>
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Used">Used</MenuItem>
                  <MenuItem value="Damaged">Damaged</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* ACTIVE FILTERS */}
          {(searchQuery || selectedStore !== 'all' || selectedReason !== 'all' || selectedResaleable !== 'all' || selectedCondition !== 'all') && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {searchQuery && <Chip label={`Search: "${searchQuery}"`} size="small" onDelete={() => setSearchQuery('')} />}
              {selectedStore !== 'all' && <Chip label={`Store: ${selectedStore}`} size="small" onDelete={() => setSelectedStore('all')} />}
              {selectedReason !== 'all' && <Chip label={`Reason: ${selectedReason}`} size="small" onDelete={() => setSelectedReason('all')} />}
              {selectedResaleable !== 'all' && <Chip label={`Resaleable: ${selectedResaleable === 'yes' ? 'Yes' : 'No'}`} size="small" onDelete={() => setSelectedResaleable('all')} />}
              {selectedCondition !== 'all' && <Chip label={`Condition: ${selectedCondition}`} size="small" onDelete={() => setSelectedCondition('all')} />}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* REFUNDS TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Refunds List ({filteredRefunds.length} items)
          </Typography>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                  <TableCell><strong>Refund ID</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Store</strong></TableCell>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell><strong>Customer</strong></TableCell>
                  <TableCell><strong>Reason</strong></TableCell>
                  <TableCell><strong>Amount</strong></TableCell>
                  <TableCell><strong>Condition</strong></TableCell>
                  <TableCell><strong>Resaleable</strong></TableCell>
                  <TableCell><strong>Loss</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRefunds.length > 0 ? (
                  filteredRefunds.map((refund) => (
                    <TableRow key={refund.id} hover>
                      <TableCell><strong>{refund.id}</strong></TableCell>
                      <TableCell>{refund.date}</TableCell>
                      <TableCell>
                        <Chip label={refund.store} size="small" variant="outlined" color="primary" />
                      </TableCell>
                      <TableCell>{refund.product}</TableCell>
                      <TableCell>{refund.customer}</TableCell>
                      <TableCell>
                        <Chip 
                          label={refund.reason} 
                          color={getReasonColor(refund.reason)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell><strong>PKR {refund.amount}</strong></TableCell>
                      <TableCell>
                        <Chip 
                          label={refund.condition}
                          color={getConditionColor(refund.condition)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {refund.resaleable ? (
                          <Chip 
                            label="✅ Yes"
                            color="success"
                            size="small"
                            icon={<CheckCircleIcon />}
                          />
                        ) : (
                          <Chip 
                            label="❌ No"
                            color="error"
                            size="small"
                            icon={<CancelIcon />}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography 
                          fontWeight="bold" 
                          color={refund.resaleable ? "warning.main" : "error.main"}
                        >
                          PKR {refund.loss}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Button 
                            size="small" 
                            variant="outlined"
                            onClick={() => handleViewDetails(refund)}
                          >
                            View
                          </Button>
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleOpenEdit(refund)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      <Typography variant="body2" color="textSecondary" sx={{ py: 3 }}>
                        No refunds found. Try adjusting your filters.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* VIEW DETAILS DIALOG */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="sm" fullWidth>
        {selectedRefund && (
          <>
            <DialogTitle>
              <Typography variant="h6">📋 Refund Details - {selectedRefund.id}</Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Refund ID:</Typography>
                    <Typography variant="body1" fontWeight="bold">{selectedRefund.id}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Date:</Typography>
                    <Typography variant="body1">{selectedRefund.date}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Order ID:</Typography>
                    <Typography variant="body1" fontWeight="bold">{selectedRefund.orderId}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Store:</Typography>
                    <Chip label={selectedRefund.store} size="small" color="primary" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">Product:</Typography>
                    <Typography variant="body1" fontWeight="bold">{selectedRefund.product}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">Customer:</Typography>
                    <Typography variant="body1">{selectedRefund.customer}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Refund Reason:</Typography>
                    <Chip label={selectedRefund.reason} color={getReasonColor(selectedRefund.reason)} size="small" />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Condition:</Typography>
                    <Chip label={selectedRefund.condition} color={getConditionColor(selectedRefund.condition)} size="small" />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ bgcolor: '#f9fafb', p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
                    💰 Cost Breakdown & Loss Calculation
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2">Supplier Cost:</Typography>
                    <Typography variant="body2" fontWeight="bold">PKR {selectedRefund.supplierCost}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2">Customer Price:</Typography>
                    <Typography variant="body2" fontWeight="bold">PKR {selectedRefund.amount}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2">Packaging Cost:</Typography>
                    <Typography variant="body2" fontWeight="bold">PKR {selectedRefund.packagingCost}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2">Delivery Cost:</Typography>
                    <Typography variant="body2" fontWeight="bold">PKR {selectedRefund.deliveryCost}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2">Return Delivery:</Typography>
                    <Typography variant="body2" fontWeight="bold">PKR {selectedRefund.returnCost}</Typography>
                  </Box>
                </Box>

                <Box sx={{ bgcolor: '#fee', borderLeft: '4px solid #d32f2f', p: 2, borderRadius: 1, mt: 2 }}>
                  <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                    Resaleable: {selectedRefund.resaleable ? '✅ Yes' : '❌ No'}
                  </Typography>
                  <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                    🔴 TOTAL LOSS {selectedRefund.resaleable ? "(Product Resaleable)" : "(Product Not Resaleable)"}
                  </Typography>
                  <Typography variant="h4" color="error" fontWeight="bold">
                    PKR {selectedRefund.loss}
                  </Typography>
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    {selectedRefund.resaleable 
                      ? `= Packaging (${selectedRefund.packagingCost}) + Delivery (${selectedRefund.deliveryCost}) + Return (${selectedRefund.returnCost})`
                      : `= Supplier Cost (${selectedRefund.supplierCost}) + Packaging (${selectedRefund.packagingCost}) + Delivery (${selectedRefund.deliveryCost}) + Return (${selectedRefund.returnCost})`
                    }
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailsDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        {selectedRefund && (
          <>
            <DialogTitle>
              <Typography variant="h6">✏️ Edit Refund - {selectedRefund.id}</Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Update refund details. Loss will be recalculated automatically.
                </Alert>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Refund Reason:</Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select value={editReason} onChange={(e) => setEditReason(e.target.value)}>
                    <MenuItem value="Product Defective">Product Defective</MenuItem>
                    <MenuItem value="Wrong Size">Wrong Size</MenuItem>
                    <MenuItem value="Wrong Color">Wrong Color</MenuItem>
                    <MenuItem value="Late Delivery">Late Delivery</MenuItem>
                    <MenuItem value="Changed Mind">Changed Mind</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Product Condition:</Typography>
                <RadioGroup value={editCondition} onChange={(e) => setEditCondition(e.target.value)} sx={{ mb: 2 }}>
                  <FormControlLabel value="New" control={<Radio />} label="New (Unopened, perfect)" />
                  <FormControlLabel value="Used" control={<Radio />} label="Used (Opened but functional)" />
                  <FormControlLabel value="Damaged" control={<Radio />} label="Damaged (Broken/Defective)" />
                </RadioGroup>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Can This Product Be Resold?</Typography>
                <ToggleButtonGroup
                  value={editResaleable ? 'yes' : 'no'}
                  exclusive
                  onChange={(e, newValue) => {
                    if (newValue !== null) {
                      setEditResaleable(newValue === 'yes');
                    }
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <ToggleButton value="yes" color="success">
                    ✅ Yes, Resaleable
                  </ToggleButton>
                  <ToggleButton value="no" color="error">
                    ❌ No, Not Resaleable
                  </ToggleButton>
                </ToggleButtonGroup>

                <Alert severity={editResaleable ? "success" : "warning"} sx={{ mb: 2 }}>
                  {editResaleable 
                    ? "✅ Product can be restocked. Only delivery & packaging costs are lost."
                    : "❌ Product cannot be resold. Total loss including supplier cost."}
                </Alert>

                <Box sx={{ bgcolor: '#f5f7fa', p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                    💰 NEW CALCULATED LOSS:
                  </Typography>
                  <Typography variant="h4" color={editResaleable ? "warning.main" : "error.main"} fontWeight="bold">
                    PKR {calculateLoss(
                      selectedRefund.supplierCost,
                      selectedRefund.packagingCost,
                      selectedRefund.deliveryCost,
                      selectedRefund.returnCost,
                      editResaleable
                    ).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    {editResaleable 
                      ? `Packaging + Delivery + Return = ${selectedRefund.packagingCost} + ${selectedRefund.deliveryCost} + ${selectedRefund.returnCost}`
                      : `Supplier + Packaging + Delivery + Return = ${selectedRefund.supplierCost} + ${selectedRefund.packagingCost} + ${selectedRefund.deliveryCost} + ${selectedRefund.returnCost}`
                    }
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button onClick={handleSaveEdit} variant="contained" color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}