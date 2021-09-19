import React from "react";
import { 
    Grid, 
    GridItem, 
    Text, 
    Heading, 
    Square, 
    Box,
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input, 
    useBreakpointValue, 
    useDisclosure,
} from "@chakra-ui/react";
import { MdBuild } from "react-icons/md"
import CourseItem from "./CourseItem";

const Dashboard = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();

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
                
                <Box m={5} w="100%">
                    <Button 
                        leftIcon={<MdBuild />} colorScheme="blue" 
                        variant="outline" minW="8rem" onClick={onOpen}
                        >
                        Edit Profile
                    </Button>
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                        <form method="POST" action="/login/password">
                            <ModalHeader>Profile</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                ref={initialRef}
                                name="username"
                                placeholder="Username"
                                />
                            </FormControl>


                            <FormControl>
                                <FormLabel>Race</FormLabel>
                                <Input
                                name="race"
                                placeholder="race"
                                />
                            </FormControl>

                            </ModalBody>

                            <ModalFooter>
                            <Button type="submit" colorScheme="blue" mr={3}>
                                Login
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                        </ModalContent>
                    </Modal>
                </Box>

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
                        <Square h={"100%"} w="100%">
                            <Heading fontSize={"6xl"}>70%</Heading>
                        </Square>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={3} bg={'blue'}/>
                </Grid>
            </GridItem>
            <GridItem rowSpan={2} colSpan={3} bg="papayawhip">
            
            </GridItem>
            <GridItem rowSpan={5} colSpan={6}>
                <Grid 
                    templateRows="repeat(4, 1fr)" 
                    templateColumns="repeat(3, 1fr)" 
                    p = {3} 
                    gap = {4} 
                    height = {"100%"}
                >
                    {
                        <GridItem rowSpan={1} colSpan={1}> 
                            <CourseItem 
                                courseNum={"EECS16B"} 
                                courseName={"Designing Information Devices and Systems II"}
                            />
                        </GridItem> 
                    }
                        <GridItem rowSpan={1} colSpan={1}> 
                            <CourseItem 
                                courseNum={"CS189"} 
                                courseName={"Intro to Machine Learning"}
                            />
                        </GridItem> 
                        <GridItem rowSpan={1} colSpan={1}> 
                            <CourseItem 
                                courseNum={"CS194"} 
                                courseName={"Intro to Parallel Computing"}
                            />
                        </GridItem> 
                        <GridItem rowSpan={1} colSpan={1}> 
                            <CourseItem 
                                courseNum={"PHILO 3"} 
                                courseName={"Nature of Mind"}
                            />
                        </GridItem> 
                    
                </Grid>
            </GridItem>
        </Grid>
    );
}

export default Dashboard;