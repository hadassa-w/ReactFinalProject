import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

interface RegisterProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function Register({ setIsLoggedIn }: RegisterProps) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [tz, setTz] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        const requestData = {
            UserName: username,
            Password: password,
            Name: name,
            Phone: phone,
            Email: email,
            Tz: tz
        };

        try {
            console.log("Sending registration request with:", requestData);
            const response = await axios.post("http://localhost:8080/api/user/sighin", requestData);
            console.log("Received response:", response);
            if (response.status === 200) {
                console.log("Registration successful:", response.data);
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', response.data.id);
                navigate('/home');
            } else {
                console.log("Registration failed with status:", response.status);
                setError("Registration failed. Please check your details.");
            }
        } catch (error) {
            console.error("Error registering:", error);
            setError("The username or password is incorrect. Try again.");
        }
    };

    const handleLogoClick = () => {
        navigate('/logIn'); // ניתוב לעמוד LogIn
    };

    return (
        <Box sx={{ mt: 8, mx: 'auto', maxWidth: 400 }}>
            <h2>Hello for you! 🎉</h2>
            <Button variant="contained" style={{ textTransform: 'none', backgroundColor: "red" }} onClick={handleLogoClick}>
                You are registered? Click here to login.
            </Button>
            <h5>For register, please enter your details.</h5>
            {error && <Typography color="error">{error}</Typography>}
            <div>
                <TextField label="User name" required fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <TextField label="Password" required fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <TextField label="Name" required fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <TextField label="Phone" required fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
                <TextField label="Email" required fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <TextField label="Tz" required fullWidth margin="normal" value={tz} onChange={(e) => setTz(e.target.value)} />
            </div>
            <div>
                <Button variant="contained" style={{ textTransform: 'none', backgroundColor: "orange" }} onClick={handleRegister}>Register</Button>
            </div>
        </Box>
    );
}

export default Register;