import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from '@mui/material';
import './login.css';
import { loginUser } from "../services/Api";
import Container from "@mui/material/Container";

export const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const res = await loginUser({
            email,
            password,
        });

        if (res?.accessToken) {
            localStorage.setItem("token", res.accessToken);
            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("userName", res.user.firstName+' '+res.user.lastName);
            navigate("/");
        }
        } catch (error) {
            console.log(error);
            setFormErrors(error);
        }
    }

    return (
        <>
            <Container>
                <h3 className="page-title">Login</h3>
                <Grid>
                    <form onSubmit={ handleSubmit }>
                        <div className="fieldBox">
                            <TextField
                                label="email" 
                                value={ email } 
                                type="text" 
                                onChange={ handleEmail }
                                sx={{ width: 400 }}
                            />
                        </div>
                        <div className="fieldBox">
                            <TextField
                                label="password" 
                                value={ password } 
                                type="password" 
                                onChange={ handlePassword }
                                sx={{ width: 400 }}
                            />
                        </div>
                        {formErrors && <div className="form-error">{ formErrors.message }</div>}
                        <Button type="submit" variant="contained" color="primary" disabled={!email || !password}>Login</Button>
                    </form>
                    <Link to="/register" className="custom-link auth">Register</Link>
                </Grid>
            </Container>
        </>
    )
}

export default Login;