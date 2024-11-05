import React, { useEffect, useState } from 'react'
import { Box, Input, VStack, Heading, Flex, List, ListItem } from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [doctors, setDoctors] = useState([])
  const navigate = useNavigate();

  const handleSelect = (doctor) => {
    if (typeof doctor != "undefined") {
      navigate(`/doctorid/${doctor.id}`)
    }
  }

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/doctor-list",
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
          }
        }
      );
      setDoctors(response.data);
    }
    catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }


  useEffect(() => {
    fetchDoctors();
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filteredResults = doctors.filter((doctor) => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()));
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [searchQuery, doctors]);

  return (
    <Flex flex="1" align="center" justify="center" minH="100vh" bg="#B4D1DE">
      <Box width="100%" maxW="600px" p={6} boxShadow="lg" bg="gray.50" borderRadius="md">
        <Heading mb={6} textAlign="center">
          Find a Doctor
        </Heading>
        <VStack spacing={4}>
          <Input
            placeholder="Search by name or specialty"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {results.length > 0 && (
            <List spacing={2} bg="gray.50" borderRadius="md" p={4} boxShadow="md" width="100%">
              {results.map((data) => (
                <ListItem
                  key={data.id}
                  p={2}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                  _hover={{ cursor: 'pointer', bg: 'gray.100' }}
                  onClick={() => handleSelect(data)}
                >
                  {data.name}, {data.specialty}
                </ListItem>
              ))}
            </List>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}

export default FindDoctors;