import { useState } from "react";
import {
  Grid, Card, CardContent, Typography, Box, Button,
  FormControl, InputLabel, Select, MenuItem, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, Alert, LinearProgress, Divider, IconButton,
  Tooltip, Stack
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const reportCategories = [
  {
    id: "sales",
    title: "Sales Report",
    icon: "📊",
    color: "#1976d2",
    bg: "#e3f2fd",
    description: "Comprehensive sales analysis with revenue trends, order metrics and performance insights",
    includes: ["Revenue breakdown", "Order statistics", "Sales trends", "Store comparison"]
  },
  {
    id: "inventory",
    title: "Inventory Report",
    icon: "📦",
    color: "#2e7d32",
    bg: "#e8f5e9",
    description: "Complete inventory overview including stock levels, low stock alerts and restock recommendations",
    includes: ["Current stock levels", "Low stock alerts", "Restock predictions", "Stock movement"]
  },
  {
    id: "financial",
    title: "Financial Report",
    icon: "💰",
    color: "#ed6c02",
    bg: "#fff3e0",
    description: "Detailed financial analysis covering profit margins, expenses, refund costs and net income",
    includes: ["Revenue & expenses", "Profit margins", "Refund costs", "Tax calculations"]
  },
  {
    id: "refunds",
    title: "Refunds Analysis",
    icon: "↩️",
    color: "#d32f2f",
    bg: "#ffebee",
    description: "In-depth refund analysis showing reasons, patterns, costs and quality insights",
    includes: ["Refund reasons", "Cost breakdown", "Trend analysis", "Product quality metrics"]
  },
  {
    id: "customers",
    title: "Customer Insights",
    icon: "👥",
    color: "#7b1fa2",
    bg: "#f3e5f5",
    description: "Customer behavior analytics including retention rates, lifetime value and purchasing patterns",
    includes: ["Customer retention", "Lifetime value", "Purchase patterns", "Demographics"]
  },
];

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("sales");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedStore, setSelectedStore] = useState("all");
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Recent reports state
  const [recentReports, setRecentReports] = useState([
    { 
      id: 1, 
      name: "February 2024 - Monthly Sales Report", 
      category: "Sales", 
      date: "2024-02-15 14:30", 
      status: "completed", 
      size: "2.4 MB",
      records: "1,245 orders",
      format: ["PDF", "Excel"],
      generatedBy: "System (Scheduled)"
    },
    { 
      id: 2, 
      name: "Week 7 - Weekly Inventory Report", 
      category: "Inventory", 
      date: "2024-02-12 09:00", 
      status: "completed", 
      size: "1.8 MB",
      records: "856 products",
      format: ["PDF", "Excel"],
      generatedBy: "Admin"
    },
    { 
      id: 3, 
      name: "Q4 2023 - Financial Summary", 
      category: "Financial", 
      date: "2024-01-05 16:45", 
      status: "completed", 
      size: "3.1 MB",
      records: "4 stores",
      format: ["PDF", "Excel"],
      generatedBy: "System (Scheduled)"
    },
    { 
      id: 4, 
      name: "January 2024 - Refunds Analysis", 
      category: "Refunds", 
      date: "2024-01-31 11:20", 
      status: "completed", 
      size: "1.2 MB",
      records: "89 refunds",
      format: ["PDF"],
      generatedBy: "Manager"
    },
  ]);

  // Scheduled reports state
  const [scheduledReports, setScheduledReports] = useState([
    { 
      id: 1, 
      name: "Daily Sales Summary", 
      type: "Sales",
      frequency: "Daily at 9:00 AM", 
      recipients: "admin@store.com, manager@store.com", 
      active: true,
      lastSent: "Today, 9:00 AM",
      nextRun: "Tomorrow, 9:00 AM"
    },
    { 
      id: 2, 
      name: "Weekly Low Stock Alert", 
      type: "Inventory",
      frequency: "Every Monday at 8:00 AM", 
      recipients: "inventory@store.com", 
      active: true,
      lastSent: "Mon, Feb 12 at 8:00 AM",
      nextRun: "Mon, Feb 19 at 8:00 AM"
    },
    { 
      id: 3, 
      name: "Monthly Financial Summary", 
      type: "Financial",
      frequency: "1st of month at 10:00 AM", 
      recipients: "finance@store.com, ceo@store.com", 
      active: false,
      lastSent: "Feb 1 at 10:00 AM",
      nextRun: "Paused"
    },
  ]);

  // Schedule form state
  const [scheduleForm, setScheduleForm] = useState({
    reportType: "sales",
    frequency: "daily",
    recipients: "",
    time: "09:00"
  });

  const handleGenerate = () => {
    if (!dateFrom || !dateTo) {
      alert("⚠️ Please select both From and To dates");
      return;
    }

    setGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const selectedCategoryData = reportCategories.find(c => c.id === selectedCategory);
            const newReport = {
              id: recentReports.length + 1,
              name: `${selectedCategoryData.title} - ${dateFrom} to ${dateTo}`,
              category: selectedCategoryData.title,
              date: new Date().toLocaleString(),
              status: "completed",
              size: (Math.random() * 3 + 0.5).toFixed(1) + " MB",
              records: Math.floor(Math.random() * 1000 + 100) + " records",
              format: ["PDF", "Excel"],
              generatedBy: "Admin"
            };
            setRecentReports([newReport, ...recentReports]);
            setGenerating(false);
            setProgress(0);
            alert(`✅ Report Generated Successfully!\n\n${selectedCategoryData.title}\nDate Range: ${dateFrom} to ${dateTo}\nStore: ${selectedStore === 'all' ? 'All Stores' : selectedStore}\n\nYour report is ready for download.`);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownload = (reportName, format) => {
    alert(`📥 Downloading "${reportName}"\nFormat: ${format.toUpperCase()}\n\n✅ Download started!\n\nIn production, this would download the actual ${format.toUpperCase()} file.`);
  };

  const handlePreview = (reportName) => {
    alert(`👁️ Preview: "${reportName}"\n\nIn production, this would open a preview window showing the report contents.`);
  };

  const toggleSchedule = (id) => {
    setScheduledReports(scheduledReports.map(schedule => 
      schedule.id === id 
        ? { 
            ...schedule, 
            active: !schedule.active,
            nextRun: !schedule.active ? schedule.frequency.split(" at ")[0] : "Paused"
          }
        : schedule
    ));
  };

  const handleEditSchedule = (schedule) => {
    alert(`⚙️ Edit Schedule: "${schedule.name}"\n\nIn production, this would open an edit dialog to modify the schedule settings.`);
  };

  const handleCreateSchedule = () => {
    if (!scheduleForm.recipients) {
      alert("⚠️ Please enter at least one email recipient");
      return;
    }

    const selectedType = reportCategories.find(c => c.value === scheduleForm.reportType);
    const newSchedule = {
      id: scheduledReports.length + 1,
      name: `${selectedType?.title || "Report"} - Auto Generated`,
      type: selectedType?.title || scheduleForm.reportType,
      frequency: `${scheduleForm.frequency.charAt(0).toUpperCase() + scheduleForm.frequency.slice(1)} at ${scheduleForm.time}`,
      recipients: scheduleForm.recipients,
      active: true,
      lastSent: "Not sent yet",
      nextRun: "Scheduled"
    };

    setScheduledReports([...scheduledReports, newSchedule]);
    setOpenScheduleDialog(false);
    setScheduleForm({ reportType: "sales", frequency: "daily", recipients: "", time: "09:00" });
    alert(`✅ Schedule Created Successfully!\n\nReport: ${newSchedule.name}\nFrequency: ${newSchedule.frequency}\nRecipients: ${newSchedule.recipients}`);
  };

  const selectedCategoryData = reportCategories.find(c => c.id === selectedCategory);

  const getCategoryChip = (category) => {
    const cat = reportCategories.find(c => c.title === category);
    return cat ? { color: cat.color, bg: cat.bg, icon: cat.icon } : { color: "#757575", bg: "#f5f5f5", icon: "📄" };
  };

  return (
    <Box sx={{ width: "100%" }}>

      {/* ═══ HEADER ═══ */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 1 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.5px", color: "#0f172a" }}>
              Reports & Analytics
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
              Generate comprehensive reports and schedule automated deliveries
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<CalendarTodayIcon />}
            onClick={() => setOpenScheduleDialog(true)}
            sx={{ 
              bgcolor: "#1976d2", 
              boxShadow: "0 4px 12px rgba(25,118,210,0.3)",
              "&:hover": { bgcolor: "#1565c0", boxShadow: "0 6px 16px rgba(25,118,210,0.4)" }
            }}
          >
            Schedule Report
          </Button>
        </Box>
      </Box>

      {/* ═══ GENERATE NEW REPORT SECTION ═══ */}
      <Card sx={{ 
        mb: 3, 
        borderRadius: 3, 
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)", 
        border: "1px solid #f1f5f9",
        overflow: "hidden"
      }}>
        <Box sx={{ 
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          p: 2.5,
          color: "white"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <AssessmentIcon sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="h6" fontWeight={700}>Generate New Report</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Select report type, date range and filters to create a custom report
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ p: 3 }}>

          {/* REPORT TYPE SELECTION */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: "#0f172a" }}>
            1. Select Report Type
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {reportCategories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <Box
                  onClick={() => setSelectedCategory(category.id)}
                  sx={{
                    p: 2.5,
                    border: selectedCategory === category.id ? `2px solid ${category.color}` : "2px solid #e2e8f0",
                    borderRadius: 2.5,
                    bgcolor: selectedCategory === category.id ? category.bg : "white",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    height: "100%",
                    "&:hover": { 
                      borderColor: category.color, 
                      transform: "translateY(-2px)",
                      boxShadow: `0 4px 12px ${category.color}20`
                    }
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <Typography fontSize={28}>{category.icon}</Typography>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: selectedCategory === category.id ? category.color : "#0f172a" }}>
                      {category.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#64748b", fontSize: 13, mb: 1.5, lineHeight: 1.5 }}>
                    {category.description}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {category.includes.slice(0, 2).map((item, i) => (
                      <Chip 
                        key={i} 
                        label={item} 
                        size="small" 
                        sx={{ 
                          fontSize: 10, 
                          height: 20,
                          bgcolor: selectedCategory === category.id ? "rgba(255,255,255,0.9)" : "#f8fafc",
                          color: selectedCategory === category.id ? category.color : "#64748b",
                          fontWeight: 600
                        }} 
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* FILTERS */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: "#0f172a" }}>
            2. Select Date Range & Store
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Select Store</InputLabel>
                <Select
                  value={selectedStore}
                  label="Select Store"
                  onChange={(e) => setSelectedStore(e.target.value)}
                >
                  <MenuItem value="all">🏪 All Stores</MenuItem>
                  <MenuItem value="electronics">Electronics Hub</MenuItem>
                  <MenuItem value="fashion">Fashion Store</MenuItem>
                  <MenuItem value="home">Home Decor</MenuItem>
                  <MenuItem value="sports">Sports Shop</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="From Date"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="To Date"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          {/* SELECTED REPORT PREVIEW */}
          {selectedCategoryData && (
            <Alert 
              severity="info" 
              sx={{ 
                mb: 3,
                bgcolor: selectedCategoryData.bg,
                border: `1px solid ${selectedCategoryData.color}40`,
                "& .MuiAlert-icon": { color: selectedCategoryData.color }
              }}
            >
              <Typography variant="body2" fontWeight={700} sx={{ color: selectedCategoryData.color, mb: 0.5 }}>
                {selectedCategoryData.icon} {selectedCategoryData.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748b", display: "block", mb: 1 }}>
                {selectedCategoryData.description}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>Includes:</Typography>
                {selectedCategoryData.includes.map((item, i) => (
                  <Typography key={i} variant="caption" sx={{ color: selectedCategoryData.color, fontWeight: 600 }}>
                    {item}{i < selectedCategoryData.includes.length - 1 ? " •" : ""}
                  </Typography>
                ))}
              </Box>
            </Alert>
          )}

          {/* GENERATE BUTTON */}
          <Box>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleGenerate}
              disabled={generating}
              startIcon={generating ? <AutorenewIcon className="spin" /> : <AssessmentIcon />}
              sx={{ 
                py: 1.5,
                fontSize: 15,
                fontWeight: 700,
                bgcolor: selectedCategoryData?.color || "#1976d2",
                boxShadow: `0 4px 12px ${selectedCategoryData?.color}40`,
                "&:hover": { 
                  bgcolor: selectedCategoryData?.color || "#1565c0",
                  boxShadow: `0 6px 16px ${selectedCategoryData?.color}50`
                },
                "&:disabled": { bgcolor: "#cbd5e1" }
              }}
            >
              {generating ? "Generating Report..." : "Generate Report"}
            </Button>
            {generating && (
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" color="textSecondary">Processing...</Typography>
                  <Typography variant="caption" fontWeight="bold">{progress}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* ═══ RECENT REPORTS ═══ */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
            <Box>
              <Typography variant="h6" fontWeight={700} color="#0f172a">Recent Reports</Typography>
              <Typography variant="body2" color="#64748b">Download or view previously generated reports</Typography>
            </Box>
            <Chip label={`${recentReports.length} reports`} color="primary" size="small" />
          </Box>

          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #f1f5f9", borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>REPORT NAME</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>TYPE</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>GENERATED</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>SIZE</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>RECORDS</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentReports.map((report) => {
                  const chipData = getCategoryChip(report.category);
                  return (
                    <TableRow key={report.id} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Box sx={{ 
                            width: 36, 
                            height: 36, 
                            borderRadius: 2, 
                            bgcolor: chipData.bg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18
                          }}>
                            {chipData.icon}
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={600} sx={{ color: "#0f172a" }}>
                              {report.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                              By {report.generatedBy}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={report.category} 
                          size="small" 
                          sx={{ 
                            bgcolor: chipData.bg, 
                            color: chipData.color,
                            fontWeight: 600,
                            fontSize: 11
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="#64748b">{report.date}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" fontWeight={600}>{report.size}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="#64748b">{report.records}</Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="Download PDF">
                            <IconButton 
                              size="small" 
                              onClick={() => handleDownload(report.name, "pdf")}
                              sx={{ 
                                bgcolor: "#fee2e2", 
                                color: "#dc2626",
                                "&:hover": { bgcolor: "#fecaca" }
                              }}
                            >
                              <PictureAsPdfIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {report.format.includes("Excel") && (
                            <Tooltip title="Download Excel">
                              <IconButton 
                                size="small" 
                                onClick={() => handleDownload(report.name, "excel")}
                                sx={{ 
                                  bgcolor: "#dcfce7", 
                                  color: "#16a34a",
                                  "&:hover": { bgcolor: "#bbf7d0" }
                                }}
                              >
                                <TableChartIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Preview">
                            <IconButton 
                              size="small" 
                              onClick={() => handlePreview(report.name)}
                              sx={{ bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* ═══ SCHEDULED REPORTS ═══ */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
            <Box>
              <Typography variant="h6" fontWeight={700} color="#0f172a">Scheduled Reports</Typography>
              <Typography variant="body2" color="#64748b">Automated reports sent via email</Typography>
            </Box>
            <Chip 
              label={`${scheduledReports.filter(s => s.active).length} active`} 
              color="success" 
              size="small" 
            />
          </Box>

          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #f1f5f9", borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>SCHEDULE NAME</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>TYPE</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>FREQUENCY</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>RECIPIENTS</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>NEXT RUN</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#64748b", fontSize: 12 }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scheduledReports.map((schedule) => {
                  const chipData = getCategoryChip(schedule.type);
                  return (
                    <TableRow key={schedule.id} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <CalendarTodayIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                          <Box>
                            <Typography variant="body2" fontWeight={600} color="#0f172a">
                              {schedule.name}
                            </Typography>
                            <Typography variant="caption" color="#94a3b8">
                              Last sent: {schedule.lastSent}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={schedule.type} 
                          size="small"
                          sx={{ 
                            bgcolor: chipData.bg, 
                            color: chipData.color,
                            fontWeight: 600,
                            fontSize: 11
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" fontWeight={600}>{schedule.frequency}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <EmailIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
                          <Typography variant="caption" color="#64748b">
                            {schedule.recipients.split(",").length} recipient(s)
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color={schedule.active ? "#16a34a" : "#94a3b8"} fontWeight={600}>
                          {schedule.nextRun}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={schedule.active ? "Active" : "Paused"}
                          size="small"
                          color={schedule.active ? "success" : "default"}
                          sx={{ fontWeight: 600, fontSize: 11 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title={schedule.active ? "Pause schedule" : "Activate schedule"}>
                            <IconButton 
                              size="small" 
                              onClick={() => toggleSchedule(schedule.id)}
                              sx={{ 
                                bgcolor: schedule.active ? "#fee2e2" : "#dcfce7",
                                color: schedule.active ? "#dc2626" : "#16a34a",
                                "&:hover": { bgcolor: schedule.active ? "#fecaca" : "#bbf7d0" }
                              }}
                            >
                              {schedule.active ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit schedule">
                            <IconButton 
                              size="small" 
                              onClick={() => handleEditSchedule(schedule)}
                              sx={{ bgcolor: "#f1f5f9", "&:hover": { bgcolor: "#e2e8f0" } }}
                            >
                              <SettingsIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* ═══ SCHEDULE DIALOG ═══ */}
      <Dialog open={openScheduleDialog} onClose={() => setOpenScheduleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: "1px solid #f1f5f9", pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CalendarTodayIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>Schedule Automated Report</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Set up automatic report generation and email delivery to receive reports without manual effort.
          </Alert>
          <Stack spacing={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Report Type</InputLabel>
              <Select 
                label="Report Type" 
                value={scheduleForm.reportType}
                onChange={(e) => setScheduleForm({...scheduleForm, reportType: e.target.value})}
              >
                <MenuItem value="sales">📊 Sales Report</MenuItem>
                <MenuItem value="inventory">📦 Inventory Report</MenuItem>
                <MenuItem value="financial">💰 Financial Report</MenuItem>
                <MenuItem value="refunds">↩️ Refunds Analysis</MenuItem>
                <MenuItem value="customers">👥 Customer Insights</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Frequency</InputLabel>
              <Select 
                label="Frequency"
                value={scheduleForm.frequency}
                onChange={(e) => setScheduleForm({...scheduleForm, frequency: e.target.value})}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly (Monday)</MenuItem>
                <MenuItem value="monthly">Monthly (1st)</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              fullWidth 
              size="small" 
              label="Email Recipients" 
              placeholder="email@example.com, another@example.com"
              helperText="Separate multiple emails with commas"
              value={scheduleForm.recipients}
              onChange={(e) => setScheduleForm({...scheduleForm, recipients: e.target.value})}
            />
            <TextField 
              fullWidth 
              size="small" 
              label="Time" 
              type="time" 
              InputLabelProps={{ shrink: true }}
              value={scheduleForm.time}
              onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #f1f5f9", px: 3, py: 2 }}>
          <Button onClick={() => setOpenScheduleDialog(false)} sx={{ color: "#64748b" }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AutorenewIcon />}
            onClick={handleCreateSchedule}
          >
            Create Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* ═══ SPINNING ANIMATION ═══ */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </Box>
  );
}