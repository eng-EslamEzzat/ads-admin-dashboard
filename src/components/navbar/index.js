import React from "react";
import {
    Container,
    Button, 
    Navbar, 
    Offcanvas, 
    Nav,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import firebase from 'firebase/compat/app';
import './styles.css'

const NavBarComponent = () => {
    const {isSignedIn} = useSelector(state => state)
    const navigate = useNavigate();

    // using bootstrap navbar with offcanvas
    return (
        <Navbar bg="light" variant="light" expand={false} fixed="top">
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand>
                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="start"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3 gap-2 glex-bottom">
                        {/* check if the user is signed in or not and render right buttons */}
                        {isSignedIn?
                        //use navigate from react-router-dom that does not reload when clicked
                        <>
                            <Button  variant="light" size="lg" 
                                onClick={()=>navigate('/')}>Home</Button>
                            <Button  variant="light" size="lg" 
                                onClick={()=>navigate('/models')}>List View</Button>
                            <Button  variant="light" size="lg" 
                                onClick={()=>navigate('/create')}>Create New</Button>
                            <br/><br/>
                            <Button  variant="danger" size="lg" 
                                onClick={()=> {firebase.auth().signOut(); navigate('/login')}}
                                >Sign Out</Button>
                        </>:
                        <>
                            <Button  variant="primary" size="lg"
                                onClick={()=>navigate('/login')}>Login</Button>
                        </>}
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};
  export default NavBarComponent