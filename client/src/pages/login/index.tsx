import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Paper, TextField, Typography, Button, Switch, FormControlLabel, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { login, registerUser, sendForgotPasswordEmail } from "../../api/fetch";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [registerChoice, setRegisterChoice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [email, setEmail] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [registerErrors, setRegisterErrors] = useState({ registerEmail: '', registerPassword: '', confirmPassword: '' });
  const [modalOpen, setModalOpen] = useState(false); 
  const [forgotEmail, setForgotEmail] = useState('');
  const [valid, setValid] = useState(true);
  const theme = useTheme();
  const showToast = useToast();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRegisterPassword = () => setShowRegisterPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNotification(event.target.checked);
  };

  const handleToggle = () => {
    setRegisterChoice(!registerChoice);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setForgotEmail('');
  };

  const handleForgotPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!forgotEmail) return showToast('E-mail is required!', 'error');
    if(!emailRegex.test(forgotEmail)) return showToast('Provide a valid e-mail!', 'error');

    try {
      const response = await sendForgotPasswordEmail(forgotEmail);
      if(response.error) return showToast(response.error, 'error');
      
      showToast('Recovery e-mail send!', 'success');
      handleCloseModal();
    } catch (error) {
      showToast(error as string, 'error');
    }
  };

  const clear = () => {
    setValid(false);
    setPassword('');
    setRegisterPassword('');
    setEmail('');
    setRegisterEmail('');
    setErrors({ email: '', password: '' });
    setRegisterErrors({ registerEmail: '', registerPassword: '', confirmPassword: '' });
  }

  useEffect(() => {
    clear();
  }, [registerChoice]);

  const validateLogin = () => {
    const newErrors = { email: '', password: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'E-mail is required!';
      setValid(false);
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Provide a valid e-mail!';
      setValid(false);
    }

    if (!password) {
      newErrors.password = 'Password is required!';
      setValid(false);
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      setValid(false);
    }

    setErrors(newErrors);
    setValid(true)
    return valid;
  }

  const validateRegister = () => {
    const newErrors = { registerEmail: '', registerPassword: '', confirmPassword: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!registerEmail) {
      newErrors.registerEmail = 'E-mail is required!';
      setValid(false);
    } else if (!emailRegex.test(registerEmail)) {
      newErrors.registerEmail = 'Provide a valid e-mail!';
      setValid(false);
    }

    if (!registerPassword) {
      newErrors.registerPassword = 'Password is required!';
      setValid(false);
    } else if (registerPassword.length < 6) {
      newErrors.registerPassword = 'Password must be at least 6 characters';
      setValid(false);
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
      setValid(false);
    } else if (confirmPassword !== registerPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      setValid(false);
    }

    setRegisterErrors(newErrors);
    setValid(true)
    return valid;
  }

  const handleLogin = async () => {    
    if(!validateLogin()) return

    try {
      const response = await login(email, password);
      if(response.error) return showToast(response.error, 'error');

      navigate('/chat');
    } catch (error) {
      showToast(error as string, 'error');
    }
  }

  const handleRegister = async () => {
    if(!validateRegister()) return

    try {
      const response = await registerUser(registerEmail, registerPassword);
      if (response.error) return showToast(response.error, 'error');

      showToast('Account created!', 'success');
      setRegisterChoice(false);
    } catch (error) {
      showToast(error as string, 'error');
    }
  }

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
        border: theme.borders.secondary,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Container Login */}
        <Box sx={{ 
          width: '50%',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '2rem',
          ...(registerChoice ? {
              transition: 'transform 1s ease-in-out , opacity 0.5s ease-in-out',
              transform: 'translateX(100%)',
              opacity: 0,
              zIndex: 0,
            }
            :
            {
              transition: 'transform 1s ease-in-out , opacity 1.6s ease-in',
              transform: 'translateX(0)',
              opacity: 1,
              zIndex: 1
            }
            )
        }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '28px', fontWeight: '400' }}>
            Welcome to 
            <Box component="span" className="text-gradient" sx={{ 
              fontSize: '32px', 
              fontWeight: '600', 
              color: 'pink', 
              paddingLeft: 1, 
              paddingRight: 1,
            }}>
              DeepSearchAI
            </Box>
              <img style={{ transform: 'translateY(3px)'}} src="./src/assets/icons/logo.svg"/>
          </Typography>
          <Box sx={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '30rem'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}>
              
              <FormControl variant="outlined" sx={{ position: 'relative'}}>
                <TextField 
                  label="Email" 
                  variant="outlined"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && 
                  <span style={{
                    color: theme.palette.error.main ,
                    fontSize: '14px',
                    position: 'absolute',
                    left: 0,
                    bottom: '-20px'
                  }}>
                    {errors.email}
                  </span>
                }
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={ showPassword ? 'text' : 'password' }
                  value={ password }
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.password && 
                  <span style={{
                    color: theme.palette.error.main ,
                    fontSize: '14px',
                    position: 'absolute',
                    left: 0,
                    bottom: '-20px'
                  }}>
                    {errors.password}
                  </span>
                }
              </FormControl>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: '0.7rem' 
            }}>
              <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, cursor: 'pointer' }} onClick={handleOpenModal}>
                Forgot your password?
              </Typography>
              <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, cursor: 'pointer' }} onClick={handleToggle}>
                Create account
              </Typography>
            </Box>
          </Box>
          {/* Modal de Esqueci a Senha */}
          <Dialog open={modalOpen} onClose={handleCloseModal}>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleForgotPassword} color="primary">
                Enviar
              </Button>
            </DialogActions>
          </Dialog>
          <Box>
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
              size="large" sx={{ background: theme.palette.gradients.text }} 
              onClick={handleLogin}
            >
              LOG IN
            </Button>
            <Typography sx={{alignSelf: 'center'}}>or</Typography>
            <Button variant="outlined" size="large" sx={{ border: theme.borders.primary }}>CONTINUE WITH GOOGLE</Button>
          </Box>
        </Box>


        {/* Container Image */}
        <Box sx={{
            zIndex: 30,
            position: 'absolute',
            top: 0,
            left: registerChoice ? 0 : '50%',
            width: '50%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'left 0.7s ease-in-out',
            overflow: 'hidden',
            backgroundImage: 'url(./src/assets/icons/banner.svg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}/>
            
        {/* Form register */}
        <Box sx={{ 
              width: '50%',
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: '2rem',
              ...(!registerChoice ? {
                  transform: 'translateX(-100%)',
                  zIndex: 0,
                  opacity: 0,
                  transition: 'transform 1s ease-in-out , opacity 0.5s ease-in-out',
                }
                :
                {
                  transition: 'transform 0.8s ease-in-out , opacity 1.6s ease-in',
                  transform: 'translateX(0)',
                  zIndex: 1,
                  opacity: 1
                }
              )
            }}
            >
              <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontSize: '28px', fontWeight: '400' }}>
                Welcome to 
                <Box component="span" className="text-gradient" sx={{ 
                  fontSize: '32px', 
                  fontWeight: '600', 
                  color: 'pink', 
                  paddingLeft: 1, 
                  paddingRight: 1,
                }}>
                  DeepSearchAI
                </Box>
                  <img style={{ transform: 'translateY(3px)'}} src="./src/assets/icons/logo.svg"/>
              </Typography>
              <Box sx={{
                width: '90%',
                maxWidth: '30rem',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                }}>
                  <FormControl variant="outlined">
                    <TextField 
                      label="Email" 
                      variant="outlined"
                      value={registerEmail} 
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      sx={{position: 'relative'}}
                    />                   
                    {registerErrors.registerEmail && 
                          <span style={{
                            color: theme.palette.error.main ,
                            fontSize: '14px', 
                            position: 'absolute',
                            left: 0,
                            bottom: '-20px' 
                          }}>
                            {registerErrors.registerEmail}
                          </span>
                      } 
                  </FormControl>
                  <FormControl variant="outlined" sx={{ position: 'relative'}}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showRegisterPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowRegisterPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showRegisterPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                      {registerErrors.registerPassword && 
                        <span style={{
                          color: theme.palette.error.main ,
                          fontSize: '14px',
                          position: 'absolute',
                          left: 0,
                          bottom: '-20px'
                        }}>
                          {registerErrors.registerPassword}
                        </span>
                      }
                  </FormControl>
                  <FormControl variant="outlined" sx={{position: 'relative'}}>
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                    {registerErrors.confirmPassword && 
                        <span style={{
                          color: theme.palette.error.main ,
                          fontSize: '14px',
                          position: 'absolute',
                          left: 0,
                          bottom: '-20px'
                        }}>
                          {registerErrors.confirmPassword}
                        </span>
                      }
                  </FormControl>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  maxWidth: '30rem',
                  pt: '0.6rem'
                }}>
                  <Typography variant="subtitle2"  sx={{ cursor: 'pointer' }}>
                    <FormControlLabel 
                      control={
                        <Switch
                          size={'medium'} 
                          onChange={handleSwitchChange}
                          checked={emailNotification}
                        />
                      } 
                      label="E-mail notification" 
                      labelPlacement="start" 
                      sx={{ 
                        margin: 0,
                    
                      }}
                      slotProps ={{
                        typography: {
                          sx: {
                            fontSize: '14px', 
                            color: '#303030', 
                          },
                      }}}
                    />
                  </Typography>
                  <Typography variant="subtitle2" sx={{ cursor: 'pointer' }}>
                    Privacy Police
                  </Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary }}>Already has account?
                  <Button 
                  onClick={handleToggle}
                  variant="text" 
                  size="small" 
                  className="text-gradient" 
                  sx={{ fontWeight: 600, fontSize: '14px' }}>
                    LOG IN
                  </Button>
                </Typography>
              </Box>
              <Box sx={{
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                maxWidth: '30rem'
              }}>
                <Button 
                  onClick={handleRegister}
                  variant="contained" 
                  size="large" 
                  sx={{ background: theme.palette.gradients.text }}
                >
                  SIGN UP
                </Button>
                <Typography sx={{alignSelf: 'center'}}>or</Typography>
                <Button variant="outlined" size="large" sx={{ border: theme.borders.primary }}>SIGN UP WITH GOOGLE</Button>
              </Box>
            </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
