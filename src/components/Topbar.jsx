import { Box, Typography } from "@mui/material";

export default function Topbar() {
  return (
    <Box
      sx={{
        height: 64,
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        px: 3,
      }}
    >
      <Typography variant="h6">
        WooCommerce Multi-Store Dashboard
      </Typography>
    </Box>
  );
}