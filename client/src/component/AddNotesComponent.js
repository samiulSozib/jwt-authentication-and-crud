import React, { Fragment, useState,useEffect } from 'react'
import { Col, Container, Row,Form,Button,FloatingLabel } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import json_decode from 'jwt-decode'


const AddNotesComponent = () => {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [author,setAuthor]=useState('')
    const [author_id,setAuthor_id]=useState('')
    const history=useHistory()
    const [token,setToken]=useState('')
    const [expire,setExpire]=useState('')

    useEffect(() => {
        refreshToken()
    }, [])

    const refreshToken=async(e)=>{
        //console.log('refresh token')
        try{
            const response=await axios.get('http://localhost:2000/token')
            //console.log(response)
            if(response.data.access_token){
                //console.log(response.data.access_token)
                setToken(response.data.access_token);
                const decode=json_decode(response.data.access_token);
                setExpire(decode.exp)
                setAuthor(decode.name)
                setAuthor_id(decode.userId)

            }
            else{
                //console.log('no response')
                history.push('/login')
            }
        }catch(e){
            if(e.response){
                console.log(e)
                history.push('/login')
            }
        }
    }

    const axiosJWT=axios.create()

    axiosJWT.interceptors.request.use(async (config)=>{
        const currentData=new Date()
        if(expire*1000<currentData.getTime()){
            const response=await axios.get('http://localhost:2000/token')
            config.headers.Authorization=`Bearer ${response.data.access_token}`
            setToken(response.data.access_token)
            const decode=json_decode(response.data.access_token)
            setExpire(decode.exp)
        }
        //console.log(config)
        return config
    },(error)=>{
        return Promise.reject(error)
    })

    const CreateNote=async(e)=>{
        e.preventDefault();
        try{
            await axiosJWT.post('http://localhost:2000/notes/create',{
                title:title,
                description:description,
                author:author,
                author_id:author_id
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            history.push('/')
        }catch(error){
            if(error.response){
                console.log(error)
            }
        }
    }

  return (
    <Fragment>
        <Container className='mt-5'>
            <hr />
            <h1 className='text-center'>Add Notes</h1>
            <hr />
            <Row>
                <Col lg={6} md={12} sm={12} className='m-auto'>
                    <Form onSubmit={CreateNote}>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label className='addNotesText'>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label className='addNotesText'>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </Fragment>
  )
}

export default AddNotesComponent