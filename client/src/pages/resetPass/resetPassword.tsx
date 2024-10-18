import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Paper, Typography, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import useToast from "../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/fetch";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const theme = useTheme();
  const showToast = useToast();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const { token } = useParams(); 
  const validateForm = () => {
    const newErrors = { password: '', confirmPassword: '' };

    if (!password) {
      newErrors.password = 'Password is required!';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    try {
      const response = await resetPassword(password, token as string);
      if(response.error) return showToast(response.error, 'error');

      showToast('Password successfully reset!', 'success');
      navigate('/'); 
    } catch (error) {
      showToast(error as string, 'error');
    }
  };

  return (
    <Box sx={{
      width: '100%',
      px: '2rem',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff'
    }}>
      <Paper elevation={2} sx={{
        width: '90%',
        height: '90%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        position: 'relative',
        overflow: 'hidden',
      }}>
        
        {/* Container Image */}
        <Box sx={{
          zIndex: 30,
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundImage: 'url(../src/assets/icons/banner.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}/>

        {/* Container Form */}
        <Box sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '28px', fontWeight: '400' }}>
            Reset Your Password
          </Typography>
          <Box sx={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '30rem'
          }}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
              {errors.password &&
                <span style={{
                  color: theme.palette.error.main,
                  fontSize: '14px',
                }}>
                  {errors.password}
                </span>
              }
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              {errors.confirmPassword &&
                <span style={{
                  color: theme.palette.error.main,
                  fontSize: '14px',
                }}>
                  {errors.confirmPassword}
                </span>
              }
            </FormControl>
          </Box>
          <Box sx={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            maxWidth: '30rem'
          }}>
            <Button
              variant="contained"
              size="large"
              sx={{ background: theme.palette.gradients.text }}
              onClick={handleResetPassword}
            >
              RESET PASSWORD
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
