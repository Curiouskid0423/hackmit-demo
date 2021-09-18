import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Courses from "../components/Courses";
import Dashboard from "../components/Dashboard";
import SignUpPage from "../components/SignUpPage";
import LogInPage from "../components/LogInPage";
import NotFound from "../components/NotFound";

export const history = createBrowserHistory();

const AppRouter = () => {
    return (
        <Router history = {history}>
            <div>
                <Switch>
                    <Route path = "/" exact component = {LogInPage}/>
                    <Route path = "/dashboard" exact component = {Dashboard}/>
                    <Route path = "/login" exact component = {LogInPage}/>
                    <Route path = "/signup" exact component = {SignUpPage}/>
                    <Route path = "/courses" exact component = {Courses}/>
                    {/**<PrivateRoute path = "/courses/:id" exact component = {CoursePage}/>
                    <PrivateRoute path = "/students/edit/:id" component={EditStudentContact} />
                    <PrivateRoute path = "/students/content/:id" component = {StudentPersonalPage}/> */}
                    <Route component = {NotFound} />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;