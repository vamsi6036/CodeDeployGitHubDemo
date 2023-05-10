import React from "react";
//import '../Styles/filter.css';
import '../Styles/Details.css';
import axios from "axios";
import queryString from 'query-string';// for getting _id from url, we need query selector -- we need to import it first.
import Modal from 'react-modal';// for creation and using Modals
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader ; takes Css from node_modules part(extenally)
import { Carousel } from 'react-responsive-carousel';//  Image Cariusel pkg needs to be there.


const customStyles = { // This is the custom stylling for Modal part 
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
}

class Detail extends React.Component{
    constructor() {
        super();
        this.state = {
            restaurant: [],
            menuItems: [],
            menuModal: false,
            resId: undefined, // why undefined??? it is of qs or resturant value?
            menuItems: [],
            subtotal: 0
        }
        
    }
    componentDidMount() {
        const qs = queryString.parse(window.location.search); // we are parsing (pasing) the _id value in searchbar of url to qs...?
        const { resturant } = qs;// we are putting the same in restaurant ... why {}???


        axios({
            url: `http://localhost:4080/resturants/${resturant}`, // this is the path from node.js only and for :id == ${id}
            method: "GET",
            headers: { 'Content-Type': 'application/JSON' }
        })
        .then(res => {
            this.setState({ restaurant: res.data.resturant,resId: resturant})
        })
        .catch(err => console.log(err))
    }

    // handelmodal requires 2 parameters : state: Name of the Modal , value(true/false) : opened(to be open)/closed(to be close).
    handleModal = (state, value) => {
        const { resId } = this.state;
        if (state == "menuModal" && value == true){
            axios({
                url: `http://localhost:4080/menu/${resId}`,// this is the path from node.js
                method: "GET",
                headers: { 'Content-Type': 'application/JSON' }
            })

            .then(res => {
                this.setState({ menuItems: res.data.Menu })
            })
            .catch(err => console.log(err))
        }

        this.setState({ [state]: value });
    }

    addItems = (index, operationType) => { 
        let total = 0;
        const items = [...this.state.menuItems]; // till now menuitems data will be thrown into items.
        const item = items[index];

        if (operationType == 'add'){
            item.qty += 1;
        }else{
            item.qty -= 1;
        }
        items[index] = item; // after operations, updates value of item & go back to items.

        items.map((x) => {
            total += x.qty * x.price;
        })
        this.setState({ menuItems: items, subtotal: total}) // all the values gets updated here finally
    }

