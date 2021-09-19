import React from "react";
import {
    Heading,
    MdSettings,
    Box,
    Center,
    Text,
    Stack,
    Button,
    List,
    ListItem,
    useColorModeValue,
  } from '@chakra-ui/react';
  
/**
 * CourseItem is a component for each individual course, which 
 * will be a pop up element on Course Directory page).
 */
  
  export default function CourseItem() {
    return (
      <Center py={3}>
        <Box
          maxW={'95%'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'left'}>
          <Heading fontSize={'2xl'} fontFamily={'body'} px={3} py={2}>
            EECS16B 
          </Heading>
          <Text
            textAlign={'left'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            <List spacing={3}>
                <ListItem as={MdSettings} color="blue.400">
                    Actress, musician, songwriter and artist. 
                </ListItem>
            </List>
          </Text>
  
          <Stack mt={8} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{
                bg: 'gray.200',
              }}>
              Inspect
            </Button>
          </Stack>
        </Box>
      </Center>
    );
  }