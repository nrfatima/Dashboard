import { Typography, Card, CardContent, Grid, Button } from "@mui/material";

export default function Settings() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        ⚙️ Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>🔗 Store Connections</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Connect your WooCommerce stores
              </Typography>
              <Button variant="contained" color="primary">
                + Connect New Store
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>👤 User Profile</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Update your profile information
              </Typography>
              <Button variant="outlined">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}