import { React, useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import axios from 'axios';

const UserManager = () => {

    const [patients, setPatients] = useState([])

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
            setPatients(response.data)
        }
        catch(error) {
            console.error('Error fetching patients:', error);
        }
    }

    const addPatient = () => {
        console.log("add")
    }

    const deletePatient = () => {
        console.log("delete")
    }

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("token")).data)

        fetchPatients();
    }, []);

    return (
        <Box bg="#B4D1DE" minH="100vh" p={4}>
            <Button leftIcon={<AddIcon />} onClick={addPatient} colorScheme="teal" mb={4}>
                Add Patient
            </Button>
            
            <Table variant="simple">
                <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Action</Th>
                </Tr>
                </Thead>
                <Tbody>
                {patients.map((patient) => (
                    <Tr key={patient.id}>
                    <Td>{patient.id}</Td>
                    <Td>{patient.name}</Td>
                    <Td>
                        <IconButton 
                        icon={<MinusIcon />} 
                        colorScheme="red" 
                        onClick={() => deletePatient(patient.id)} 
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