    initPayment = (data) => {
        const options = {
            key: "rzp_test_pkplOvQhHf6vDz",
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,

            handler: async(response) => {
                try {
                    const verifyUrl = "http://localhost:4080/api/payments/verify";
                    const { data } = await axios.post(verifyUrl, response);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    handlePayment = async() => {
        const { subtotal } = this.state;

        try {
            const orderUrl = "http://localhost:4080/api/payments/orders";
            const { data } = await axios.post(orderUrl, { amount: subtotal });

            console.log(data);
            this.initPayment(data.data);
        } catch (error) {
            console.log(error);
        }

    }
   
    render(){
         const { restaurant,galleryModal, menuModal, menuItems, subtotal, formModal } = this.state;
        
        return(
            <div>
                                {/* Navbar - Header part*/}
                {/*<header className="header my-1 mx-1">
                   <span className="one">
                        <a href="Assignment1.html"  className="logo">e!</a>
                    </span>
                    <span className="two">
                        <a href="#" className="login">Login</a>
                        <a href="#" className="acc">Create an account</a>
                    </span>
                </header> */}
                              {/* Body Part */}
                              
            <div>
                <br></br>
                <div>
                    <img alt="" className="site-Img" src={restaurant.thumb}></img>
                    <button className="site-Gal" value="Click to see Image Gallery" onClick={() => this.handleModal('galleryModal', true)}><p>Click to see Image Gallery</p></button>
                </div>
                <div className="site-title">{restaurant.name}</div>
                <br/><br/>

                <div>
                    <ul class="nav hi " id="myTab">
                    <li class="nav-item">
                       <a href="#home" class="nav-link active on1" data-bs-toggle="tab">Overview</a>
                    </li>
                    <li class="nav-item">
                      <a href="#profile" class="nav-link on" data-bs-toggle="tab">Contact</a>
                    </li>
                    <button className="on2" value="Place Online Order" onClick={() => this.handleModal('menuModal', true)}>Place Online Order</button>
                    </ul>
                    <hr/>
  
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="home">
                          <div className= "tab overview">
                            <div className="site-title1">About this place</div> 
                            <div className="final">
                            <div className="two1">
                                <h3>Cuisine:</h3>
                                <p>{restaurant.Cuisine?.map(r => `${r.name} ..  `)}</p>
                            </div><br></br>
                            <div className="two2">
                                <h3>Average Cost:</h3>
                                <p>₹{restaurant.cost} for two people (approx.)</p>
                            </div>
                            </div>
                            </div>   
                    </div>
                    <div class="tab-pane fade" id="profile">
                        <div className="tab contact" > 
                            <div>
                               <h4 style={{fontSize:"20px"}}>Phone number:</h4>
                               <p className="phn"> +91 1145004561</p>
                            </div>
                            <div className="contact2 mt-2">
                               <h4 className="site-title2">{restaurant.name}</h4>
                               <p>{restaurant.locality}</p>
                               <p>{restaurant.address}</p>
                           </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>

                <Modal isOpen={galleryModal} style={customStyles} >
                    <div style={{float: "right", marginBottom: "5px" }} onClick={() => this.handleModal('galleryModal', false)}><i class="bi bi-x-circle-fill"  ></i></div>
                    
                    <Carousel showThumbs={false} showStatus={false} >{/* As per the storybook(NPM -->rresponsive crousel section), we dont require these {false} given features. */}
                        <div >
                            <img src={restaurant.thumb} className="bannerImg"  />
                        </div>
                                   {/* Repeat this <div> part for multiple images to be shown */}
                        <div>
                            <img src={restaurant.thumb} className="bannerImg" />
                        </div>
                    </Carousel>
                        
                </Modal>
                <Modal
                    isOpen={menuModal}
                    style={customStyles}
                >
                    <div>
                        <div style={{float: "right", marginBottom: "5px"}} onClick={() => this.handleModal('menuModal', false)}><i class="bi bi-x-circle-fill"></i></div>
                        <div className="" >
                            <br />
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                            <h3 className="item-total">SubTotal : {subtotal} </h3>
                            <button className="btn btn-danger order-button pay"onClick={() => {
                                this.handleModal('menuModal', false); {/** it means menuModal will closes and formModal will be opened */}
                                this.handleModal('formModal', true);
                            }}> Pay Now</button>
                            {menuItems?.map((item, index) => {
                                return <div style={{ width: '44rem', marginTop: '28px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                    <div className="" style={{ width: '44rem', margin: '' }}>
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <img className="card-img-center title-img" src={`./img/${item.image}`} style={{
                                                    height: '90px',
                                                    width: '90px',
                                                    borderRadius: '5px',
                                                    marginTop: '2px',
                                                    marginLeft: '58px'
                                                }} />
                                                {item.qty == 0 ? <div>
                                                    <button className="add-button" onClick={() => this.addItems(index, 'add')}>Add</button>
                                                </div> :
                                                    <div className="add-number">
                                                        <button onClick={() => this.addItems(index, 'sub')} >-</button>
                                                        <span class="qty">{item.qty}</span>
                                                        <button onClick={() => this.addItems(index, 'add')} >+</button>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>

                            </div>
                        </div>
                    </div>
                        
                </Modal>

                <Modal
                    isOpen={formModal}
                    style={customStyles}
                >
                    <div style={{float: "right", marginBottom: "5px"}} onClick={() => this.handleModal('formModal', false)}><i class="bi bi-x-circle-fill"></i></div>
                    <div>
                        
                        <h2>{restaurant.name}</h2>
                        <div>
                            <label>Name : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Name" />
                        </div>
                        <div>
                            <label>Email : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Email" />
                        </div>
                        <div>
                            <label>Address: </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="text" placeholder="Enter your Address" />
                        </div>
                        <div>
                            <label>Contact Number : </label>
                            <input className="form-control" style={{ width: '400px' }}
                                type="tel" placeholder="Enter your Contact Details" />
                        </div>
                        <button className="btn btn-success"
                            style={{ float: 'right', marginTop: '20px' }} onClick={this.handlePayment} >Proceed</button>
                    </div>
                    
                        
                </Modal>


</div> 
                
        )
    }
}
export default Detail;