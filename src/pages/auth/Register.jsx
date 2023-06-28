import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from '@mui/material';

export const Register = () => {
    const [formRegData, setFormRegData] = useState({
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        repeatPassword: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormRegData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validateForm();
        setFormErrors(errors);

        if (!Object.keys(errors).length) {
            try {
                const res = await registerUser(formRegData);
                if (res?.accessToken) {
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Form is invalid");
        }
    }

    const validateForm = () => {
        const errors = {};
    
        if (formRegData.userName.trim() === "") {
            errors.userName = "Username is REQUIRED!!!";
        } else if(formRegData.userName.length < 3 || formRegData.userName.length > 12){
            errors.userName = "Username must be minimum of 3 characters and maximum of 12 characters!!!";
        }
        if (formRegData.firstName.trim() === "") {
          errors.firstName = "First name is REQUIRED!!!";
        }
        if (formRegData.lastName.trim() === "") {
          errors.lastName = "Last name is REQUIRED!!!";
        }
        if (formRegData.phone.trim() === "") {
            errors.phone = "Phone number is REQUIRED!!!";
        } else if(!isValidPhone(formRegData.phone)){
            errors.phone = "Phone number must contain only numbers!!!";
        }
        if (formRegData.email.trim() === "") {
          errors.email = "Email is REQUIRED!!!";
        } else if (!isValidEmail(formRegData.email)) {
          errors.email = "Email is INVALID!!!";
        }
        if (formRegData.password.trim() === "") {
            errors.password = "Password is REQUIRED!!!";
        } else if (!isValidPassword(formRegData.password)) {
            errors.password = "Password must contain at least one uppercase letter, number, minimum 6 characters, maximum 20 characters!!!";
          }
        if (formRegData.repeatPassword.trim() === "") {
            errors.repeatPassword = "Repeat password is REQUIRED!!!";
        }
        if (formRegData.repeatPassword.trim() !== formRegData.password.trim()) {
            errors.repeatPassword = "Password isn't equal Repeat password!!!";
        }
      
        return errors;
    };
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^[0-9\b]+$/;
        return phoneRegex.test(phone);
    }

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.\d)(?=.*[A-Z]).{6,20}$/;
        return passwordRegex.test(password);
    }

    return (
        <>
        <h2 className="page-title">Register</h2>
        <Grid>
            <form onSubmit={ handleSubmit }>
                <div className="fieldBox">
                    <TextField 
                        label="username" 
                        name="userName" 
                        value={ formRegData.userName } 
                        type="text" 
                        onChange={ handleChange }
                        error={formErrors.userName} 
                        helperText={formErrors.userName}
                        sx={{ width: 400 }}
                    />
                </div>
                <div className="fieldBox">
                    <TextField 
                        label="email" 
                        name="email" 
                        value={ formRegData.email } 
                        type="text" 
                        onChange={ handleChange }
                        error={formErrors.email} 
                        helperText={formErrors.email}
                        sx={{ width: 400 }}
                    />
                </div>
                <div className="fieldBox">
                    <TextField 
                        label="firstname" 
                        name="firstName" 
                        value={ formRegData.firstName } 
                        type="text" 
                        onChange={ handleChange } 
                        error={formErrors.firstName} 
                        helperText={formErrors.firstName}
                        sx={{ width: 400 }}
                    />
                </div>
                <div className="fieldBox">
                    <TextField 
                        label="lastname" 
                        name="lastName" 
                        value={ formRegData.lastName } 
                        type="text" 
                        onChange={ handleChange } 
                        error={formErrors.lastName} 
                        helperText={formErrors.lastName}
                        sx={{ width: 400 }}
                    />
                </div>
                <div className="fieldBox">
                    <TextField 
                        label="phone number" 
                        name="phone" 
                        value={ formRegData.phone } 
                        type="text" 
                        onChange={ handleChange } 
                        error={formErrors.phone} 
                        helperText={formErrors.phone}
                        sx={{ width: 400 }}
                    />
                </div>
                <div className="fieldBox">
                    <TextField 
                        label="password" 
                        name="password" 
                        value={ formRegData.password } 
                        type="password" 
                        onChange={ handleChange } 
                        error={formErrors.password} 
                        helperText={formErrors.password}
                        sx={{ width: 400 }}
                    />
                </div>
                <div className="fieldBox">
                    <TextField 
                        label="repeat password" 
                        name="repeatPassword" 
                        value={ formRegData.repeatPassword } 
                        type="password" 
                        onChange={ handleChange } 
                        error={formErrors.repeatPassword} 
                        helperText={formErrors.repeatPassword}
                        sx={{ width: 400 }}
                    />
                </div>
                {formErrors.length > 0 && <div className="form-error">{ formErrors }</div>}
                <Button type="submit" variant="contained" color="primary">Register</Button>
            </form>
            <Link to="/login" className="custom-link auth">Login</Link>
        </Grid>
    </>

    )
}

export default Register;