import { Card, CardContent, Typography, Box } from '@mui/material';
import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color?: string;
}

export default function SummaryCard({ title, value, icon, color = 'primary.main' }: SummaryCardProps) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color }}>
            {React.cloneElement(icon, { sx: { fontSize: 40 }})}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}