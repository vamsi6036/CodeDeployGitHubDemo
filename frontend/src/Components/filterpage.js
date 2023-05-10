import axios from "axios";
import React from "react";
import navHook from "./nav";
import '../Styles/filter.css';


class Filter extends React.Component{
    constructor(){//...?
        super();
        this.state = {
            locations : [],
            resturants: [],
            location: undefined,
            lcost: undefined, 
            hcost: undefined,
            sort: 1,
            page: 1,
            cuisine:[]
        
        }
    }
    componentDidMount() {
        axios({
            url: "http://localhost:4080/location",
            method: "GET",
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ locations : res.data.locations})
        })
        .catch(err => console.log(err))

        axios({
            url: "http://localhost:4080/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ resturants: res.data.resturants})
        })
        .catch(err => console.log(err))
    }

    handleLocationChange = (event) => {
        const location = event.target.value;

        const { sort, lcost, hcost, page } = this.state;

        const filterObj = {
            location: location,
            lcost, 
            hcost,
            sort,
            page
        }// 1st is of our db in resturant.js controller
        
        axios({
            url: "http://localhost:4080/filter",  //...this is for mealtype -- under menu cards will be applicable
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj // data is the object
        })
        .then(res => {
            this.setState({ resturants: res.data.resturants, location})// multiple items can also be given as to update those values instead of 2 setState's
        })
        .catch(err => console.log(err))
    }
    handleSortChange = (sort) => {
        const { location, lcost, hcost, page } = this.state;

        const filterObj = {
            location: location,
            lcost, 
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:4080/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ resturants: res.data.resturants, sort})
        })
        .catch(err => console.log(err))
    }

    handlePageChange = (page) => {
        const { location, sort, lcost, hcost } = this.state;

        const filterObj = {
            location: location,
            lcost, 
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:4080/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ resturants: res.data.resturants, page})
        })
        .catch(err => console.log(err))
    }

    handleCostChange = (lcost, hcost) => {
        const { location, sort, page } = this.state;

        const filterObj = {
            location: location,
            lcost, 
            hcost,
            sort,
            page
        }

        axios({
            url: "http://localhost:4080/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ resturants: res.data.resturants, lcost, hcost})
        })
        .catch(err => console.log(err))
    }
    
    handleCuisineChange = (id) =>{
        const { location, sort, lcost, hcost,page, cuisine} = this.state;
        //intialize updatedCuisineList with this.state.cuisine
        const updatedCuisineList = cuisine;
        //remove unchecked cuisineId from updatedCuisineList, if cuisineId already exists..id = 34, cuisine=[30,34] => index =1,cuisne =[30]
        //else add new cuisine to updatedCuisineList
        var index = updatedCuisineList.findIndex(x => x==id);
        if(index>=0){updatedCuisineList.splice(index,1)}
        else{updatedCuisineList.push(id)}
        console.log(updatedCuisineList);
        const filterObj = {
            location: location,
            lcost, 
            hcost,
            sort,
            page, 
            cuisine: updatedCuisineList
        }
        axios({
            url: "http://localhost:4080/filter",
            method: "POST",
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
        .then(res => {
            this.setState({ resturants: res.data.resturants,cuisine: updatedCuisineList})
        })
        .catch(err => console.log(err))
    }

    handleNavigate = (res) => {
        this.props.navigate(`/details?resturant=${res}`);
    }

    render(){
        const {locations, resturants } = this.state;
        return(
            <div>
                <div className="body">

               
    
    <main>
        <section>
            <div className="title">Breakfast Places in Mumbai</div>
            <article className="F1">
                <br/><label className="filter"> Filters </label><br/><br/>
                <label for="select Location"  id="h1">Select Location</label>
                <br/>
                <select className="form-control input3" onChange={this.handleLocationChange}  style={{width: "230px",padding: "5px",color:"grey",borderRadius: "10px"}}>
                <option value="0" disabled selected> Select your location </option>
                    {/*<option>Sarjapur Road, Bengaluru</option>  HSR Layout, Bengaluru   Kormangala, Bengaluru  Jay Nagar, Bengaluru*/}
                    {
                        locations?.map( (item) => {
                            return( <option value={item.city_id} >{`${item.name}`}</option>) // value..? value={item.city_id} for reference incase of multiple pages
                        })
                    }                    
                </select> 
                <br/> <br/>
                <label id="h1">Cuisine</label><br/>
                <input type="checkbox" id="11"  onChange={() => this.handleCuisineChange(1)}/> &nbsp;
                <label htmlFor="11" id="h2">North India</label><br/>
                <input type="checkbox" id="12" onChange={() => this.handleCuisineChange(2)}/> &nbsp;
                <label htmlFor="12" id="h2">South India</label><br/>
                <input type="checkbox" id="13"  onChange={() => this.handleCuisineChange(3)}/> &nbsp;
                <label htmlFor="13" id="h2">Chinese</label><br/>
                <input type="checkbox" id="14"  onChange={() => this.handleCuisineChange(4)}/> &nbsp;
                <label htmlFor="14" id="h2">Fast Food</label><br/>
                <input type="checkbox" id="15" onChange={() => this.handleCuisineChange(5)}/> &nbsp;
                <label htmlFor="15" id="h2">Street Food</label>
                <br/><br/>
                <label id="h1">Cost For Two</label><br/>
                <input type="radio" id="1" name="1" onChange={() => this.handleCostChange(0, 500)}/> &nbsp;
                <label htmlFor="1" id="h2" >Less than ₹ 500</label><br/>
                <input type="radio" id="2" name="1" onChange={() => this.handleCostChange(500, 1000)}/> &nbsp;
                <label htmlFor="2" id="h2" >₹ 500 to ₹ 1000</label><br/>
                <input type="radio" id="3" name="1" onChange={() => this.handleCostChange(1000, 1500)}/> &nbsp;
                <label htmlFor="3" id="h2" >₹ 1000 to ₹ 1500</label><br/>
                <input type="radio" id="4" name="1" onChange={() => this.handleCostChange(1500, 2000)}/> &nbsp;
                <label htmlFor="4" id="h2" >₹ 1500 to ₹ 2000</label><br/>
                <input type="radio" id="5" name="1" onChange={() => this.handleCostChange(2000, 5000)}/> &nbsp;
                <label htmlFor="5" id="h2" > ₹ 2000</label>
                <br/><br/>
                <label className="filter">sort</label><br/>
                <input type="radio"  id="lth" name="6" onChange={() => this.handleSortChange(1)}/> &nbsp;
                <label  id="h2" htmlFor="lth" >Price low to high</label><br/>
                <input type="radio"  id="htl" name="6" onChange={() => this.handleSortChange(-1)}/> &nbsp;
                <label  id="h2" htmlFor="htl" >Price high to low</label>
            </article>
           <div>
           {/* Result-01 */}
            {         resturants.length !=0 ?
                        resturants.map( (item, index) => {
                            return( <div key={index} onClick={() => this.handleNavigate(item._id)}>
                               <article className="R1">
                            <img alt="" src={item.thumb}/>
                            <h2>{item.name}</h2><br/>
                            <label className="r1">{item.city_name}</label>
                            <label className="r2">{item.address}</label>
                            <br/>
                            <label className="r3">Cuisine:</label>
                            <label className="r4">{item.Cuisine.map((r) => `${r.name} ..  `)}</label> {/* AS Cuisine having child array, inside it our name is there. , can also try if(r,index) statment for getting , .*/}
                            <label className="r5">Cost For two:</label>
                            <label className="r6">₹{item.cost}</label>  
                            </article> 
                            <br/><br/>
                            
                        </div>) // value..? value={item.city_id} for reference incase of multiple pages
                        }) : <div>Sorry, No Results Found...</div>
                    }
                     
          
           
             {/* Pagination */}
            <article className="next">
                <a href="#">&laquo;</a>
                <a href="#" onClick={() => this.handlePageChange(1)}>1</a>
                <a href="#" onClick={() => this.handlePageChange(2)}>2</a>
                <a href="#" onClick={() => this.handlePageChange(3)}>3</a>
                <a href="#" onClick={() => this.handlePageChange(4)}>4</a>
                <a href="#" onClick={() => this.handlePageChange(5)}>5</a>
                <a href="#" onClick={() => this.handlePageChange(6)}>6</a>
                <a href="#">&raquo;</a>
            </article>
            </div>
        </section>
    </main>
                </div>
            </div>
        )
    }
      
}


export default navHook(Filter);