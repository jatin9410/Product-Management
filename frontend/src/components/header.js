import React,{useEffect,useContext} from 'react'
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const [userContext, setUserContext] = useContext(UserContext)
    
    function removeJWToken(){
        navigate("/login");
        localStorage.removeItem("userJWT")
        setUserContext(oldValues => {
            return { ...oldValues, token: null }
        })
    }
    return (
        <>
       {
        !localStorage.getItem("userJWT")?
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home"><Link to="/" style={{ textDecoration: 'none'}}>Inventory</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Container>
    </Navbar>:
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Inventory</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
                <Nav.Link><Link to="/" style={{ textDecoration: 'none', color:'#CCFFFF'}}>Home</Link></Nav.Link>
                <Nav.Link><Link to="/addCat" style={{ textDecoration: 'none' , color:'#CCFFFF'}}>Categories</Link></Nav.Link>
                <Nav.Link><Link to="/profile" style={{ textDecoration: 'none' , color:'#CCFFFF'}}>Profile</Link></Nav.Link>
                {
                localStorage.getItem("userJWT")?( <Nav.Link onClick={removeJWToken} style={{color:'#CCFFFF'}}>Logout</Nav.Link>):( <Nav.Link><Link to="/login" style={{ textDecoration: 'none' , color:'#c9c9c9'}}>Login</Link></Nav.Link>)
                }
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    }
        
        </>
        )
    

}