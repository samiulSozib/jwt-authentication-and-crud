import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row,Table,Button } from 'react-bootstrap'
import { useHistory,Link } from 'react-router-dom'
import axios from 'axios'
import json_decode from 'jwt-decode'

const ProfilePageComponent = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [id,setId]=useState('')
    const [token,setToken]=useState('')
    const history=useHistory()
    const [expire,setExpire]=useState('')
    const [notes,setNotes]=useState([])


    useEffect(()=>{
        refreshToken();
        getNotes();
        getProfile();
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
    const getProfile=async(e)=>{
        try{
            const response=await axiosJWT.get('http://localhost:2000/users/profile',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setName(response.data.name)
            setId(response.data.id)
            setEmail(response.data.email)
        }catch(error){
            if(error.response){
                console.log(error)
            }
        }
    }

    const getNotes=async(e)=>{
        try{
            const response=await axiosJWT.get('http://localhost:2000/notes/my-notes',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setNotes(response.data)
        }catch(error){
            if(error.response){
                console.log(error)
            }
        }
    }

    const Delete=async(id)=>{
        try{
            await axiosJWT.delete('http://localhost:2000/notes/delete/'+id,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                console.log(res)
                if(res.status==200){
                    history.push("/profile")
                }
            })
            
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
            <Row>
                <Col>
                {/* <h1>User Profile for id: {id}</h1>
                <hr /> */}
                <h3>Name: {name}</h3>
                <h5>Email: {email}</h5>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                <h1>My Notes</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th></th>
                            <th className='profilePageText'>Title</th>
                            <th className='profilePageText'>Description</th>
                            <th className='profilePageText'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note,index)=>(
                                <tr key={note.id}>
                                <td className='profilePageText'>{index+1}</td>
                                <td className='profilePageText'>{note.title}</td>
                                <td className='profilePageText'>{note.description}</td>
                                <td>
                                <Link to={{pathname:"/update-note/",state:{id:note.id}}}><Button className='m-2 profilePageButtonText' variant="primary">Edit</Button></Link>
                                <Link to="">
                                    <Button className='m-2 profilePageButtonText' variant="danger" onClick={()=>Delete(note.id)}>Delete</Button>
                                </Link>
                                
                                </td>
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

export default ProfilePageComponent