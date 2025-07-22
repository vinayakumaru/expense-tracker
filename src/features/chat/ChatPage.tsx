import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import { useChat } from '@/hooks/useChat';
import ResponseDisplay from './components/ResponseDisplay';

export default function ChatPage() {
  const [query, setQuery] = useState('');
  const chat = useChat();

  const handleSend = () => {
    if (query.trim()) {
      chat.mutate({ query });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Chat with Your Expenses
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Ask a question about your spending</Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          For example: &quot;What are my top 5 expenses this month?&quot; or &quot;How much did I spend on food last week?&quot;
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={chat.isPending}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={chat.isPending || !query.trim()}
          >
            {chat.isPending ? <CircularProgress size={24} /> : 'Send'}
          </Button>
        </Box>
      </Paper>

      {chat.isSuccess && chat.data && (
        <ResponseDisplay response={chat.data} />
      )}
      {chat.isError && (
        <Typography color="error">
          Failed to get a response. Please try again.
        </Typography>
      )}
    </Box>
  );
}