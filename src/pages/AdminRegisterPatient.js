import {React, useState} from 'react'
import {Box, Button, FormControl, FormLabel, Input, Select, Stack, Heading, Text} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegisterPatient = () => {
    

    // User data to send back to server
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        date_of_birth: '',
        email: '',
        phone: '',
        gender: '',
        address: ''
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
          await axios.post("http://localhost:8080/register", formData);
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
                    Add Patient Form
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

                        <FormControl id="date_of_birth" isRequired>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
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

                        <FormControl id="gender" isRequired>
                            <FormLabel>Gender</FormLabel>
                            <Select
                                placeholder="Select gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Select>
                        </FormControl>

                        <FormControl id="address" isRequired>
                            <FormLabel>Address</FormLabel>
                            <Input
                                type="text"
                                name="address"
                                value={formData.address}
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

export default AdminRegisterPatient