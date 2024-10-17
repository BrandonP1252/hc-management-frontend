import { React, useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, Heading, Select } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserManager = () => {

    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([]);
    const [sortPatientOption, setSortPatientOption] = useState("");
    const [sortDoctorOption, setSortDoctorOption] = useState("");
    const navigate = useNavigate();

    const fetchPatients = async () => {

        try {
            const response = await axios.get("http://localhost:8080/admin/patient-list", 
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
                    }
                }
            )
            setPatients(response.data);
        }
        catch(error) {
            console.error("Error fetching patients:", error);
        }
    }

    const fetchDoctors = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/doctor-list",
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
                    }
                }
            )

            setDoctors(response.data);
        }
        catch(error) {
            console.error("Error fetching doctors:", error);
        }

    }

    const addPatient = () => {
        navigate("/admin/add-patient")
    }

    const deletePatient = async (id) => {
        try {
            setPatients(patients.filter((patient) => patient.id !== id))
            await axios.delete(`http://localhost:8080/admin/delete-patient/${id}`,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
                    }
                }
            )
            console.log("Successfully deleted.")
        }
        catch(error) {
            console.error("Error deleting user.")
        }
    }

    const addDoctor = () => {
        navigate("/admin/add-doctor")
    }

    const deleteDoctor = async (id) => {
        try {
            setDoctors(doctors.filter((doctor) => doctor.id !== id))
            await axios.delete(`http://localhost:8080/admin/delete-doctor/${id}`,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
                    }
                }
            )
            console.log("Successfully deleted.")

        }
        catch(error) {
            console.error("Error deleting user.")
        }
    }

    const handlePatientSort = (event) => {
        const value = event.target.value;
        setSortPatientOption(value)

        let sortedPatients = [...patients];

        if (value === "user_id") {
            sortedPatients.sort((a,b) => a.id - b.id); // Sort by ID
        }

        else if (value === "name_ascending") {
            sortedPatients.sort((a,b) => a.name.localeCompare(b.name)); // Sort by name ascending
        }

        else if (value === "name_descending") {
            sortedPatients.sort((a,b) => b.name.localeCompare(a.name)); // Sort by name descending
        }

        setPatients(sortedPatients)
    }

    const handleDoctorSort = (event) => {
        const value = event.target.value;
        setSortDoctorOption(value)

        let sortedDoctors = [...doctors];

        if (value === "user_id") {
            sortedDoctors.sort((a,b) => a.id - b.id); // Sort by ID
        }

        else if (value === "name_ascending") {
            sortedDoctors.sort((a,b) => a.name.localeCompare(b.name)); // Sort by name ascending
        }

        else if (value === "name_descending") {
            sortedDoctors.sort((a,b) => b.name.localeCompare(a.name)); // Sort by name descending
        }

        setDoctors(sortedDoctors)
    }


    useEffect(() => {
        fetchPatients();
        fetchDoctors();
    }, []);

    return (
        <Box bg="#B4D1DE" minH="100vh" p={5}>
            <Heading as="h2" mb={5}>User Manager</Heading>

            {/* Add Patient Button */}
            <Button leftIcon={<AddIcon />} colorScheme="blue" mb={4} onClick={addPatient}>
                Add Patient
            </Button>

            <Select placeholder="Sort by" mt={5} mb={5} width="150px" onChange={handlePatientSort} value={sortPatientOption}>
                <option value="user_id">ID</option>
                <option value="name_ascending">Name (A-Z)</option>
                <option value="name_descending">Name (Z-A)</option>
            </Select>

            {/* Patient Table */}
            <Table variant="simple" bg="white" borderRadius="md" shadow="md">
                <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Username</Th>
                    <Th>Name</Th>
                    <Th>Phone</Th>
                    <Th>Email</Th>
                    <Th>Date of Birth</Th>
                    <Th>Gender</Th>
                    <Th>Address</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {patients.map((patient) => (
                        <Tr key={patient.id}>
                            <Td border="2px solid" borderColor="gray.200">{patient.id}</Td>
                            <Td border="2px solid" borderColor="gray.200">{patient.username}</Td>
                            <Td border="2px solid" borderColor="gray.200">{patient.name}</Td>
                            <Td border="2px solid" borderColor="gray.200">{patient.phone}</Td>
                            <Td border="2px solid" borderColor="gray.200">{patient.email}</Td>
                            <Td border="2px solid" borderColor="gray.200">{patient.date_of_birth}</Td>
                            <Td border="2px solid" borderColor="gray.200">{patient.gender}</Td>
                            <Td border="2px solid" borderColor="gray.200">{patient.address}</Td>
                            <Td border="2px solid" borderColor="gray.200">
                                <IconButton
                                    aria-label="Delete Patient"
                                    icon={<MinusIcon />}
                                    colorScheme="red"
                                    onClick={() => deletePatient(patient.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Heading as="h3" mt={10} mb={5}>Doctors</Heading>

            {/* Add Doctor Button */}
            <Button leftIcon={<AddIcon />} colorScheme="green" mb={4} onClick={addDoctor}>
                Add Doctor
            </Button>

            <Select placeholder="Sort by" mt={5} mb={5} width="150px" onChange={handleDoctorSort} value={sortDoctorOption}>
                <option value="user_id">ID</option>
                <option value="name_ascending">Name (A-Z)</option>
                <option value="name_descending">Name (Z-A)</option>
            </Select>

            {/* Doctor Table */}
            <Table variant="simple" bg="white" borderRadius="md" shadow="md">
                <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Username</Th>
                    <Th>Name</Th>
                    <Th>Specialty</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {doctors.map((doctor) => (
                        <Tr key={doctor.id}>
                            <Td border="2px solid" borderColor="gray.200">{doctor.id}</Td>
                            <Td border="2px solid" borderColor="gray.200">{doctor.username}</Td>
                            <Td border="2px solid" borderColor="gray.200">{doctor.name}</Td>
                            <Td border="2px solid" borderColor="gray.200">{doctor.specialty}</Td>
                            <Td border="2px solid" borderColor="gray.200">{doctor.email}</Td>
                            <Td border="2px solid" borderColor="gray.200">{doctor.phone}</Td>
                            <Td border="2px solid" borderColor="gray.200">
                                <IconButton
                                aria-label="Delete Doctor"
                                icon={<MinusIcon />}
                                colorScheme="red"
                                onClick={() => deleteDoctor(doctor.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default UserManager;