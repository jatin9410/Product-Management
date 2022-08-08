import React,{useEffect,useState} from 'react'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table,Button,InputGroup,FormControl } from 'react-bootstrap';
import '../index.css';


export default function Category() {
    const [data, setData] = useState([])
    const [updatedName,setUpdatedName] = useState("")

    useEffect(() => {
        fetch("http://localhost:3000/category/")
        .then(resp => resp.json())
        .then(resp => {
            setData(resp)
        })
    }, [])

    axios.interceptors.request.use(
        config=>{
            config.headers.Authorization = `Bearer ${localStorage.getItem("userJWT")}`;
            return config;
        },
        error=>{
            console.log(error)
        }
    )

    const deleteCategory=(id)=>{
        axios.delete("http://localhost:3000/category/delete",{params: {id: id}}  
        )
        .then(res => {
            window.location.reload(false);
            console.log(res)
        }).catch(err => { 
            if(!localStorage.getItem("userJWT"))
            {
                err.message = "Login First"
            }
            alert(err.message)
           console.log(err)
        })
    }

    const toggleUpdateField=(id)=>{
        axios.put("http://localhost:3000/category/edit",{"name":updatedName},{params: {id: id}}  
        )
        .then(res => {
            window.location.reload(false);
            console.log(res)
        }).catch(err => {
            if(!localStorage.getItem("userJWT"))
            {
                err.message = "Login First"
            }
            alert(err.message) 
           console.log(err)
        })
    }

    const createCategory=()=>{
        axios.post("http://localhost:3000/category/create",{"name":updatedName}
        )
        .then(res => {
            window.location.reload(false);
            console.log(res)
        }).catch(err => { 
            if(!localStorage.getItem("userJWT"))
            {
                err.message = "Login First"
            }
            alert(err.message)
           console.log(err)
        })
    }
    

    function JsonDataDisplay(){
        const DisplayData=data.map((e,i)=> {
            return (
                <tr>
                    <td>{i+1}</td>
                    <td>{e.name}</td>
                    <td><Button variant="warning" onClick={()=>toggleUpdateField(e._id)}>Update</Button> <Button variant="danger" onClick={()=>deleteCategory(e._id)}>Delete</Button></td>
                </tr>
            )
        }
            
        )
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </Table>
        )
    }
    
    return (
        <>
        <div className='indexTable'>
            <div className='updatefields'>
                <p>Enter the updated information first and click Update for the record you want to set the information to.</p>
                <InputGroup className="mb-3">
                    <Button onClick={()=>createCategory()} variant='primary'>Add new</Button>
                    <FormControl aria-label="name" placeholder='Name' onChange={e => setUpdatedName(e.target.value)}/>
                </InputGroup>
            </div>
            <br/>
            {JsonDataDisplay()}
        </div>
        </>
    )
    
    
}