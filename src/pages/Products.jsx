import { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Button, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Chip, Box,
  FormControl, InputLabel, Select, MenuItem,
  TextField, InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Products() {
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // All products from all stores
  const allProducts = [
    { id: 1, name: "Laptop HP", store: "Electronics Hub", category: "Electronics", price: "PKR 89,900", supplierCost: "PKR 65,000", stock: 15, status: "In Stock" },
    { id: 2, name: "iPhone 14 Pro", store: "Electronics Hub", category: "Electronics", price: "PKR 99,900", supplierCost: "PKR 75,000", stock: 8, status: "In Stock" },
    { id: 3, name: "Samsung Galaxy S23", store: "Electronics Hub", category: "Electronics", price: "PKR 85,000", supplierCost: "PKR 62,000", stock: 12, status: "In Stock" },
    { id: 4, name: "Nike Air Max", store: "Fashion Store", category: "Shoes", price: "PKR 12,000", supplierCost: "PKR 8,000", stock: 0, status: "Out of Stock" },
    { id: 5, name: "Adidas Running Shoes", store: "Fashion Store", category: "Shoes", price: "PKR 9,500", supplierCost: "PKR 6,500", stock: 25, status: "In Stock" },
    { id: 6, name: "T-Shirt Cotton", store: "Fashion Store", category: "Clothing", price: "PKR 1,500", supplierCost: "PKR 800", stock: 45, status: "In Stock" },
    { id: 7, name: "Jeans Denim", store: "Fashion Store", category: "Clothing", price: "PKR 3,500", supplierCost: "PKR 2,000", stock: 3, status: "Low Stock" },
    { id: 8, name: "LED Table Lamp", store: "Home Decor", category: "Lighting", price: "PKR 2,500", supplierCost: "PKR 1,500", stock: 12, status: "In Stock" },
    { id: 9, name: "Coffee Maker", store: "Home Decor", category: "Appliances", price: "PKR 4,500", supplierCost: "PKR 3,000", stock: 23, status: "In Stock" },
    { id: 10, name: "Wall Clock", store: "Home Decor", category: "Decor", price: "PKR 1,800", supplierCost: "PKR 1,000", stock: 18, status: "In Stock" },
    { id: 11, name: "Cricket Bat", store: "Sports Shop", category: "Sports", price: "PKR 8,500", supplierCost: "PKR 5,000", stock: 0, status: "Out of Stock" },
    { id: 12, name: "Football", store: "Sports Shop", category: "Sports", price: "PKR 2,200", supplierCost: "PKR 1,200", stock: 30, status: "In Stock" },
  ];

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStore = selectedStore === 'all' || product.store === selectedStore;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesStore && matchesCategory && matchesStatus;
  });

  // Get unique values for filters
  const stores = ['all', ...new Set(allProducts.map(p => p.store))];
  const categories = ['all', ...new Set(allProducts.map(p => p.category))];

  // Calculate stats
  const totalProducts = allProducts.length;
  const inStock = allProducts.filter(p => p.status === "In Stock").length;
  const lowStock = allProducts.filter(p => p.status === "Low Stock").length;
  const outOfStock = allProducts.filter(p => p.status === "Out of Stock").length;

  return (
    <div>
      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          📦 Products Management
        </Typography>
        <Button variant="contained" color="primary">+ Add Product</Button>
      </Box>

      {/* SUMMARY CARDS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">Total Products</Typography>
              <Typography variant="h4">{totalProducts}</Typography>
              <Typography variant="body2" color="textSecondary">All stores</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#d4edda', borderLeft: '4px solid #28a745' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: '#155724' }}>In Stock</Typography>
              <Typography variant="h4" sx={{ color: '#155724' }}>{inStock}</Typography>
              <Typography variant="body2" sx={{ color: '#155724' }}>Ready to sell</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#fff3cd', borderLeft: '4px solid #ffc107' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: '#856404' }}>Low Stock</Typography>
              <Typography variant="h4" sx={{ color: '#856404' }}>{lowStock}</Typography>
              <Typography variant="body2" sx={{ color: '#856404' }}>Need reorder</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ bgcolor: '#f8d7da', borderLeft: '4px solid #dc3545' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: '#721c24' }}>Out of Stock</Typography>
              <Typography variant="h4" sx={{ color: '#721c24' }}>{outOfStock}</Typography>
              <Typography variant="body2" sx={{ color: '#721c24' }}>Urgent restock</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FILTERS */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FilterListIcon color="primary" />
            <Typography variant="h6">Filters</Typography>
          </Box>

          <Grid container spacing={2}>
            {/* SEARCH */}
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* FILTER BY STORE */}
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Store</InputLabel>
                <Select 
                  value={selectedStore}
                  label="Filter by Store"
                  onChange={(e) => setSelectedStore(e.target.value)}
                >
                  <MenuItem value="all">All Stores</MenuItem>
                  {stores.filter(s => s !== 'all').map(store => (
                    <MenuItem key={store} value={store}>{store}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* FILTER BY CATEGORY */}
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Category</InputLabel>
                <Select 
                  value={selectedCategory}
                  label="Filter by Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.filter(c => c !== 'all').map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* FILTER BY STATUS */}
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Status</InputLabel>
                <Select 
                  value={selectedStatus}
                  label="Filter by Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="In Stock">In Stock</MenuItem>
                  <MenuItem value="Low Stock">Low Stock</MenuItem>
                  <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* ACTIVE FILTERS */}
          {(searchQuery || selectedStore !== 'all' || selectedCategory !== 'all' || selectedStatus !== 'all') && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {searchQuery && <Chip label={`Search: "${searchQuery}"`} size="small" onDelete={() => setSearchQuery('')} />}
              {selectedStore !== 'all' && <Chip label={`Store: ${selectedStore}`} size="small" onDelete={() => setSelectedStore('all')} />}
              {selectedCategory !== 'all' && <Chip label={`Category: ${selectedCategory}`} size="small" onDelete={() => setSelectedCategory('all')} />}
              {selectedStatus !== 'all' && <Chip label={`Status: ${selectedStatus}`} size="small" onDelete={() => setSelectedStatus('all')} />}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* PRODUCTS TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Products List ({filteredProducts.length} items)
          </Typography>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell><strong>Store</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Customer Price</strong></TableCell>
                  <TableCell><strong>Supplier Cost</strong></TableCell>
                  <TableCell><strong>Stock</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>{product.id}</TableCell>
                      <TableCell><strong>{product.name}</strong></TableCell>
                      <TableCell>
                        <Chip label={product.store} size="small" variant="outlined" color="primary" />
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell><strong>{product.price}</strong></TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {product.supplierCost}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold" color={product.stock === 0 ? 'error' : product.stock < 5 ? 'warning.main' : 'success.main'}>
                          {product.stock}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={product.status} 
                          color={
                            product.status === "In Stock" ? "success" : 
                            product.status === "Low Stock" ? "warning" : "error"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Typography variant="body2" color="textSecondary" sx={{ py: 3 }}>
                        No products found. Try adjusting your filters.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}