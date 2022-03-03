import React, { Fragment, useState } from 'react'
import { Col, Container, Row,Form,Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../assets/css/bootstrap.min.css'
import '../assets/css/custom.css'
import axios from 'axios'

const RegisterComponet = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [msg,setMsg]=useState('')
    const history=useHistory()

    const Register=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:2000/auth/register',{
                name:name,
                email:email,
                password:password
            })
            .then((response)=>{
                console.log(response)
            })
            history.push('/login')
        }catch(error){
            if(error.response){
                console.log(error)
            }
        }
    }
  return (
    <Fragment>
        <Container>
            <h1 className='shadow-sm text-success mt-5 p-3 text-center rounded'>User Registration</h1>
            <Row className='mt-5'>
                <Col lg={6} md={6} sm={12} className='p-5 m-auto shadow-sm'>
                    <Form onSubmit={Register}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className='loginLabelText'>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='loginLabelText'>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='loginLabelText'>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="success" type="submit" className='loginLabelText'>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </Fragment>
  )
}

export default RegisterComponet