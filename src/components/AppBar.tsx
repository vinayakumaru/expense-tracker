import { AppBar as MuiAppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import { useColorModeTheme } from '@/theme';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function AppBar() {
  const { mode, toggle } = useColorModeTheme();
  const { isAuthed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  // const logo = require('../../src/FinMitraLogo.png');

  return (
    <MuiAppBar 
      position="fixed" 
      elevation={1} 
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FinMitra
        </Typography>
        {/* <img src={logo} alt ="" height="10" width="10" /> */}
        <IconButton color="inherit" onClick={toggle}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {isAuthed && (
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}