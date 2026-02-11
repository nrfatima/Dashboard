import { Box, Button, Typography, Container, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StoreIcon from "@mui/icons-material/Store";

export default function StoreSuccess() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
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
          {/* SUCCESS ICON */}
          <CheckCircleIcon sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />

          {/* TITLE */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            🎉 Store Connected!
          </Typography>

          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Your WooCommerce store has been successfully connected.
          </Typography>

          {/* STORE DETAILS */}
          <Card sx={{ mb: 3, bgcolor: "#f5f7fa", border: "1px solid #e0e0e0" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <StoreIcon sx={{ fontSize: 40, color: "#667eea" }} />
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    My Fashion Store
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    https://fashionstore.com
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ pt: 2, borderTop: "1px solid #e0e0e0" }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  📦 <strong>Products:</strong> 145
                </Typography>
                <Typography variant="body2">
                  📋 <strong>Orders:</strong> 24
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* NEXT STEPS */}
          <Box sx={{ p: 2, bgcolor: "#e8f5e9", borderRadius: 1, mb: 3, textAlign: "left" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
              What's next?
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              ✅ View your products and inventory
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              ✅ Manage orders and refunds
            </Typography>
            <Typography variant="body2">
              ✅ Track supplier costs and profitability
            </Typography>
          </Box>

          {/* ACTION BUTTONS */}
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                bgcolor: "#4caf50",
                color: "white",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": { bgcolor: "#45a049" },
              }}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/connect-store")}
              sx={{
                borderColor: "#667eea",
                color: "#667eea",
                fontWeight: "bold",
              }}
            >
              Connect Another Store
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}