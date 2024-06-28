import React from 'react'
import './NavigationBar.css'
import { Button, Flex } from '@chakra-ui/react';


const Navigationbar = () => {
    

    return (
        <Flex my="5" gap="2" minWidth="max-content" position="absolute">
          <Button variant="ghost">
            Home
          </Button>

          <Button variant="ghost">
            Profile
          </Button>

          <Button variant="ghost">
            Contact
          </Button>
        </Flex>
    );
}
export default Navigationbar;