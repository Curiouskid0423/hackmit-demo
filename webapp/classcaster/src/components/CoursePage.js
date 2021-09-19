import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, GridItem, Center, Heading } from "@chakra-ui/react";
import AssignmentItem from "./AssignmentItem";
import { PageSpinner } from "./Utilities";

const CoursePage = (props) => {
  const courseId = props.match.params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    if (!isLoading) return;
    (async () => {
      const res = await axios({
        method: "POST",
        url: "/api",
        data: {
          type: "getCourseAssignments",
          course: courseId,
        },
      });
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setAssignments(res.data);
        }, 350);
      }, 150);
    })();
  }, [isLoading, courseId]);

  const tempAssignments = [
    {
      name: "Homework 3",
      daysCreated: "2021-09-16",
      numCompleted: 50,
      numStudents: 421,
      forecastTime: 15, // hours
      completed: false,
    },
    {
      name: "Note 2: Transient Analysis",
      daysCreated: "2021-09-09",
      numCompleted: 908,
      numStudents: 1392,
      forecastTime: 3, // hours
      completed: true,
    },
    {
      name: "Lab 2: DAC",
      daysCreated: "2021-09-12",
      numCompleted: 2,
      numStudents: 15,
      forecastTime: 7, // hours
      completed: false,
    },
  ];

  let daysCreated = [17, 12, 7, 5].map((x) => "2021-09-" + x.toString());

  if (isLoading || !assignments.length) {
    return (
      <PageSpinner
        text={!isLoading ? "Running inference..." : "Loading assignments..."}
      />
    );
  } else {
    /*
        assignment {
            name: (Assignment Name),
            num_completed: <INT>, // have already completed
            num_students: <INT>, // total
            forecasted_time: <FLOAT> // in hours, for students like you (predicted via gradient-boosted decision trees :D)
        }
        assignments: array of type 'assignment'
        */
    return (
      <div>
        <Center>
          <Heading mt={5} fontSize={"5xl"}>
            Assignments
          </Heading>
        </Center>
        <Grid h={"100vh"} p={50} templateColumns="repeat(2, 1fr)">
          {assignments.map((item, i) => {
            item.daysCreated = daysCreated[i % daysCreated.length]; // fixme
            return (
              <GridItem key={"griditem" + i}>
                <Center>
                  <AssignmentItem {...item} />
                </Center>
              </GridItem>
            );
          })}
        </Grid>
      </div>
    );
  }
};

export default CoursePage;
