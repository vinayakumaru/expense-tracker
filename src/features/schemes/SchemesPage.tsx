import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Grid,
  CircularProgress,
  TablePagination,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useExpenses } from '@/hooks/useExpenses';
import SavingsIcon from '@mui/icons-material/Savings';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ElderlyIcon from '@mui/icons-material/Elderly';
import WomanIcon from '@mui/icons-material/Woman';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const allSchemes = [
    {
        scheme: 'Sukanya Samriddhi Yojana (SSY)',
        age: '0-10 years (account opened for girl child)',
        min: 'Rs. 250',
        max: 'Rs. 1.5 lakh',
        interest: '8.2% (compounded annually, Q2 FY 2025-26)',
        min_amount: 250,
        icon: <WomanIcon />,
        color: 'primary.main',
    },
    {
        scheme: 'Post Office Monthly Income Scheme (POMIS)',
        age: '10 years and above (minors through guardian)',
        min: 'Rs. 1,000',
        max: 'Rs. 9 lakh (single) or Rs. 15 lakh (joint)',
        interest: '7.4% (payable monthly)',
        min_amount: 1000,
        icon: <AccountBalanceWalletIcon />,
        color: 'success.main',
    },
    {
        scheme: 'Post Office Public Provident Fund (PPF)',
        age: 'No age limit (minors through guardian)',
        min: 'Rs. 500',
        max: 'Rs. 1.5 lakh',
        interest: '7.1% (compounded annually)',
        min_amount: 500,
        icon: <SavingsIcon />,
        color: 'info.main',
    },
    {
        scheme: 'Mahila Samman Savings Certificate',
        age: 'Women above 18 years or guardians for minor girls',
        min: 'Rs. 1,000',
        max: 'Rs. 2 lakh',
        interest: '7.5% (compounded quarterly; discontinued after March 31, 2025)',
        min_amount: 1000,
        icon: <WomanIcon />,
        color: 'secondary.main',
    },
    {
        scheme: 'Pradhan Mantri Vaya Vandana Yojana (PMVVY)',
        age: '60 years and above',
        min: 'Rs. 1,000',
        max: 'Rs. 15 lakh (max purchase price)',
        interest: '7.4% (assured pension rate, payable monthly)',
        min_amount: 1000,
        icon: <ElderlyIcon />,
        color: 'error.main',
    },
    {
        scheme: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
        age: 'No specific age limit (covers eligible families)',
        min: 'Not applicable',
        max: 'Rs. 5 lakh per family (health coverage per year)',
        interest: 'Not applicable (provides health insurance, no interest)',
        min_amount: 0,
        icon: <HealthAndSafetyIcon />,
        color: 'success.light',
    },
    {
        scheme: 'Senior Citizens Savings Scheme (SCSS)',
        age: '60 years and above (or 55+ for voluntary retirees)',
        min: 'Rs. 1,000',
        max: 'Rs. 30 lakh',
        interest: '8.2% (compounded quarterly)',
        min_amount: 1000,
        icon: <ElderlyIcon />,
        color: 'warning.main',
    },
    {
        scheme: 'Kisan Vikas Patra (KVP)',
        age: 'No age limit (adults; minors through guardian)',
        min: 'Rs. 1,000',
        max: 'No maximum limit',
        interest: '7.5% (compounded annually, matures in 115 months)',
        min_amount: 1000,
        icon: <SavingsIcon />,
        color: 'primary.light',
    },
    {
        scheme: 'National Savings Certificate (NSC)',
        age: 'No age limit (adults; minors through guardian)',
        min: 'Rs. 1,000',
        max: 'No maximum limit',
        interest: '7.7% (compounded annually)',
        min_amount: 1000,
        icon: <SavingsIcon />,
        color: 'info.dark',
    },
    {
        scheme: 'Atal Pension Yojana (APY)',
        age: '18-40 years',
        min: 'Varies by pension amount (e.g., Rs. 42/month for Rs. 1,000 pension)',
        max: 'Varies by pension amount (up to Rs. 5,000/month pension)',
        interest: 'Not applicable (guaranteed pension; returns around 8%)',
        min_amount: 42,
        icon: <SavingsIcon />,
        color: 'secondary.dark',
    },
    {
        scheme: 'National Pension Scheme (NPS)',
        age: '18-70 years',
        min: 'Rs. 500 (Tier I) or Rs. 1,000 (Tier II)',
        max: 'No maximum limit',
        interest: '9-15% (market-linked, varies by fund performance)',
        min_amount: 500,
        icon: <SavingsIcon />,
        color: 'primary.dark',
    },
];


const SchemeCard = ({ scheme }: { scheme: typeof allSchemes[0] }) => (
    <Card elevation={2} sx={{ height: '100%' }}>
        <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
                <Box sx={{ color: scheme.color, mr: 2 }}>
                    {React.cloneElement(scheme.icon, { sx: { fontSize: 40 } })}
                </Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {scheme.scheme}
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
                <strong>Age:</strong> {scheme.age}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
                <strong>Investment:</strong> {scheme.min} - {scheme.max}
            </Typography>
            <Box sx={{flexGrow: 1}}/>
            <Chip label={scheme.interest} color="primary" sx={{ mt: 1, height: 'auto', '& .MuiChip-label': { whiteSpace: 'normal' } }} />
        </CardContent>
    </Card>
);

export default function SchemesPage() {
    const { data: expenses, isLoading, isError } = useExpenses();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { recommendedSchemes, otherSchemes, totalWalletAmount } = useMemo(() => {
        if (!expenses) {
            return { recommendedSchemes: [], otherSchemes: allSchemes, totalWalletAmount: 0 };
        }

        const totalWalletAmount = expenses.reduce((acc, e) => acc + (e.savingsAmount || 0), 0);
        const suitableSchemes = allSchemes.filter(scheme => totalWalletAmount >= scheme.min_amount);
        const recommendedSchemes = suitableSchemes.slice(0, 3);
        const recommendedSchemeNames = new Set(recommendedSchemes.map(s => s.scheme));
        const otherSchemes = allSchemes.filter(s => !recommendedSchemeNames.has(s.scheme));
        return { recommendedSchemes, otherSchemes, totalWalletAmount };

    }, [expenses]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (isLoading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
    if (isError) return <Typography color="error">Failed to load schemes.</Typography>;


    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                SchemeSeva - Government Schemes
            </Typography>
            <Typography variant="h6" gutterBottom>
                Your Total Wallet Amount: ₹{totalWalletAmount.toFixed(2)}
            </Typography>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>Recommended for you</Typography>
                <Grid container spacing={3}>
                    {recommendedSchemes.map((scheme) => (
                        <Grid item xs={12} md={4} key={scheme.scheme}>
                            <SchemeCard scheme={scheme} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>All Other Schemes</Typography>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Scheme</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Min/Year</TableCell>
                                    <TableCell>Max/Year</TableCell>
                                    <TableCell>Interest/Year</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {otherSchemes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.scheme}>
                                        <TableCell>{row.scheme}</TableCell>
                                        <TableCell>{row.age}</TableCell>
                                        <TableCell>{row.min}</TableCell>
                                        <TableCell>{row.max}</TableCell>
                                        <TableCell>{row.interest || 'N/A'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={otherSchemes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Box>
    );
}