import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DownloadIcon from '@mui/icons-material/Download';
import ChatIcon from '@mui/icons-material/Chat';
import { useAuth } from '@/hooks/useAuth';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Expenses', path: '/expenses', icon: <ReceiptLongIcon /> },
  { text: 'Calendar', path: '/calendar', icon: <CalendarMonthIcon /> },
  { text: 'Chat', path: '/chat', icon: <ChatIcon /> },
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