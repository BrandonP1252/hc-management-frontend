import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

const RegisterPatient = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: "PATIENT",
        name: '',
        phone: '',
        email: '',
        date_of_birth: '',
        gender: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/register/patient', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
              console.log(data);
              
            } else {
              console.error('Error registering:', data.message);
            }
        } catch (error) {
            console.error('Error registering:', error.message);
        }
        
    };

    return (
        <Box w="100%" maxW="md" p={4} m="auto" mt={10}>
          <Heading as="h2" size="xl" textAlign="center" mb={6} mt={25}>
            Register
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
              <FormControl id="phone" isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
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
              <FormControl id="date_of_birth" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">MALE</option>
                  <option value="female">FEMALE</option>
                  <option value="other">OTHER</option>
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
              <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      );
    };
    
export default RegisterPatient;
    
