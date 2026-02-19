import { useState, useContext } from "react";
import {
  Box, Typography, IconButton, Badge, Menu, MenuItem,
  Avatar, Tooltip, Divider, Chip, InputBase, Paper,
  List, ListItem, ListItemText, ListItemIcon, Popover,
  Select, FormControl
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const notifications = [
  { id: 1, type: "warning", icon: <WarningIcon sx={{ color: "#ff9800" }} />, title: "Low Stock Alert", message: "Nike Air Max is out of stock!", time: "2 mins ago", bg: "#fff3e0" },
  { id: 2, type: "error", icon: <ErrorIcon sx={{ color: "#f44336" }} />, title: "High Refund Rate", message: "Fashion Store refunds up by 20%", time: "15 mins ago", bg: "#ffebee" },
  { id: 3, type: "warning", icon: <WarningIcon sx={{ color: "#ff9800" }} />, title: "Low Stock Alert", message: "Cricket Bat is out of stock!", time: "1 hour ago", bg: "#fff3e0" },
  { id: 4, type: "info", icon: <InfoIcon sx={{ color: "#2196f3" }} />, title: "New Order", message: "Order #ORD-011 received from Electronics Hub", time: "2 hours ago", bg: "#e3f2fd" },
  { id: 5, type: "info", icon: <InfoIcon sx={{ color: "#2196f3" }} />, title: "Store Synced", message: "Fashion Store data synced successfully", time: "3 hours ago", bg: "#e3f2fd" },
];

const stores = [
  "All Stores",
  "Electronics Hub",
  "Fashion Store",
  "Home Decor",
  "Sports Shop",
];

export default function Topbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [selectedStore, setSelectedStore] = useState("All Stores");
  const [searchQuery, setSearchQuery] = useState("");
  const [readNotifs, setReadNotifs] = useState([]);

  const unreadCount = notifications.filter(n => !readNotifs.includes(n.id)).length;

  const handleProfileOpen = (e) => setAnchorEl(e.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);

  const handleNotifOpen = (e) => setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => {
    setNotifAnchor(null);
    setReadNotifs(notifications.map(n => n.id));
  };

  const handleLogout = () => {
    logout();
    navigate("/landing");
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    const parts = user.name.split(" ");
    return parts.length >= 2
      ? parts[0][0] + parts[1][0]
      : parts[0][0];
  };

  return (
    <Box
      sx={{
        height: 64,
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        px: 3,
        gap: 2,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* SEARCH BAR */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 0.5,
          borderRadius: 3,
          bgcolor: "#f5f7fa",
          border: "1px solid #e0e0e0",
          flex: 1,
          maxWidth: 400,
        }}
      >
        <SearchIcon sx={{ color: "#9e9e9e", mr: 1, fontSize: 20 }} />
        <InputBase
          placeholder="Search orders, products, customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, fontSize: 14 }}
        />
      </Paper>

      {/* RIGHT SIDE */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto" }}>

        {/* STORE SELECTOR */}
        <FormControl size="small">
          <Select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            sx={{
              bgcolor: "#f5f7fa",
              borderRadius: 2,
              fontSize: 13,
              "& .MuiOutlinedInput-notchedOutline": { border: "1px solid #e0e0e0" },
              minWidth: 150,
            }}
            startAdornment={<StoreIcon sx={{ fontSize: 16, color: "#1976d2", mr: 0.5 }} />}
          >
            {stores.map((store) => (
              <MenuItem key={store} value={store} sx={{ fontSize: 13 }}>
                {store}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* NOTIFICATION BELL */}
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleNotifOpen}
            sx={{
              bgcolor: unreadCount > 0 ? "#fff3e0" : "#f5f7fa",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              "&:hover": { bgcolor: "#e3f2fd" },
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon sx={{ color: unreadCount > 0 ? "#f57c00" : "#757575", fontSize: 22 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* NOTIFICATION POPOVER */}
        <Popover
          open={Boolean(notifAnchor)}
          anchorEl={notifAnchor}
          onClose={handleNotifClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 360, borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", mt: 1 }
          }}
        >
          {/* NOTIF HEADER */}
          <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" fontWeight="bold" fontSize={15}>🔔 Notifications</Typography>
            <Chip label={`${unreadCount} new`} size="small" color={unreadCount > 0 ? "error" : "default"} />
          </Box>

          {/* NOTIF LIST */}
          <List sx={{ p: 0, maxHeight: 360, overflowY: "auto" }}>
            {notifications.map((notif, index) => (
              <Box key={notif.id}>
                <ListItem
                  sx={{
                    px: 2.5, py: 1.5,
                    bgcolor: readNotifs.includes(notif.id) ? "white" : notif.bg,
                    "&:hover": { bgcolor: "#f5f7fa", cursor: "pointer" },
                    transition: "all 0.2s"
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {notif.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight="bold" fontSize={13}>
                        {notif.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" color="textSecondary" display="block">
                          {notif.message}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#9e9e9e", fontSize: 11 }}>
                          {notif.time}
                        </Typography>
                      </Box>
                    }
                  />
                  {!readNotifs.includes(notif.id) && (
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#f44336", flexShrink: 0 }} />
                  )}
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>

          {/* NOTIF FOOTER */}
          <Box sx={{ px: 2.5, py: 1.5, borderTop: "1px solid #f0f0f0", textAlign: "center" }}>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 600, fontSize: 13, "&:hover": { textDecoration: "underline" } }}
              onClick={handleNotifClose}
            >
              Mark all as read
            </Typography>
          </Box>
        </Popover>

        {/* USER AVATAR + NAME */}
        <Tooltip title="Account settings">
          <Box
            onClick={handleProfileOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              bgcolor: "#f5f7fa",
              border: "1px solid #e0e0e0",
              borderRadius: 3,
              px: 1.5,
              py: 0.8,
              "&:hover": { bgcolor: "#e3f2fd" },
              transition: "all 0.2s"
            }}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgcolor: "#1976d2",
                fontSize: 12,
                fontWeight: "bold"
              }}
            >
              {getUserInitials()}
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body2" fontWeight="bold" fontSize={13} lineHeight={1.2}>
                {user?.name || "User"}
              </Typography>
              <Typography variant="caption" color="textSecondary" fontSize={11}>
                Store Manager
              </Typography>
            </Box>
          </Box>
        </Tooltip>

        {/* PROFILE MENU */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
          PaperProps={{
            sx: { borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", mt: 1, minWidth: 200 }
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* USER INFO */}
          <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid #f0f0f0" }}>
            <Typography variant="body2" fontWeight="bold">{user?.name || "User"}</Typography>
            <Typography variant="caption" color="textSecondary">{user?.email || ""}</Typography>
          </Box>

          <MenuItem onClick={() => { handleProfileClose(); navigate("/settings"); }}
            sx={{ py: 1.5, gap: 1.5 }}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="body2">Profile Settings</Typography>
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={handleLogout}
            sx={{ py: 1.5, gap: 1.5, color: "#f44336", "&:hover": { bgcolor: "#ffebee" } }}
          >
            <LogoutIcon fontSize="small" sx={{ color: "#f44336" }} />
            <Typography variant="body2" color="error" fontWeight="bold">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}