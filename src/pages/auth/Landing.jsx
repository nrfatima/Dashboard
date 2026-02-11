import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          }}
        >
          {/* LOGO */}
          <Box sx={{ mb: 3 }}>
            <StoreIcon sx={{ fontSize: 60, color: "#667eea", mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              🛍️ WooCommerce Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your multi-store business in one place
            </Typography>
          </Box>

          {/* DESCRIPTION */}
          <Box sx={{ mb: 4, p: 2, bgcolor: "#f5f7fa", borderRadius: 1 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              ✅ Connect multiple WooCommerce stores
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              ✅ Manage orders, products, and inventory
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              ✅ Track suppliers and courier costs
            </Typography>
            <Typography variant="body2">
              ✅ Get real-time analytics and reports
            </Typography>
          </Box>

          {/* BUTTONS */}
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/signin")}
              sx={{
                bgcolor: "#667eea",
                color: "white",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": { bgcolor: "#5568d3" },
              }}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/signup")}
              sx={{
                borderColor: "#667eea",
                color: "#667eea",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": { bgcolor: "rgba(102, 126, 234, 0.05)" },
              }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}