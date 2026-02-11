import { useContext } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
          {/* ICON */}
          <CheckCircleIcon sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />

          {/* WELCOME MESSAGE */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Welcome, {user?.name}! 👋
          </Typography>

          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Your account has been created successfully. Let's get you started!
          </Typography>

          {/* BENEFITS */}
          <Box sx={{ p: 2, bgcolor: "#f5f7fa", borderRadius: 1, mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2 }}>
              What you can do now:
            </Typography>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✅ Connect your first WooCommerce store
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✅ Manage products and inventory
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ✅ Track orders and refunds
              </Typography>
              <Typography variant="body2">
                ✅ Access analytics and reports
              </Typography>
            </Box>
          </Box>

          {/* BUTTONS */}
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/connect-store")}
              sx={{
                bgcolor: "#667eea",
                color: "white",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": { bgcolor: "#5568d3" },
              }}
            >
              Connect Your First Store
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                borderColor: "#667eea",
                color: "#667eea",
                fontWeight: "bold",
                py: 1.5,
              }}
            >
              Skip for Now
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}