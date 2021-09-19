import React from "react";
import { Grid, GridItem, Text, useBreakpointValue, Heading } from "@chakra-ui/react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CourseItem from "./CourseItem";

const Dashboard = (props) => {

    return (
        <Grid
            h="100vh"
            templateRows="repeat(7, 1fr)"
            templateColumns="repeat(8, 1fr)"
            gap={4}
            p = {3}
            >
            <GridItem rowSpan={7} colSpan={2} >
                <Heading 
                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    margin={"4rem 0 0 1rem"}
                    >
                    <Text
                        as={'span'}
                        position={'relative'}
                        _after={{
                            content: "''",
                            width: 'full',
                            height: useBreakpointValue({ base: '20%', md: '30%' }),
                            position: 'absolute',
                            bottom: 0,
                            left: 3,
                            bg: 'blue.200',
                            zIndex: -1,
                        }}>
                        Dashboard
                    </Text>
                </Heading>
            </GridItem>
            <GridItem rowSpan={2} colSpan={3} bg="papayawhip">
                <Grid 
                    templateRows="repeat(1, 1fr)" 
                    templateColumns="repeat(5, 1fr)" 
                    p = {3} 
                    gap = {4} 
                    height = {"100%"}
                >
                    <GridItem rowSpan={1} colSpan={2} bg={'blue'} p={7}>
                        <Text fontSize={"5xl"}>70%</Text>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={3} bg={'blue'}/>
                </Grid>
            </GridItem>
            <GridItem rowSpan={2} colSpan={3} bg="papayawhip">
            
            </GridItem>
            <GridItem rowSpan={5} colSpan={6}>
                <Grid 
                    templateRows="repeat(4, 1fr)" 
                    templateColumns="repeat(2, 1fr)" 
                    p = {3} 
                    gap = {4} 
                    height = {"100%"}
                >
                    {
                        <GridItem rowSpan={1} colSpan={1}> 
                            <CourseItem />
                        </GridItem> 
                    }
                    
                </Grid>
            </GridItem>
        </Grid>
    );
}

export default Dashboard;