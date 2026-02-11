import { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import StoreIcon from "@mui/icons-material/Store";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    if (email && password) {
      login({ name: "User", email });
      navigate("/welcome");
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
            <StoreIcon sx={{ fontSize: 50, color: "#667eea", mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Sign In
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Welcome back to your dashboard
            </Typography>
          </Box>

          {/* FORM */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleSignIn}
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
          </Box>

          {/* FOOTER LINKS */}
          <Box sx={{ textAlign: "center", mt: 3, display: "flex", flexDirection: "column", gap: 1 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/forgot-password")}
              sx={{ cursor: "pointer", color: "#667eea" }}
            >
              Forgot your password?
            </Link>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/signup")}
                sx={{ cursor: "pointer", color: "#667eea", fontWeight: "bold" }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}