import { Paper, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChatResponse } from '@/types/chat';

interface ResponseDisplayProps {
  response: ChatResponse;
}

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="body1" whiteSpace="pre-wrap" mb={4}>
        {response.text}
      </Typography>
      {response.data && response.data.length > 0 && (
        <Box sx={{ height: 300 }}>
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
        </Box>
      )}
    </Paper>
  );
}