import {React, useState} from 'react'
import {Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegisterDoctor = () => {
    

    // User data to send back to server
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        specialty: ''
    });
    
    // simple error messages
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // clear any previous error messages
        setSuccessMessage(''); // clear any previous success messages
    
        // post to backend to register the user and add it to the database
        try {
          await axios.post("http://localhost:8080/admin/register/doctor", formData,
            {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
                }
            }
          );
          setSuccessMessage('You have successfully registered!');
          navigate("/admin/manager")
          
        } catch (error) {
          setErrorMessage(
            error.response?.data?.message || 'An error occurred while registering.'
          );
        }
    };


    return (
        <Box bg="#B4D1DE" minH="100vh" display="flex" justifyContent="center" alignItems="center">
            <Box bg="white" p={8} rounded="lg" shadow="lg" maxW="md" w="full">
                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    Add Doctor Form
                </Heading>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl id="phone" isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl id="specialty" isRequired>
                            <FormLabel>Specialty</FormLabel>
                            <Input
                                type="text"
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <Button colorScheme="blue" type="submit" mt={4}>
                        Add
                        </Button>

                        {errorMessage && (
                        <Text color="red.500" mt={4}>
                            {errorMessage}
                        </Text>
                        )}

                        {successMessage && (
                        <Text color="green.500" mt={4}>
                            {successMessage}
                        </Text>
                        )}
                    </Stack>
                </form>

            </Box>
    </Box>
    )
}

export default AdminRegisterDoctor