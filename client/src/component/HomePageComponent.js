import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container,Row,Table,Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import json_decode from 'jwt-decode'

const HomePageComponent = () => {

    const [token,setToken]=useState('')
    const [expire,setExpire]=useState('')
    const [notes,setNotes]=useState([])
    const history=useHistory();
    useEffect(()=>{
        refreshToken();
        getAllNotes()
    },[])
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

    const getAllNotes=async(e)=>{
        try{
            const response=await axiosJWT.get('http://localhost:2000/notes',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setNotes(response.data)
        }catch(error){
            if(error.response){
                console.log(error)
            }
        }
    }

  return (
    <Fragment>
        <Container className='mt-5 text-center'>
            <hr />
            <h1>All Notes</h1>
            <Link to="/add-notes">
                <Button variant="secondary">Add Notes</Button>
            </Link>
            <hr />
            <Row>
                <Col>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th></th>
                            <th className='noteTitle'>Title</th>
                            <th className='noteTitle'>Description</th>
                            <th className='noteTitle'>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note,index)=>(
                                <tr key={note.id}>
                                <td>{index+1}</td>
                                <td className='noteTitle'>{note.title}</td>
                                <td className='noteTitle'>{note.description}</td>
                                <td className='noteTitle'>{note.author}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </Fragment>
  )
}

export default HomePageComponent