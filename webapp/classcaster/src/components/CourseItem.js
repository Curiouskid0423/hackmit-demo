import React from "react";
import {
    Heading,
    MdSettings,
    LinkBox,
    Center,
    Text,
    LinkOverlay,
    useColorModeValue,
  } from '@chakra-ui/react';
  
/**
 * CourseItem is a component for each individual course, which 
 * will be a pop up element on Course Directory page).
 */
  
  export default function CourseItem() {
    return (
      <Center py={2}>
        <LinkBox
        maxW={'80%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>

        <LinkOverlay href="/course/23" maxWidth={"100%"}>
            <Heading fontSize={'2xl'} fontFamily={'body'} px={3} py={2}>
                EECS16B 
            </Heading>
            <Text
                textAlign={'center'}
                color={useColorModeValue('gray.700', 'gray.400')}
                px={3}>
            </Text>
        </LinkOverlay>
        </LinkBox>
      </Center>
    );
  }