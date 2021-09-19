import React, { useState, useEffect } from "react";
import axios from "axios";

import AssignmentItem from "./AssignmentItem";
import {PageSpinner} from "./Utilities";

const CoursePage = (props) => {
    const courseId = props.match.params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [assignments, setAssignments] = useState([]);
    // useEffect(async () => {
    //     if (!isLoading) return;
    //     const res = await axios({
    //         method: 'post',
    //         url: '/api',
    //         data: {
    //             action: "getCourseAssignments",
    //             course: courseId
    //         }
    //     });
    //     setAssignments(res);
    // }, [isLoading]);
    

    if (!isLoading) {
        return (<PageSpinner text="Loading course..." />);
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
        return (<AssignmentItem />);
    }
}

export default CoursePage;