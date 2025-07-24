import { Paper, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChatResponse } from '@/types/chat';

interface ResponseDisplayProps {
  response: ChatResponse;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  const renderChart = () => {
    if (!response.data || response.data.length === 0) {
      return null;
    }

    if (response.graphType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={response.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {response.data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    // Default to BarChart
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={response.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="body1" whiteSpace="pre-wrap" mb={4}>
        {response.text}
      </Typography>
      {response.data && response.data.length > 0 && (
        <Box sx={{ height: 300 }}>
          {renderChart()}
        </Box>
      )}
    </Paper>
  );
}