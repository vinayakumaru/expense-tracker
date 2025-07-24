import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DownloadIcon from '@mui/icons-material/Download';
import ChatIcon from '@mui/icons-material/Chat';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import { useAuth } from '@/hooks/useAuth';

const drawerWidth = 240;

const navItems = [
  { text: 'FinAnalyser', path: '/dashboard', icon: <DashboardIcon /> },
  { text: 'FinTrack', path: '/expenses', icon: <ReceiptLongIcon /> },
  { text: 'Calendar', path: '/calendar', icon: <CalendarMonthIcon /> },
  { text: 'SchemeSeva', path: '/schemes', icon: <AutoAwesome /> },
  { text: 'Chat', path: '/chat', icon: <ChatIcon /> },
  { text: 'Learn & Grow', path: '/fin-mithra-advisor', icon: <AutoAwesome /> },
  { text: 'Export', path: '/export', icon: <DownloadIcon /> },
];

export default function AppDrawer() {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthed) {
    return null;
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname.startsWith(item.path)}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}