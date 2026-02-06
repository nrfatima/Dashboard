import { Typography, Card, CardContent, Grid, Button, Box, Chip } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';

export default function Reports() {
  const reports = [
    { name: "Daily Sales Report", date: "2024-01-28", status: "Ready" },
    { name: "Weekly Performance", date: "2024-01-22", status: "Ready" },
    { name: "Monthly Financial", date: "2024-01-01", status: "Ready" },
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        📄 Reports
      </Typography>

      <Grid container spacing={3}>
        {reports.map((report, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />
                    <div>
                      <Typography variant="h6">{report.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{report.date}</Typography>
                    </div>
                  </Box>
                  <Box>
                    <Chip label={report.status} color="success" size="small" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}