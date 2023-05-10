import React from "react";
import axios from "axios";
import navHook from "./nav";

class Banner extends React.Component{

    constructor() {
        super();
        this.state = {
            restaurant: [],
            inputText: undefined,// for input-text in searchBar.
            suggestion: [] // for suggestion part to be appear.
        }
    }

    handleLocationChange = (e) => {
        const locationId = e.target.value;
        sessionStorage.setItem('locationId', locationId);

        axios({
            url: `http://localhost:4080/resturant/${locationId}`,// resturant based on location_id via browser level (not via url -- Node.js)
            method: "GET",
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ restaurant: res.data.resturant}) // 2nd resturant is the ref. we given restuarant Controller part
        })
        .catch(err => console.log(err))
    }

    handleInputChange = (event) => {
        const { restaurant } = this.state;
        const inputText = event.target.value;

        let suggestion = [];
          // this is for suggestion based on Input part
        suggestion = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase())); 
        this.setState({ inputText, suggestion });//..syntax?

    }

    selectResturants = (s) => {
        this.props.navigate(`/Details?resturant=${s}`);// props for navigate usage from other component ...??
    }

    showSuggestion = () => { // only for suggestion development part ---> CSS not working exactly???
        const { suggestion, inputText } = this.state;

            if ( suggestion.length === 0 && inputText === undefined ) {// if no suggestion, input is at intial stage
                return null;
            }

            if ( suggestion.length > 0 && inputText === '' ) {// if suggestion exists, input is empty
                return null;
            }

            if ( suggestion.length === 0 && inputText ) {// if no suggestion and there is some input text.
                return <li className="none" style={{listStyle:"none",margin:"10px"}}>No Search Results Found</li>
            }

        return(
            suggestion.map((data, index) => (//.map() always expects a index(value) to key(element)
                <li key={index} onClick={() => this.selectResturants(data._id)}>{/*onClick={() => this.selectResturants(data._id)} */}
                    <img alt="" className="sugImg" src={data.thumb} /> 
                    <span className="sugName">{`${data.name}`}</span> 
                    <span className="sugAdd">{`${data.locality}`}</span>
                </li>  // as thumb is comming from link -- url part..we can give directly, can aslo be given under ${}
            ))
        )
    }

    render(){
        const {locationdata} = this.props;
        return(
            <div >
<div className="back-img">
            {/*<div className="row text-end">
            <div className="col-7"></div>
            <div className="col-3 text-end mt-3">
                <a href="#Login"  className="text-decoration-none text-light">Login</a>
            </div>
            <div className="col-2 text-start mt-3">
                <a href="#Account" className="acc1 text-decoration-none text-light py-1 px-1">Create an account</a>
            </div>
            </div>*/}
        <div className="row text-center" style={{marginTop:"80px"}}>
            <div className="col-5"></div>
            <div className="col-2 text-danger circle"><h2 className="logo1">e!</h2></div>
            <div className="col-5"></div>
        </div>
        <div className="row text-center sbar1">
            <div className="col-4"></div>
            <div className="col-6 mt-3 title1 text-light text-start">Find the best restaurants, cafés, and bars</div>
            <div className="col-2"></div>
        </div>
        <div className="row sbar">
            <div className="col-4"></div>
            <div className="col-2 dropdown text-start">
                <select className="form-control input1" name="select Location1 " onChange={this.handleLocationChange} style={{height: "48px",width:"230px" ,color: "#777",padding: "10px",marginTop:"15px"}}>
                <option value="0" disabled selected> Select your location </option>
                    {/*<option>Sarjapur Road, Bengaluru</option>  HSR Layout, Bengaluru   Kormangala, Bengaluru  Jay Nagar, Bengaluru*/}
                    {
                        locationdata.map( item => {
                            return( <option value={item.city_id} >{`${item.name}`}</option>) // value..? value={item.city_id} for reference incase of multiple pages
                        })
                    }                    
                </select>
            </div>
            <div className="col-6 mt-3 text-start box">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
                <input type="search" className="search-in input2" placeholder="Search for restaurants" onChange={this.handleInputChange} style={{height: "45px",padding: "10px",width: "360px"}}/>
                <ul className="suggestion"> {this.showSuggestion()} </ul>
        </div>
    </div>
    </div>
            </div>
        )
    }
}

export default navHook(Banner);//navHook(Banner)..?