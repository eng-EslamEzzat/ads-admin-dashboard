import React from "react";
import {
    Container,
    Form, 
    Button, 
    Navbar, 
    Offcanvas, 
    Nav,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import firebase from 'firebase/compat/app';
import './styles.css'
import {useNavigate} from 'react-router-dom'

const NavBarComponent = () => {
    const {isSignedIn} = useSelector(state => state)
    const navigate = useNavigate();
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
                    {/* <div className="d-grid gap-2"> */}
                        {isSignedIn?
                        //use navigate from react-router-dom that does not reload when clicked
                        <>
                            <Button  variant="light" size="lg" 
                                onClick={()=>navigate('/')}>Home</Button>
                            <Button  variant="light" size="lg" 
                                onClick={()=>navigate('/')}>Ads Models</Button>
                            <Button  variant="light" size="lg" 
                                onClick={()=>navigate('/')}>Showing List</Button>
                            <Button  variant="light" size="lg" 
                                onClick={()=>navigate('/')}>Create New</Button>
                            <Button  variant="danger" size="lg" 
                                onClick={()=> firebase.auth().signOut()}>Sign Out</Button>
                        </>:
                        <>
                            <Button  variant="primary" size="lg"
                                onClick={()=>navigate('/login')}>Login</Button>
                        </>}
                    {/* </div> */}
                    </Nav>
                    <Form className="d-flex">
                    </Form>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};
  export default NavBarComponent