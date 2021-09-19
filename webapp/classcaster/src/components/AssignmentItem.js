import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const AssignmentItem = () => {
    /**
     * assignment {
            name: (Assignment Name),
            num_completed: <INT>, // have already completed
            num_students: <INT>, // total
            forecasted_time: <FLOAT> 
        }
     */
    return (
        <Box bg="gray.400" w="30rem" p={4} color="white" m={4} p={5} >
        <Grid
            templateRows="repeat(1, 1fr)" 
            templateColumns="repeat(5, 1fr)" 
            height={"8rem"} gap={3}
        >
            <GridItem colSpan={1} bg={"tomato"}> ABC </GridItem>
            <GridItem colSpan={3} bg={"tomato"}> ABC </GridItem>
            <GridItem colSpan={1} bg={"tomato"}> ABC </GridItem>
        </Grid>
        </Box>
    )
}

export default AssignmentItem;