import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useColorModeValue, Heading, Stack} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthInfo from '../utils/AuthInfo';
import { jwtDecode } from 'jwt-decode';


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/authenticate", {username, password},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            localStorage.setItem("token", JSON.stringify(response.data))
            
            navigate("/admin/manager")

        }
        catch (error) {
            console.log(error)
        }
    }

    const handleRegister = () => {
        navigate("/register")
    }


    const formBackground = useColorModeValue('white', 'gray.700');
    const formShadow = useColorModeValue('md', 'dark-lg');

    return (
        <Box w="100vw" minH="100vh" bg="#B4D1DE" display="flex" justifyContent="center" alignItems="center">
            <Box w="100%" maxW="600px" mx="auto" mt="100px" p="100" borderWidth="1px" borderRadius="lg" boxShadow={formShadow} bg={formBackground}>
                <Heading as="h1" size="xl" textAlign="center" mb="6">
                    Login
                </Heading>
                <form onSubmit={handleLogin}>
                    <VStack spacing={10}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            focusBorderColor="teal.400"
                            />
                        </FormControl>

                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            focusBorderColor="teal.400"
                            />
                        </FormControl>

                        <Stack spacing={4} width="full">
                            <Button type="submit" colorScheme="teal" width="full">
                                Login
                            </Button>

                            <Button bg="gray.600" color="white" _hover={{ bg: "gray.700" }} width="full" onClick={handleRegister}>
                                Register
                            </Button>
                        </Stack>
                    </VStack>
                </form>
            </Box>
        </Box>
        
    );
}







export default Login;