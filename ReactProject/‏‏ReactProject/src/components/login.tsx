import { Button, TextField, Box, Typography, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/style.css";

interface LoginrProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function LogIn({ setIsLoggedIn }: LoginrProps) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const requestData = {
            UserName: username,
            Password: password,

        };

        try {
            console.log("Sending login request with:", { username, password });
            const response = await axios.post("http://localhost:8080/api/user/login", requestData);

            console.log("Received response:", response);
            if (response.status === 200) {
                const user = response.data;
                console.log("Login successful:", user);
                setIsLoggedIn(true); // שינוי מצב ההתחברות
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', user.id); // שמירת מזהה המשתמש ב-localStorage
                navigate("/home"); // ניתוב לדף הבית לאחר התחברות מוצלחת
            } else {
                console.log("Login failed with status:", response.status);
                setError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("The username or password is incorrect. Try again.");
        }
    };

    const handleRegister = () => {
        navigate("/register"); // ניתוב לדף ההרשמה
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ mt: 8, mx: 'auto', maxWidth: 400 }}>
            <h2>Hello for you! 🎉</h2>
            <Button variant="contained" style={{ textTransform: 'none', backgroundColor: "red" }} onClick={handleRegister}>
                Not registered? Click here to register.
            </Button>
            <h5>For log in, please enter your details.</h5>
            <div className="fields">
                <TextField
                    label="User name"
                    required
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="fields">
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    required
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            {error && <Typography color="error">{error}</Typography>}
            <div className="fields">
                <Button variant="contained" style={{ textTransform: 'none', backgroundColor: "orange" }} onClick={handleLogin}>Sign in</Button>
            </div>
        </Box>
    );
}

export default LogIn;