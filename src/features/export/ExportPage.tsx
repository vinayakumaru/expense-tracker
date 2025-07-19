import { Box, Typography, Button, Paper, Stack, CircularProgress } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useExpenses } from '@/hooks/useExpenses';
import { exportCSV, exportPDF } from '../expenses/utils/csvPdfExport';

export default function ExportPage() {
  const { data: expenses, isLoading, isError } = useExpenses();

  const handleExportCSV = () => {
    if (expenses) {
      exportCSV(expenses);
    }
  };

  const handleExportPDF = () => {
    if (expenses) {
      exportPDF(expenses);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Export Data</Typography>
      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>Download Your Expenses</Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Export all your recorded expense data as a CSV or PDF file.
        </Typography>
        {isLoading && <CircularProgress />}
        {isError && <Typography color="error">Cannot export data due to a loading error.</Typography>}
        {!isLoading && !isError && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportCSV}
              disabled={!expenses || expenses.length === 0}
            >
              Export to CSV
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PictureAsPdfIcon />}
              onClick={handleExportPDF}
              disabled={!expenses || expenses.length === 0}
            >
              Export to PDF
            </Button>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}