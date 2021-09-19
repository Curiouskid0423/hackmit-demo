import React from "react";
import { Button } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"; 
import { Link as RouterLink } from "react-router-dom";


const LogInPage = (props) => {

    return (
        <div>
            <h1> This is log in page. </h1>
            <RouterLink to='/dashboard'>
                <Button 
                    rightIcon={<ArrowForwardIcon />} 
                    colorScheme="blue">
                Button  
                </Button>
            </RouterLink>
        </div>
    );
}

export default LogInPage;