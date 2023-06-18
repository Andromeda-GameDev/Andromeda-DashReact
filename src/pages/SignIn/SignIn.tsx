import {FC, useState, ChangeEvent, FormEvent, useEffect} from 'react';
//import { getDatabase, get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import loginImage from '../../resources/loginImage.jpg';
import { Grid, Box, Typography, TextField, Button, Link, Container, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Signin: FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, role } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        setIsLoading(true)
        e.preventDefault();
        setError('');

        try {
            await login({email: email, password: password});
        } catch (error) {
            const e = error as { code?: string; message?: string };
            if (e.code === "auth/wrong-password") {
                setError("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
            } else if (e.code === "auth/user-not-found") {
                setError("No se encuentra ningún usuario con ese correo electrónico. Por favor, verifica el correo electrónico e inténtalo de nuevo.");
            } else if (e.code === "auth/invalid-email") {
                setError("Correo electrónico no válido. Por favor, verifica el correo electrónico e inténtalo de nuevo.");
            } else {
                setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
            }
        }

        setIsLoading(false)
    }

    useEffect(() => {
        if (role === 'professor') {
            navigate('/professor');
        } else if (role === 'student') {
            navigate('/student');
        }
    }, [role, navigate]);


    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Box
                    sx={{
                        height: '100vh',
                        display: { xs: 'none', sm: 'block' },
                        backgroundImage: `url(${loginImage})`,
                        backgroundSize: 'cover'
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{ textAlign: 'center'}}>
                        <Typography variant="h3" align="center" paddingBottom={10} color={'#000000'}
                            sx={{
                                fontWeight: 'bold',
                                fontFamily: 'Trebuchet MS',
                                fontStyle: 'normal',
                                fontSize: '40px',
                                lineHeight: '47px',
                                letterSpacing: '0.25px',
                                color: '#000000'
                                }}
                        >
                            Bienvenido a Andromeda
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            Iniciar sesión
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            ¿No tienes una cuenta? 
                            <Link to='/signup' component={RouterLink}> Regístrate </Link>
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField 
                            label="Correo Electrónico"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                            type="email"
                        />
                        <TextField 
                            label="Contraseña"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                            type="password"
                        />
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Button variant="contained" type="submit" onClick={handleSubmit}>
                                {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                            </Button>
                        </Box>
                    </Box>
                    <Box mt={2} sx={{ textAlign: 'center' }}>
                        <Link to='/forgot-password' component={RouterLink}>
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </Box>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </Container>
            </Grid>
        </Grid>
    );
};

export default Signin;
