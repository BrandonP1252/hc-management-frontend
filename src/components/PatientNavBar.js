import { Box, HStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const PatientNavBar = () => {
  const navigate = useNavigate();
  const handleFindDoctorButton = () => {
    navigate("/find-doctors");
  }
  const handleAllLocationButton = () => {
    navigate("/all-locations");
  }

  const handleGetCareButton = () => {
    navigate("/get-care");
  }

  const handleMedicalRecordButton = () => {
    navigate("/medical-records")
  }

  const handleAppointmentButton = () => {
    navigate("/appointments")
  }

  return (
    <Box bg="teal.500" px={8} py={4} height="70px">
      <HStack justify="center" spacing={12}>
        <Button variant="link" color="white" onClick={handleFindDoctorButton} fontSize="lg">
          Find a Doctor
        </Button>
        <Button variant="link" color="white" onClick={handleAllLocationButton} fontSize="lg">
          All Locations
        </Button>
        <Button variant="link" color="white" onClick={handleGetCareButton} fontSize="lg">
          Get Care
        </Button>
        <Button variant="link" color="white" onClick={handleMedicalRecordButton} fontSize="lg">
          Medical Records
        </Button>
        <Button variant="link" color="white" onClick={handleAppointmentButton} fontSize="lg">
          My Appointments
        </Button>
      </HStack>
    </Box>
  )
}

export default PatientNavBar