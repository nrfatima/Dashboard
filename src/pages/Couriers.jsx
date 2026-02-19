import { useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Button, Box,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, LinearProgress, TextField, InputAdornment
} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export default function Couriers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCompareDialog, setOpenCompareDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [newCourier, setNewCourier] = useState({ name: '', contact: '', email: '', baseCost: '' });

  const couriersData = [
    {
      id: 1,
      name: "TCS Express",
      status: "Active",
      totalOrders: 245,
      successRate: 96,
      avgDeliveryTime: "2-3 days",
      avgCost: 250,
      failedDeliveries: 10,
      contact: "+92 300 1234567",
      email: "tcs@courier.com"
    },
    {
      id: 2,
      name: "Leopards Courier",
      status: "Active",
      totalOrders: 189,
      successRate: 94,
      avgDeliveryTime: "3-4 days",
      avgCost: 200,
      failedDeliveries: 11,
      contact: "+92 321 9876543",
      email: "leopards@courier.com"
    },
    {
      id: 3,
      name: "M&P Express",
      status: "Active",
      totalOrders: 156,
      successRate: 91,
      avgDeliveryTime: "3-5 days",
      avgCost: 180,
      failedDeliveries: 14,
      contact: "+92 333 5554444",
      email: "mp@courier.com"
    },
    {
      id: 4,
      name: "Daewoo Courier",
      status: "Inactive",
      totalOrders: 45,
      successRate: 88,
      avgDeliveryTime: "4-6 days",
      avgCost: 150,
      failedDeliveries: 5,
      contact: "+92 345 7778888",
      email: "daewoo@courier.com"
    },
  ];

  const filteredCouriers = couriersData.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalOrders = couriersData.reduce((sum, c) => sum + c.totalOrders, 0);
  const activeCouriers = couriersData.filter(c => c.status === "Active").length;
  const bestCourier = couriersData.reduce((best, c) => c.successRate > best.successRate ? c : best, couriersData[0]);
  const cheapestCourier = couriersData.reduce((cheap, c) => c.avgCost < cheap.avgCost ? c : cheap, couriersData[0]);

  const handleToggleCompare = (courier) => {
    if (selectedForCompare.find(c => c.id === courier.id)) {
      setSelectedForCompare(selectedForCompare.filter(c => c.id !== courier.id));
    } else if (selectedForCompare.length < 2) {
      setSelectedForCompare([...selectedForCompare, courier]);
    }
  };

  const getSuccessColor = (rate) => {
    if (rate >= 95) return 'success';
    if (rate >= 90) return 'warning';
    return 'error';
  };

  return (
    <div>
      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          🚚 Courier Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<CompareArrowsIcon />}
            onClick={() => setOpenCompareDialog(true)}
            disabled={selectedForCompare.length < 2}
          >
            Compare ({selectedForCompare.length}/2)
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Courier
          </Button>
        </Box>
      </Box>

      {/* HINT */}
      {selectedForCompare.length < 2 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          💡 Select 2 couriers from the table below to compare them side by side.
        </Alert>
      )}
      {selectedForCompare.length === 2 && (
        <Alert severity="success" sx={{ mb: 3 }}>
          ✅ <strong>{selectedForCompare[0].name}</strong> and <strong>{selectedForCompare[1].name}</strong> selected. Click "Compare" button!
        </Alert>
      )}

      {/* SUMMARY CARDS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Couriers</Typography>
              <Typography variant="h4">{couriersData.length}</Typography>
              <Typography variant="body2" color="textSecondary">{activeCouriers} active</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Deliveries</Typography>
              <Typography variant="h4">{totalOrders}</Typography>
              <Typography variant="body2" color="textSecondary">All couriers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#d4edda', borderLeft: '4px solid #28a745' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: '#155724' }}>Best Performing</Typography>
              <Typography variant="h6" sx={{ color: '#155724' }}>{bestCourier.name}</Typography>
              <Typography variant="body2" sx={{ color: '#155724' }}>{bestCourier.successRate}% success rate</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#cce5ff', borderLeft: '4px solid #004085' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: '#004085' }}>Most Affordable</Typography>
              <Typography variant="h6" sx={{ color: '#004085' }}>{cheapestCourier.name}</Typography>
              <Typography variant="body2" sx={{ color: '#004085' }}>PKR {cheapestCourier.avgCost} avg cost</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* SEARCH */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            size="small"
            placeholder="Search couriers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
            }}
          />
        </CardContent>
      </Card>

      {/* COURIERS TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>All Couriers ({filteredCouriers.length})</Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                  <TableCell><strong>Courier Name</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Total Orders</strong></TableCell>
                  <TableCell><strong>Success Rate</strong></TableCell>
                  <TableCell><strong>Avg Delivery Time</strong></TableCell>
                  <TableCell><strong>Avg Cost (PKR)</strong></TableCell>
                  <TableCell><strong>Failed Deliveries</strong></TableCell>
                  <TableCell><strong>Contact</strong></TableCell>
                  <TableCell><strong>Select to Compare</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCouriers.map((courier) => (
                  <TableRow key={courier.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalShippingIcon color="primary" />
                        <strong>{courier.name}</strong>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={courier.status}
                        color={courier.status === 'Active' ? 'success' : 'default'}
                        size="small"
                        icon={courier.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                      />
                    </TableCell>
                    <TableCell><strong>{courier.totalOrders}</strong></TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={`${courier.successRate}%`}
                          color={getSuccessColor(courier.successRate)}
                          size="small"
                        />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={courier.successRate}
                        color={getSuccessColor(courier.successRate)}
                        sx={{ mt: 0.5, borderRadius: 1, height: 4 }}
                      />
                    </TableCell>
                    <TableCell>{courier.avgDeliveryTime}</TableCell>
                    <TableCell><strong>PKR {courier.avgCost}</strong></TableCell>
                    <TableCell>
                      <Chip
                        label={courier.failedDeliveries}
                        color={courier.failedDeliveries > 12 ? 'error' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{courier.contact}</Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant={selectedForCompare.find(c => c.id === courier.id) ? 'contained' : 'outlined'}
                        color={selectedForCompare.find(c => c.id === courier.id) ? 'success' : 'primary'}
                        onClick={() => handleToggleCompare(courier)}
                        disabled={!selectedForCompare.find(c => c.id === courier.id) && selectedForCompare.length >= 2}
                      >
                        {selectedForCompare.find(c => c.id === courier.id) ? '✅ Selected' : 'Select'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* COMPARE DIALOG */}
      <Dialog open={openCompareDialog} onClose={() => setOpenCompareDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">⚖️ Courier Comparison</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedForCompare.length === 2 ? (
            <Box>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Card sx={{ bgcolor: '#e3f2fd', textAlign: 'center', p: 1 }}>
                    <Typography variant="h6" color="primary">{selectedForCompare[0].name}</Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ bgcolor: '#e8f5e9', textAlign: 'center', p: 1 }}>
                    <Typography variant="h6" color="success.main">{selectedForCompare[1].name}</Typography>
                  </Card>
                </Grid>
              </Grid>

              {[
                { label: 'Status', key: 'status' },
                { label: 'Total Orders', key: 'totalOrders' },
                { label: 'Success Rate', key: 'successRate', suffix: '%' },
                { label: 'Avg Delivery Time', key: 'avgDeliveryTime' },
                { label: 'Avg Cost', key: 'avgCost', prefix: 'PKR ' },
                { label: 'Failed Deliveries', key: 'failedDeliveries' },
                { label: 'Contact', key: 'contact' },
              ].map((row) => (
                <Box key={row.label} sx={{ display: 'flex', mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
                  <Box sx={{ width: '20%' }}>
                    <Typography variant="body2" color="textSecondary" fontWeight="bold">{row.label}</Typography>
                  </Box>
                  <Box sx={{ width: '40%', textAlign: 'center' }}>
                    <Typography variant="body2">
                      {row.prefix || ''}{selectedForCompare[0][row.key]}{row.suffix || ''}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '40%', textAlign: 'center' }}>
                    <Typography variant="body2">
                      {row.prefix || ''}{selectedForCompare[1][row.key]}{row.suffix || ''}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Recommendation:</strong>{' '}
                {selectedForCompare[0].successRate > selectedForCompare[1].successRate
                  ? `${selectedForCompare[0].name} has a better success rate.`
                  : `${selectedForCompare[1].name} has a better success rate.`}{' '}
                {selectedForCompare[0].avgCost < selectedForCompare[1].avgCost
                  ? `${selectedForCompare[0].name} is more affordable.`
                  : `${selectedForCompare[1].name} is more affordable.`}
              </Alert>
            </Box>
          ) : (
            <Alert severity="warning">Please select 2 couriers from the table to compare.</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenCompareDialog(false); setSelectedForCompare([]); }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ADD COURIER DIALOG */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">➕ Add New Courier</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField label="Courier Name" fullWidth value={newCourier.name} onChange={(e) => setNewCourier({ ...newCourier, name: e.target.value })} />
            <TextField label="Contact Number" fullWidth value={newCourier.contact} onChange={(e) => setNewCourier({ ...newCourier, contact: e.target.value })} />
            <TextField label="Email" fullWidth value={newCourier.email} onChange={(e) => setNewCourier({ ...newCourier, email: e.target.value })} />
            <TextField label="Base Cost (PKR)" fullWidth value={newCourier.baseCost} onChange={(e) => setNewCourier({ ...newCourier, baseCost: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Courier added! (Will connect to backend later)'); setOpenAddDialog(false); }}>Add Courier</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}