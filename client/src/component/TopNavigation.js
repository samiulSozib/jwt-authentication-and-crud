import React,{Fragment} from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import '../assets/css/bootstrap.min.css'
import '../assets/css/custom.css'
import axios from 'axios'

const TopNavigation = () => {
    const history=useHistory()
    



    const Logout=async()=>{
        try{
            await axios.delete('http://localhost:2000/auth/logout')
            history.push('/login')
        }catch(err){
            if(err.response){
                console.log(err)
            }
        }
    }

    
  return (
    <Fragment>
        <Navbar fixed='top' collapseOnSelect expand="lg" variant='black'>
                    <Container>
                    <Navbar.Brand>Samiul Bashar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        
                        </Nav>
                        <Nav>
                            
                            <Nav.Link><NavLink className='navigationItem' to="/">Home</NavLink></Nav.Link>
                            <Nav.Link><NavLink className='navigationItem' to="/profile">Profile</NavLink></Nav.Link>
                            <Nav.Link><NavLink className='navigationItem' to="" onClick={Logout}>Logout</NavLink></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
    </Fragment>
  )
}

export default TopNavigation
