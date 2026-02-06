import { 
  Grid, 
  Card, 
  CardContent, 
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Avatar
} from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Suppliers() {
  const suppliers = [
    { 
      id: 1,
      name: "Al-Karam Textiles",
      contact: "Ahmed Khan",
      phone: "+92 300 1234567",
      email: "alkaram@supplier.com",
      products: 45,
      totalOrders: 234,
      paymentStatus: "Paid",
      avgCost: "PKR 800"
    },
    { 
      id: 2,
      name: "Tech Solutions Ltd",
      contact: "Sara Ahmed",
      phone: "+92 321 9876543",
      email: "tech@supplier.com",
      products: 89,
      totalOrders: 456,
      paymentStatus: "Pending",
      avgCost: "PKR 2,500"
    },
    { 
      id: 3,
      name: "Home Décor Wholesale",
      contact: "Hassan Raza",
      phone: "+92 333 5554444",
      email: "homedecor@supplier.com",
      products: 67,
      totalOrders: 189,
      paymentStatus: "Paid",
      avgCost: "PKR 600"
    },
    { 
      id: 4,
      name: "Sports Gear Co.",
      contact: "Fatima Noor",
      phone: "+92 345 7778888",
      email: "sports@supplier.com",
      products: 34,
      totalOrders: 145,
      paymentStatus: "Pending",
      avgCost: "PKR 1,200"
    },
  ];

  const productSupplierMapping = [
    { product: "Nike Air Max", supplier: "Sports Gear Co.", cost: "PKR 1,800", lastUpdated: "2024-01-20" },
    { product: "iPhone Case", supplier: "Tech Solutions Ltd", cost: "PKR 300", lastUpdated: "2024-01-22" },
    { product: "Cotton T-Shirt", supplier: "Al-Karam Textiles", cost: "PKR 400", lastUpdated: "2024-01-18" },
    { product: "LED Lamp", supplier: "Home Décor Wholesale", cost: "PKR 500", lastUpdated: "2024-01-25" },
    { product: "Cricket Bat", supplier: "Sports Gear Co.", cost: "PKR 2,500", lastUpdated: "2024-01-21" },
  ];

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          🏭 Supplier Management
        </Typography>
        <Button variant="contained" color="primary">+ Add New Supplier</Button>
      </Box>

      {/* SUMMARY CARDS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Suppliers</Typography>
              <Typography variant="h4">12</Typography>
              <Typography variant="body2" color="textSecondary">Active partnerships</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Products</Typography>
              <Typography variant="h4">235</Typography>
              <Typography variant="body2" color="textSecondary">From all suppliers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Orders</Typography>
              <Typography variant="h4">1,024</Typography>
              <Typography variant="body2" color="textSecondary">This month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#fff3cd', borderLeft: '4px solid #ed6c02' }}>
            <CardContent>
              <Typography variant="subtitle2" color="warning.dark">Pending Payments</Typography>
              <Typography variant="h4" color="warning.dark">PKR 245,000</Typography>
              <Typography variant="body2" color="warning.dark">2 suppliers</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* SUPPLIERS LIST */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>📋 All Suppliers</Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Supplier</strong></TableCell>
                  <TableCell><strong>Contact Person</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Products</strong></TableCell>
                  <TableCell><strong>Total Orders</strong></TableCell>
                  <TableCell><strong>Payment Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <BusinessIcon />
                        </Avatar>
                        <Typography fontWeight="bold">{supplier.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{supplier.contact}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PhoneIcon fontSize="small" color="action" />
                        {supplier.phone}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <EmailIcon fontSize="small" color="action" />
                        {supplier.email}
                      </Box>
                    </TableCell>
                    <TableCell><strong>{supplier.products}</strong></TableCell>
                    <TableCell><strong>{supplier.totalOrders}</strong></TableCell>
                    <TableCell>
                      <Chip 
                        label={supplier.paymentStatus}
                        color={supplier.paymentStatus === "Paid" ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* PRODUCT-SUPPLIER MAPPING */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>🔗 Product-Supplier Cost Mapping</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            This table shows supplier costs for each product. These costs are used to calculate accurate profit.
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell><strong>Supplier</strong></TableCell>
                  <TableCell><strong>Supplier Cost (Per Unit)</strong></TableCell>
                  <TableCell><strong>Last Updated</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productSupplierMapping.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell><strong>{item.product}</strong></TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>
                      <Typography fontWeight="bold" color="primary">
                        {item.cost}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small">Update Cost</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}