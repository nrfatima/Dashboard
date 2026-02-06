import { Box, List, ListItemButton, ListItemText, Typography, ListItemIcon } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Stores", icon: <StoreIcon />, path: "/stores" },
    { text: "Products", icon: <InventoryIcon />, path: "/products" },
    { text: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
    { text: "Refunds", icon: <AssignmentReturnIcon />, path: "/refunds" },
    { text: "Couriers", icon: <LocalShippingIcon />, path: "/couriers" },
    { text: "Suppliers", icon: <BusinessIcon />, path: "/suppliers" },
    { text: "Analytics", icon: <BarChartIcon />, path: "/analytics" },
    { text: "Reports", icon: <DescriptionIcon />, path: "/reports" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "#1e293b",
        color: "white",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        // Custom scrollbar styling
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255,255,255,0.05)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(255,255,255,0.3)',
        },
      }}
    >
      {/* LOGO/HEADER */}
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          🛒 WooCommerce
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          Multi-Store Manager
        </Typography>
      </Box>

      {/* MENU ITEMS */}
      <Box sx={{ flex: 1, p: 2 }}>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                bgcolor: location.pathname === item.path ? "rgba(255,255,255,0.12)" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                },
                transition: "all 0.2s",
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* FOOTER */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(255,255,255,0.1)',
        bgcolor: 'rgba(0,0,0,0.2)'
      }}>
        <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', textAlign: 'center' }}>
          Version 1.0.0
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', textAlign: 'center' }}>
          © 2024 FYP Project
        </Typography>
      </Box>
    </Box>
  );
}