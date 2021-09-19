import React from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";

const Dashboard = (props) => {

    return (
        <Grid
            h="100vh"
            templateRows="repeat(7, 1fr)"
            templateColumns="repeat(8, 1fr)"
            gap={4}
            p = {3}
            >
            <GridItem rowSpan={7} colSpan={2} bg="tomato" />
            <GridItem rowSpan={2} colSpan={3} bg="papayawhip" />
            <GridItem rowSpan={2} colSpan={3} bg="papayawhip" />
            <GridItem rowSpan={5} colSpan={6} bg="blue.400">
                <Grid 
                    templateRows="repeat(4, 1fr)" 
                    templateColumns="repeat(2, 1fr)" 
                    p = {3} 
                    gap = {4} 
                    height = {"100%"}
                >
                    <GridItem rowSpan={1} colSpan={1} bg="tomato"> fdsfd </GridItem>
                    <GridItem colSpan={1} bg="tomato"> fdsfd </GridItem>
                    <GridItem colSpan={1} bg="tomato"> fdsfd </GridItem>
                </Grid>
            </GridItem>
        </Grid>
    );
}

export default Dashboard;