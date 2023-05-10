import axios from "axios";
import React from "react";
import '../Styles/home.css';
import Banner from "./banner";
import Quick from "./QuickSearch";
class Home extends React.Component{
    constructor(){//...?
        super();
        this.state = {location : [],mealtype: []}
        
    }
    componentDidMount(){
        axios({
            url:'http://localhost:4080/location',
            method: 'GET',
            headers: {'Content-Type': 'application/JSON'}
        })
        .then(res =>
            this.setState({location : res.data.locations}))// 2nd location is the reference we used in locationController
        .catch((err => console.log(err)))  
        
        axios({
            url: "http://localhost:4080/mealtype",  //...this is for mealtype -- under menu cards will be applicable
            method: "GET",
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ mealtype: res.data.mealtypes})
        })
        .catch(err => console.log(err))
    }

    render(){
        const {location, mealtype} = this.state; //.. why inside render()? ans: bcz it needs to declared inside function to get accesseble
        return(
            <div className="hello">
            {/* Banner part */}
            <Banner locationdata = {location}/> {/* is location acting as props..? */}

            {/* QuickSearche part */}
            <Quick mealtypeData = { mealtype }/>
    
            </div>
            )
        
    }
}

export default Home;