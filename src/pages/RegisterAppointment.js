import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Heading, Text, Button, Textarea, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { format } from 'date-fns';
import { getUsername } from '../utils/AuthInfo';
import axios from 'axios';

const RegisterAppointment = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedDate, doctorId } = location.state;
    const [reason, setReason] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async () => {
        if (!reason.trim()) {
            setIsError(true); 
            return;
        }

        const username = getUsername()
        const status = "scheduled"
        const doctor_id = Number(doctorId)
        

        const appointmentData = {
            doctor_id,
            appointment_date: format(new Date(selectedDate), 'yyyy-MM-dd'),
            appointment_time: format(new Date(selectedDate), 'HH:mm'),
            reason,
            username,
            status
        }
        
        
        try {
            const res = await axios.post("http://localhost:8080/user/add-appointment", appointmentData, 
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
                    }
                }
            )

            console.log(res)
        }
        catch (error) {
            console.log(error)
        }
        

    }

    const handleBack = () => {
        navigate(-1);
    }


    return (
        <Box minH="100vh" bg="gray.100" py={6} display="flex" justifyContent="center" alignItems="center">
            <Box bg="white" p={6} borderRadius="md" shadow="md" maxW="500px" w="100%">
                <Heading as="h2" size="lg" mb={4}>Confirm Appointment</Heading>
                <Text fontSize="lg" mb={2}>Selected Date: {format(new Date(selectedDate), 'EEEE, MMMM dd, yyyy')}</Text>
                <Text fontSize="lg" mb={4}>Time: {format(new Date(selectedDate), 'hh:mm a')}</Text>

                <FormControl isInvalid={isError} mb={4}>
                    <FormLabel>Reason for Appointment:</FormLabel>
                    <Textarea
                        placeholder="Enter reason for appointment"
                        value={reason}
                        onChange={(e) => {
                        setReason(e.target.value);
                        if (isError) setIsError(false); // Reset error if reason changes
                        }}
                    />
                    {isError && <FormErrorMessage>Reason is required.</FormErrorMessage>}
                </FormControl>

                <Button colorScheme="gray" onClick={handleBack} mr={2}>Back</Button>
                <Button colorScheme="blue" onClick={handleSubmit}>Register Appointment</Button>
            </Box>
        </Box>
      );
}

export default RegisterAppointment