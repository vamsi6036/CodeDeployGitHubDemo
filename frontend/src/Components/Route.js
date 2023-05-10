import { BrowserRouter, Routes,Route } from "react-router-dom";
// These 3 things are requried to do Routing, which arempart of React-Router-Dom package.
// --> here we import our required pages that we need to Route.
import Home from "./Homepage";
import Filter from "./filterpage";
import Detail from "./Details";
import Header from "./header";

import { useState, useEffect } from "react";

function Router(){
    const [user, setUser] = useState(null);

    useEffect(() => {// ---> to 
        const getUser = () => {
            fetch("http://localhost:4080/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/JSON",
                    "Content-Type": "application/JSON",
                    "Access-Control-Allow-Credentials": true
                }, 
            })
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("Authentication Failed");
            })
            .then((resObject) => {
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            });
        };
        getUser();
    }, []);
 return(
    <BrowserRouter>
    <Header user = { user } /> {/* --> ??*/}
    <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/filter" element={<Filter></Filter>}></Route>
        <Route path="/Details" element={<Detail></Detail>}></Route>
    </Routes>
    </BrowserRouter>
 )
}

export default Router;