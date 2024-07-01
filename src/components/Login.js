import { Box, Button, FormControl, FormLabel, Heading, Input, Stack} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleRegister = () => {
        navigate("/register")
    }

    const handleLogin = async (e) => {
        e.preventDefault();
            
        try {
            const token = await UserService.login(username, password)
            localStorage.setItem('token', token);
            console.log(token)

        } catch (error) {
            console.log("Login Failed")
        }
    };

    return (
        <Box w="100%" maxW="md" p={4} m="auto" mt={10} pt="150">
            <Heading as="h2" size="xl" textAlign="center" mb={6}>
                Login
            </Heading>
            <form onSubmit={handleLogin}>
                <Stack spacing={4}>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
                        Log In
                    </Button>
                    <Button onClick={handleRegister} colorScheme="gray" size="lg" fontSize="md">
                        Register
                    </Button>
                </Stack>
            </form>
        </Box>

    );
};

export default Login;