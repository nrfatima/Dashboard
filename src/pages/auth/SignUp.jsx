import { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import StoreIcon from "@mui/icons-material/Store";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = () => {
    if (
      formData.fullName &&
      formData.email &&
      formData.company &&
      formData.password &&
      formData.confirmPassword
    ) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      signup({
        name: formData.fullName,
        email: formData.email,
        company: formData.company,
      });
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
              Create Account
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Join us and manage your stores
            </Typography>
          </Box>

          {/* FORM */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              fullWidth
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
            />

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <TextField
              label="Company Name"
              fullWidth
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleSignUp}
              sx={{
                bgcolor: "#667eea",
                color: "white",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": { bgcolor: "#5568d3" },
              }}
            >
              Create Account
            </Button>
          </Box>

          {/* FOOTER LINKS */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/signin")}
                sx={{ cursor: "pointer", color: "#667eea", fontWeight: "bold" }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}