import { Box, Text, Flex, Heading, Button, VStack, HStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addDays, startOfWeek, addHours, format } from 'date-fns';

const DoctorHomePage = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([])
    const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const navigate = useNavigate();

    // HANDLERS

    const showAvailableAppointments = () => {
        const availableSlots = []
        for (let day = 0; day < 5; day++) {
            for (let hour = 9; hour < 17; hour++) { // 9 AM to 5 PM
              const slotTime = addHours(addDays(weekStart, day), hour);
              const isSlotTaken = appointments.some(
                (appointment) =>
                  appointment.appointment_date === format(slotTime, 'yyyy-MM-dd') &&
                  appointment.appointment_time.substring(0,5) === format(slotTime, "hh:mm")
              );
              if (!isSlotTaken) {
                availableSlots.push(slotTime);
              }
            }
        }
        return availableSlots;
    };

    const handleWeekChange = (direction) => {
        setWeekStart((prev) => addDays(prev, direction === 'next' ? 7 : -7));
    }

    const handleSlotSelection = (slot) => {
        navigate("/register-appointment", { state: { selectedDate: slot, doctorId: id }})
    }


    // FETCH STUFF

    const fetchDoctor = async () => {
        try {
            const doctorResponse = await axios.get(`http://localhost:8080/user/get-doctor/${id}`,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
                    }
                }
            )

            const appointmentResponse = await axios.get(`http://localhost:8080/user/get-doctor-appointment/${id}`,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
                    }
                }
            )
            setDoctor(doctorResponse.data)
            setAppointments(appointmentResponse.data)
            console.log(appointments)
            console.log("test")
        }
        catch(error) {
            console.error("Error finding user: ", error)
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, [id]);

    


    if (!doctor) {
        return <Text>Loading doctor information...</Text>;
    }


    return (
        <Box bg="#B4D1DE" minH="100vh" py={6}>
            <Box maxW="800px" mx="auto" py={6} bg="#B4D1DE">
                <Heading as="h2" size="lg" mb={4} textAlign="center" py={10}>
                    {doctor ? `Schedule Appointment with Dr. ${doctor.name}` : 'Loading...'}
                </Heading>

                <Flex justifyContent="space-between" mb={4}>
                    <Button onClick={() => handleWeekChange('prev')}>Previous Week</Button>
                    <Text fontSize="lg">{format(weekStart, 'MMMM dd, yyyy')}</Text>
                    <Button onClick={() => handleWeekChange('next')}>Next Week</Button>
                </Flex>

                <VStack align="start" spacing={4} maxH="400px" overflowY="auto">
                    {showAvailableAppointments().map((slot, index) => (
                    <Box key={`${slot.getDate}-${index}`} p={4} borderWidth={1} borderRadius="md" w="100%" bg="white" _hover={{ cursor: 'pointer', bg: 'gray.200' }} onClick={() => handleSlotSelection(slot)}>
                        <HStack justify="space-between">
                            <Text>{format(slot, 'EEEE, MMMM dd')}</Text>
                            <Text>{format(slot, 'hh:mm a')}</Text>
                        </HStack>
                    </Box>
                    ))}
                </VStack>
            </Box>
        </Box>
      );
}

export default DoctorHomePage;