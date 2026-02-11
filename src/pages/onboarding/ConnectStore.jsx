import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";

export default function ConnectStore() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: "",
    storeUrl: "",
    consumerKey: "",
    consumerSecret: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConnect = () => {
    if (
      formData.storeName &&
      formData.storeUrl &&
      formData.consumerKey &&
      formData.consumerSecret
    ) {
      navigate("/store-success");
    } else {
      alert("Please fill in all fields");
    }
  };

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
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          }}
        >
          {/* HEADER */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <LinkIcon sx={{ fontSize: 50, color: "#667eea", mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Connect Your Store
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Add your WooCommerce store credentials
            </Typography>
          </Box>

          {/* INSTRUCTIONS */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
              Where to find your API credentials:
            </Typography>
            <Typography variant="body2">
              1. Go to your WooCommerce store admin
            </Typography>
            <Typography variant="body2">
              2. Navigate to <strong>WooCommerce → Settings → Advanced → REST API</strong>
            </Typography>
            <Typography variant="body2">
              3. Click "Create an API key"
            </Typography>
            <Typography variant="body2">
              4. Copy the Consumer Key & Secret below
            </Typography>
          </Alert>

          {/* FORM */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Store Name"
              fullWidth
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              placeholder="e.g., My Fashion Store"
            />

            <TextField
              label="Store URL"
              fullWidth
              name="storeUrl"
              value={formData.storeUrl}
              onChange={handleChange}
              placeholder="https://mystore.com"
            />

            <TextField
              label="Consumer Key"
              fullWidth
              name="consumerKey"
              value={formData.consumerKey}
              onChange={handleChange}
              placeholder="ck_xxxxxxxxxxxxxxxx"
              type="password"
            />

            <TextField
              label="Consumer Secret"
              fullWidth
              name="consumerSecret"
              value={formData.consumerSecret}
              onChange={handleChange}
              placeholder="cs_xxxxxxxxxxxxxxxx"
              type="password"
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleConnect}
              sx={{
                bgcolor: "#4caf50",
                color: "white",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": { bgcolor: "#45a049" },
              }}
            >
              Connect Store
            </Button>
          </Box>

          {/* SKIP OPTION */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="text"
              onClick={() => navigate("/")}
              sx={{ color: "#667eea" }}
            >
              Skip for Now
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}