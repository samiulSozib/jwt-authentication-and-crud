import React, { Fragment, useState } from 'react'
import { Col, Container, Row,Form,Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import '../assets/css/bootstrap.min.css'
import '../assets/css/custom.css'
import axios from 'axios'

const LoginComponent = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const history=useHistory()

    const Login=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:2000/auth/login',{
                email:email,
                password:password
            })
            .then((response)=>{
                //console.log(response)
            })
            history.push('/profile')
        }catch(error){
            if(error.response){
                console.log(error)
            }
        }
    }
  return (
    <Fragment>
        <Container>
            <h1 className='shadow-sm text-success mt-5 p-3 text-center rounded'>User Login</h1>
            <Row className='mt-5'>
                <Col lg={6} md={6} sm={12} className='p-5 m-auto shadow-sm'>
                    <Form onSubmit={Login}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='loginLabelText'>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='loginLabelText'>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className='loginLabelText'>
                            Submit
                        </Button>
                    </Form>
                    <Container className='text-center'>
                        <p className='loginPageRegisterText'>New User? Please <Link to="/register"><a>register</a></Link> here</p>
                    </Container>
                </Col>
            </Row>
        </Container>
    </Fragment>
  )
}

export default LoginComponent