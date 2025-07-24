import { Paper, Box } from '@mui/material';

const FinMithraAdvisor = () => {
  const externalUrl = 'https://finmitra-44844843924.asia-south1.run.app/';

  return (
    <Box>
       <Paper sx={{ width: '100%', height: '80vh', overflow: 'hidden' }}>
        <iframe
          src={externalUrl}
          title="FinMitra Application"
          style={{
            width: '100%',
            height: '100%',
            border: 0,
          }}
        />
      </Paper>
    </Box>
  );
};

export default FinMithraAdvisor;