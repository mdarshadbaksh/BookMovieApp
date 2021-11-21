import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg'
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
class Header extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }
    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: ""
        });
    }
    render() {
        return(
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movie Logo" />

                    <div className="login-button">
                        <Button variant="contained" color="default">
                            Login
                        </Button>
                    </div>

                    <div className="bookshow-button">
                        <Button variant="contained" color="primary">
                            Book Show
                        </Button>
                    </div>

                </header>
                <Modal>

                </Modal>
            </div>
        )
        
    }
}
export default Header;