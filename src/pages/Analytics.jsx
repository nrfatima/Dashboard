import { Typography, Card, CardContent, Grid, Box } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Analytics() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        📊 Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Sales Analytics</Typography>
              <Box sx={{ 
                height: 300, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'grey.100',
                borderRadius: 1
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <BarChartIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                  <Typography color="textSecondary">Charts will be displayed here</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}