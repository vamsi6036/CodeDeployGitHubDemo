import React from "react";
import { useNavigate } from "react-router-dom";

const navHook = (Component) => { // it carries the Component that needs the navigation.
   
    return(props) => {
        const navigate = useNavigate(); // declaring the navigation part
        return <Component navigate={navigate}{...props} />// navigation works and it having the all data sets along with it and sends to navigated page.
    } // " ...props " means it will contains all the data sets available along with it & navigates them.
}
export default navHook; // It is the Customizing Hook page for navigation instead of calling it multiple times.