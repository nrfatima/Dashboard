import { useState } from "react";
import {
  Grid, Card, CardContent, Typography, Box, Button,
  TextField, Switch, FormControlLabel, Divider,
  Alert, Snackbar, Select, MenuItem, FormControl,
  InputLabel, Chip, Avatar, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, List,
  ListItem, ListItemText, ListItemIcon
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentIcon from "@mui/icons-material/Payment";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function Settings() {
  // Profile Settings
  const [profile, setProfile] = useState({
    name: "Noor Fatima",
    email: "noor.fatima@store.com",
    phone: "+92 300 1234567",
    role: "Store Manager",
    company: "Multi-Store Dashboard"
  });

  // Store Settings
  const [storeSettings, setStoreSettings] = useState({
    currency: "PKR",
    taxRate: 17,
    lowStockThreshold: 10,
    autoSync: true,
    syncInterval: 30
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    lowStockAlerts: true,
    highRefundAlerts: true,
    dailySalesReport: false,
    weeklyInventoryReport: true,
    orderUpdates: true
  });

  // Connected Stores
  const [connectedStores, setConnectedStores] = useState([
    { id: 1, name: "Electronics Hub", url: "electronics.mystore.com", status: "connected", apiKey: "ck_xxxxxxxxxxxxx" },
    { id: 2, name: "Fashion Store", url: "fashion.mystore.com", status: "connected", apiKey: "ck_yyyyyyyyyyyyy" },
    { id: 3, name: "Home Decor", url: "homedecor.mystore.com", status: "disconnected", apiKey: "ck_zzzzzzzzzzzzz" },
  ]);

  // UI State
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [editingProfile, setEditingProfile] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });

  // Handlers
  const handleSaveProfile = () => {
    setEditingProfile(false);
    showSnackbar("Profile updated successfully!", "success");
  };

  const handleSaveStoreSettings = () => {
    showSnackbar("Store settings saved successfully!", "success");
  };

  const handleSaveNotifications = () => {
    showSnackbar("Notification preferences saved!", "success");
  };

  const handleChangePassword = () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      showSnackbar("Please fill all password fields", "error");
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      showSnackbar("New passwords don't match", "error");
      return;
    }
    if (passwordForm.new.length < 6) {
      showSnackbar("Password must be at least 6 characters", "error");
      return;
    }
    setOpenPasswordDialog(false);
    setPasswordForm({ current: "", new: "", confirm: "" });
    showSnackbar("Password changed successfully!", "success");
  };

  const handleDisconnectStore = (storeId) => {
    setConnectedStores(connectedStores.map(store => 
      store.id === storeId ? { ...store, status: "disconnected" } : store
    ));
    showSnackbar("Store disconnected", "warning");
  };

  const handleReconnectStore = (storeId) => {
    setConnectedStores(connectedStores.map(store => 
      store.id === storeId ? { ...store, status: "connected" } : store
    ));
    showSnackbar("Store reconnected successfully!", "success");
  };

  const handleTestConnection = (storeName) => {
    showSnackbar(`Testing connection to ${storeName}... Connection successful!`, "success");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ width: "100%" }}>

      {/* ═══ HEADER ═══ */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.5px", color: "#0f172a" }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
          Manage your account, stores, notifications and preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>

        {/* ═══ LEFT COLUMN ═══ */}
        <Grid item xs={12} md={8}>

          {/* PROFILE SETTINGS */}
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
            <Box sx={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              p: 2.5,
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PersonIcon sx={{ fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700}>Profile Settings</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Manage your personal information</Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="small"
                startIcon={editingProfile ? <SaveIcon /> : <EditIcon />}
                onClick={() => editingProfile ? handleSaveProfile() : setEditingProfile(true)}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
              >
                {editingProfile ? "Save" : "Edit"}
              </Button>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!editingProfile}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!editingProfile}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Phone Number"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!editingProfile}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Role"
                    value={profile.role}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Company Name"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                    disabled={!editingProfile}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<SecurityIcon />}
                  onClick={() => setOpenPasswordDialog(true)}
                  fullWidth
                >
                  Change Password
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setOpenDeleteDialog(true)}
                  fullWidth
                >
                  Delete Account
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* STORE SETTINGS */}
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
            <Box sx={{ 
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              p: 2.5,
              color: "white"
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <StoreIcon sx={{ fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700}>Store Settings</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Configure currency, tax and inventory settings</Typography>
                </Box>
              </Box>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={storeSettings.currency}
                      label="Currency"
                      onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
                      startAdornment={<AttachMoneyIcon sx={{ fontSize: 16, mr: 0.5 }} />}
                    >
                      <MenuItem value="PKR">🇵🇰 PKR - Pakistani Rupee</MenuItem>
                      <MenuItem value="USD">🇺🇸 USD - US Dollar</MenuItem>
                      <MenuItem value="EUR">🇪🇺 EUR - Euro</MenuItem>
                      <MenuItem value="GBP">🇬🇧 GBP - British Pound</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Tax Rate (%)"
                    type="number"
                    value={storeSettings.taxRate}
                    onChange={(e) => setStoreSettings({...storeSettings, taxRate: e.target.value})}
                    InputProps={{
                      startAdornment: <PercentIcon sx={{ fontSize: 16, mr: 0.5, color: "#64748b" }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Low Stock Threshold"
                    type="number"
                    value={storeSettings.lowStockThreshold}
                    onChange={(e) => setStoreSettings({...storeSettings, lowStockThreshold: e.target.value})}
                    InputProps={{
                      startAdornment: <InventoryIcon sx={{ fontSize: 16, mr: 0.5, color: "#64748b" }} />
                    }}
                    helperText="Alert when stock falls below this number"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Auto-Sync Interval (minutes)"
                    type="number"
                    value={storeSettings.syncInterval}
                    onChange={(e) => setStoreSettings({...storeSettings, syncInterval: e.target.value})}
                    disabled={!storeSettings.autoSync}
                    InputProps={{
                      startAdornment: <SyncIcon sx={{ fontSize: 16, mr: 0.5, color: "#64748b" }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={storeSettings.autoSync}
                        onChange={(e) => setStoreSettings({...storeSettings, autoSync: e.target.checked})}
                      />
                    }
                    label="Enable automatic store synchronization"
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveStoreSettings}
                sx={{ mt: 3 }}
                fullWidth
              >
                Save Store Settings
              </Button>
            </CardContent>
          </Card>

          {/* NOTIFICATION SETTINGS */}
          <Card sx={{ borderRadius: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
            <Box sx={{ 
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              p: 2.5,
              color: "white"
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <NotificationsIcon sx={{ fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" fontWeight={700}>Notification Settings</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Configure email and alert preferences</Typography>
                </Box>
              </Box>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <List sx={{ p: 0 }}>
                {[
                  { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
                  { key: "lowStockAlerts", label: "Low Stock Alerts", desc: "Alert when products are running low" },
                  { key: "highRefundAlerts", label: "High Refund Alerts", desc: "Alert when refund rate is high" },
                  { key: "dailySalesReport", label: "Daily Sales Report", desc: "Receive daily sales summary" },
                  { key: "weeklyInventoryReport", label: "Weekly Inventory Report", desc: "Weekly stock status report" },
                  { key: "orderUpdates", label: "Order Updates", desc: "Notifications for new orders" },
                ].map((item, index) => (
                  <Box key={item.key}>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: 2, 
                          bgcolor: notifications[item.key] ? "#e3f2fd" : "#f5f5f5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {notifications[item.key] ? 
                            <CheckCircleIcon sx={{ color: "#1976d2" }} /> : 
                            <CancelIcon sx={{ color: "#9e9e9e" }} />
                          }
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2" fontWeight={600}>{item.label}</Typography>}
                        secondary={<Typography variant="caption" color="textSecondary">{item.desc}</Typography>}
                      />
                      <Switch
                        checked={notifications[item.key]}
                        onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                        color="primary"
                      />
                    </ListItem>
                    {index < 5 && <Divider />}
                  </Box>
                ))}
              </List>

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveNotifications}
                sx={{ mt: 2 }}
                fullWidth
              >
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>

        </Grid>

        {/* ═══ RIGHT COLUMN ═══ */}
        <Grid item xs={12} md={4}>

          {/* CONNECTED STORES */}
          <Card sx={{ borderRadius: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" fontWeight={700} fontSize={15}>Connected Stores</Typography>
                <Chip 
                  label={`${connectedStores.filter(s => s.status === "connected").length}/${connectedStores.length}`} 
                  size="small" 
                  color="primary" 
                />
              </Box>

              {connectedStores.map((store) => (
                <Box 
                  key={store.id}
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    border: "1px solid #f1f5f9",
                    borderRadius: 2,
                    bgcolor: store.status === "connected" ? "#f0fdf4" : "#fef3f2",
                    borderLeft: `4px solid ${store.status === "connected" ? "#16a34a" : "#dc2626"}`
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <Avatar sx={{ 
                      width: 36, 
                      height: 36, 
                      bgcolor: store.status === "connected" ? "#dcfce7" : "#fee2e2",
                      color: store.status === "connected" ? "#16a34a" : "#dc2626"
                    }}>
                      <StoreIcon fontSize="small" />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={700}>{store.name}</Typography>
                      <Typography variant="caption" color="textSecondary">{store.url}</Typography>
                    </Box>
                    <Chip 
                      label={store.status} 
                      size="small" 
                      color={store.status === "connected" ? "success" : "error"}
                      sx={{ fontSize: 10, height: 20 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {store.status === "connected" ? (
                      <>
                        <Button 
                          size="small" 
                          variant="outlined"
                          onClick={() => handleTestConnection(store.name)}
                          fullWidth
                        >
                          Test
                        </Button>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          color="error"
                          onClick={() => handleDisconnectStore(store.id)}
                          fullWidth
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="success"
                        onClick={() => handleReconnectStore(store.id)}
                        fullWidth
                      >
                        Reconnect
                      </Button>
                    )}
                  </Box>
                </Box>
              ))}

              <Button
                variant="outlined"
                startIcon={<StoreIcon />}
                fullWidth
                onClick={() => showSnackbar("Connect store feature coming soon!", "info")}
              >
                Add New Store
              </Button>
            </CardContent>
          </Card>

        </Grid>

      </Grid>

      {/* ═══ CHANGE PASSWORD DIALOG ═══ */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ borderBottom: "1px solid #f1f5f9" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <SecurityIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>Change Password</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Current Password"
              type="password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
            />
            <TextField
              fullWidth
              size="small"
              label="New Password"
              type="password"
              value={passwordForm.new}
              onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
              helperText="Minimum 6 characters"
            />
            <TextField
              fullWidth
              size="small"
              label="Confirm New Password"
              type="password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #f1f5f9", px: 3, py: 2 }}>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleChangePassword}>Change Password</Button>
        </DialogActions>
      </Dialog>

      {/* ═══ DELETE ACCOUNT DIALOG ═══ */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ borderBottom: "1px solid #f1f5f9" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <DeleteIcon color="error" />
            <Typography variant="h6" fontWeight={700}>Delete Account</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <strong>Warning!</strong> This action cannot be undone. All your data will be permanently deleted.
          </Alert>
          <Typography variant="body2" color="textSecondary">
            Are you sure you want to delete your account? This will remove all your stores, products, orders and settings.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #f1f5f9", px: 3, py: 2 }}>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => {
              setOpenDeleteDialog(false);
              showSnackbar("Account deletion feature disabled in demo", "warning");
            }}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* ═══ SNACKBAR ═══ */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}