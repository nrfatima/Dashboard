import { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Button, Box, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert
} from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SyncIcon from '@mui/icons-material/Sync';
import LinkIcon from '@mui/icons-material/Link';

export default function Stores() {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    storeName: '',
    storeUrl: '',
    consumerKey: '',
    consumerSecret: ''
  });

  // Sample connected stores data
  const stores = [
    { 
      id: 1, 
      name: "Fashion Store", 
      url: "https://fashionstore.com",
      status: "Connected",
      apiStatus: "Working",
      products: 145, 
      orders: 234,
      revenue: "PKR 450,000",
      lastSync: "2 mins ago"
    },
    { 
      id: 2, 
      name: "Electronics Hub", 
      url: "https://electronicsstore.com",
      status: "Connected",
      apiStatus: "Working",
      products: 198, 
      orders: 456,
      revenue: "PKR 890,000",
      lastSync: "5 mins ago"
    },
    { 
      id: 3, 
      name: "Home Decor", 
      url: "https://homedecostore.com",
      status: "Connected",
      apiStatus: "Working",
      products: 87, 
      orders: 189,
      revenue: "PKR 320,000",
      lastSync: "1 min ago"
    },
    { 
      id: 4, 
      name: "Sports Shop", 
      url: "https://sportsshop.com",
      status: "Disconnected",
      apiStatus: "Failed",
      products: 0, 
      orders: 0,
      revenue: "PKR 0",
      lastSync: "Never"
    },
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form
    setFormData({
      storeName: '',
      storeUrl: '',
      consumerKey: '',
      consumerSecret: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConnectStore = () => {
    // This will connect to WooCommerce API later
    console.log("Connecting store with data:", formData);
    alert(`Store "${formData.storeName}" connection initiated!\n\nIn the real app, this will:\n1. Test WooCommerce API connection\n2. Fetch store data\n3. Save connection details`);
    handleCloseDialog();
  };

  const handleSyncStore = (storeId, storeName) => {
    alert(`Syncing "${storeName}"...\n\nThis will fetch latest data from WooCommerce API:\n- Products\n- Orders\n- Customers`);
  };

  const handleDisconnectStore = (storeId, storeName) => {
    if (window.confirm(`Are you sure you want to disconnect "${storeName}"?`)) {
      alert(`Store "${storeName}" disconnected!`);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          🏪 Connected WooCommerce Stores
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleOpenDialog}
          startIcon={<LinkIcon />}
        >
          + Connect New Store
        </Button>
      </Box>

      {/* INFO ALERT */}
      <Alert severity="info" sx={{ mb: 3 }}>
        💡 Connect your WooCommerce stores using REST API credentials. You can find these in: 
        <strong> WooCommerce → Settings → Advanced → REST API</strong>
      </Alert>

      {/* SUMMARY CARDS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Stores</Typography>
              <Typography variant="h4">{stores.length}</Typography>
              <Typography variant="body2" color="textSecondary">
                {stores.filter(s => s.status === "Connected").length} connected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Products</Typography>
              <Typography variant="h4">
                {stores.reduce((sum, store) => sum + store.products, 0)}
              </Typography>
              <Typography variant="body2" color="textSecondary">Across all stores</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Orders</Typography>
              <Typography variant="h4">
                {stores.reduce((sum, store) => sum + store.orders, 0)}
              </Typography>
              <Typography variant="body2" color="textSecondary">This month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Revenue</Typography>
              <Typography variant="h4" color="success.main">PKR 1.66M</Typography>
              <Typography variant="body2" color="textSecondary">This month</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* STORES LIST */}
      <Grid container spacing={3}>
        {stores.map((store) => (
          <Grid item xs={12} md={6} key={store.id}>
            <Card sx={{ 
              borderLeft: store.status === "Connected" ? "4px solid #2e7d32" : "4px solid #d32f2f" 
            }}>
              <CardContent>
                {/* STORE HEADER */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StoreIcon color="primary" sx={{ fontSize: 32 }} />
                    <div>
                      <Typography variant="h6">{store.name}</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        🔗 {store.url}
                      </Typography>
                    </div>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Chip 
                      label={store.status} 
                      color={store.status === "Connected" ? "success" : "error"}
                      size="small"
                      icon={store.status === "Connected" ? <CheckCircleIcon /> : <ErrorIcon />}
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="caption" display="block" color="textSecondary">
                      API: {store.apiStatus}
                    </Typography>
                  </Box>
                </Box>

                {/* STORE STATS */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">Products</Typography>
                    <Typography variant="h6">{store.products}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">Orders</Typography>
                    <Typography variant="h6">{store.orders}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">Revenue</Typography>
                    <Typography variant="h6" color="success.main">{store.revenue}</Typography>
                  </Grid>
                </Grid>

                {/* LAST SYNC */}
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 2 }}>
                  🔄 Last synced: {store.lastSync}
                </Typography>

                {/* ACTION BUTTONS */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleSyncStore(store.id, store.name)}
                    startIcon={<SyncIcon />}
                    disabled={store.status === "Disconnected"}
                  >
                    Sync Now
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small"
                    disabled={store.status === "Disconnected"}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    color="error"
                    onClick={() => handleDisconnectStore(store.id, store.name)}
                    disabled={store.status === "Disconnected"}
                  >
                    Disconnect
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ADD STORE DIALOG */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">🔗 Connect WooCommerce Store</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Alert severity="info" sx={{ mb: 1 }}>
              To connect a WooCommerce store, you need REST API credentials. 
              Find them in: <strong>WooCommerce → Settings → Advanced → REST API</strong>
            </Alert>

            <TextField
              label="Store Name"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="e.g., My Fashion Store"
              fullWidth
              required
            />

            <TextField
              label="Store URL"
              name="storeUrl"
              value={formData.storeUrl}
              onChange={handleInputChange}
              placeholder="e.g., https://myfashionstore.com"
              fullWidth
              required
            />

            <TextField
              label="Consumer Key"
              name="consumerKey"
              value={formData.consumerKey}
              onChange={handleInputChange}
              placeholder="ck_xxxxxxxxxxxxxxxxxxxx"
              fullWidth
              required
            />

            <TextField
              label="Consumer Secret"
              name="consumerSecret"
              value={formData.consumerSecret}
              onChange={handleInputChange}
              placeholder="cs_xxxxxxxxxxxxxxxxxxxx"
              type="password"
              fullWidth
              required
            />

            <Alert severity="warning">
              ⚠️ Keep your API credentials secure. Never share them publicly.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleConnectStore} 
            variant="contained"
            disabled={!formData.storeName || !formData.storeUrl || !formData.consumerKey || !formData.consumerSecret}
          >
            Test & Connect
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}