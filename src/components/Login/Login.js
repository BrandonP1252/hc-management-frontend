import { Box, Button, FormControl, FormLabel, Heading, Input, Stack} from '@chakra-ui/react';
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed!');
            }

            const data = await response.json();
            console.log(data); // handle the response, e.g., save the token
        } catch (error) {
            console.error('There was an error logging in!', error);
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
                </Stack>
            </form>
        </Box>

    );
};

export default Login;