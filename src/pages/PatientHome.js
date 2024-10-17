import React, { useState } from 'react'
import { Box, Input, Button, VStack, Heading, Flex } from "@chakra-ui/react";

export const PatientHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <Flex flex="1" align="center" justify="center" minH="100vh" bg="gray.50">
      <Box width="100%" maxW="600px" p={6} boxShadow="lg" bg="white" borderRadius="md">
        <Heading mb={6} textAlign="center">
          Find a Doctor
        </Heading>
        <VStack spacing={4}>
          <Input
            placeholder="Search by name or specialty"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button colorScheme="teal" width="100%" onClick={handleSearch}>
            Search
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
