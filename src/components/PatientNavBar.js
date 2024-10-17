import React from 'react'
import { Box, HStack, Button, Link } from "@chakra-ui/react";

const PatientNavBar = () => {
  return (
    <Box bg="teal.500" px={8} py={4} height="70px">
      <HStack justify="center" spacing={12}>
        <Button variant="link" color="white" as={Link} to="/find-doctor" fontSize="lg">
          Find a Doctor
        </Button>
        <Button variant="link" color="white" as={Link} to="/all-locations" fontSize="lg">
          All Locations
        </Button>
        <Button variant="link" color="white" as={Link} to="/get-care" fontSize="lg">
          Get Care
        </Button>
        <Button variant="link" color="white" as={Link} to="/medical-records" fontSize="lg">
          Medical Records
        </Button>
        <Button variant="link" color="white" as={Link} to="/appointments" fontSize="lg">
          Appointments
        </Button>
      </HStack>
    </Box>
  )
}

export default PatientNavBar