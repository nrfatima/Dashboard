import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        📊 Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Revenue</Typography>
              <Typography variant="h5">PKR 1,840,000</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Orders</Typography>
              <Typography variant="h5">688</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Connected Stores</Typography>
              <Typography variant="h5">4</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Products</Typography>
              <Typography variant="h5">1,245</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}