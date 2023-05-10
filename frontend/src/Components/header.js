import React from "react";
import Modal from 'react-modal';
import '../Styles/filter.css';

const customStyles = {
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
      backgroundColor:"rgb(19 78 73)"
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModal: false
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleLogout = () => {
        window.open("http://localhost:4080/auth/logout", "_self");
    }

    google = () => {
        window.open("http://localhost:4080/auth/google", "_self");
    }
    render() {
        const { loginModal } = this.state;
        const {user} = this.props;
        return(
            <div>
               <header className="header ">
                   <span className="one">
                        <a href="http://localhost:3000"  className="logo">e!</a>
                    </span>{console.log(user)}
                    { !user ? (
                    <span className="two">
                        <a href="#" className="login" onClick={() => this.handleModal('loginModal', true)}>Login</a>
                        <a href="#" className="acc">Create an account</a>
                    </span>) : (
                            <form className="d-flex nav-form"style={{marginLeft:"1050px"}}>
                                <img style={{height: "45px", width: "45px", marginTop:"8px",border:"2px solid skyblue"}} className="circle" src={user.photos[0].value} alt="Avatar" />
                                <a className="text-white p-2" style={{textDecoration:"none", fontSize:"20px", fontStyle:"italic",marginTop:"8px"}}>{user.displayName}</a>
                                <button type="button" class="btn btn-danger" style={{marginTop:"8px"}}
                                   onClick={this.handleLogout} >LogOut</button>
                            </form>
                        )

                    }
                </header>
               <Modal
                isOpen={loginModal}
                style={customStyles}
                >
                <div style={{float: "right", marginTop: "-20px" ,marginRight: "-15px",color: "darkgrey"}} onClick={() => this.handleModal('loginModal', false)}>
                    <i class="bi bi-x-circle-fill"></i>
                </div>
                
                <div className="bg-primary bg-gradient text-white p-3" style={{borderRadius: "10%"}} onClick={this.google}>
                    <i className="bi bi-google p-2" style={{color: "greenyellow", fontSize: "20px"}}></i> GOOGLE
                </div>
                    
               </Modal>
            </div>
            )}}

            export default Header;