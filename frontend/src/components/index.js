import React,{useEffect,useState} from 'react'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table,Button,InputGroup,FormControl,Dropdown } from 'react-bootstrap';
import '../index.css';
import { useNavigate } from "react-router-dom";


export default function Index() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [data, setData] = useState([])
    const [updateFieldToggle, setUpdateFieldToggle] = useState(false)
    const [updatedName,setUpdatedName] = useState("")
    const [updatedPrice,setUpdatedPrice] = useState("")
    const [updatedAvl,setUpdatedAvl] = useState("")
    const [updatedCat,setUpdatedCat] = useState("")

    useEffect(() => {
        fetch("http://localhost:3000/product/")
        .then(resp => resp.json())
        .then(resp => {
            setData(resp)
        })
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/category/")
        .then(resp => resp.json())
        .then(resp => {
            setCategories(resp)
        })
    }, [])

    axios.interceptors.request.use(
        config=>{
            config.headers.Authorization = `Bearer ${localStorage.getItem("userJWT")}`;
            return config;
        },
        error=>{
            alert(error.message);
            console.log(error)
        }
    )

    const deleteState=(id)=>{
        axios.delete("http://localhost:3000/product/delete",{params: {id: id}}  
        )
        .then(res => {
            window.location.reload(false);
            console.log(res)
        }).catch(err => { 
            if(!localStorage.getItem("userJWT"))
            {
                err.message = "Login First"
            }
            alert(err.message);
           console.log(err)
        })
    }

    const toggleUpdateField=(id)=>{
        axios.put("http://localhost:3000/product/edit",{"name":updatedName,"price":updatedPrice,"availability":updatedAvl,"category":updatedCat},{params: {id: id}}  
        )
        .then(res => {
            window.location.reload(false);
            console.log(res)
        }).catch(err => { 
            if(!localStorage.getItem("userJWT"))
            {
                err.message = "Login First"
            }
            alert(err.message);
           console.log(err)
        })
    }

    const createProduct=()=>{
        axios.post("http://localhost:3000/product/create",{"name":updatedName,"price":updatedPrice,"availability":updatedAvl,"category":updatedCat}
        )
        .then(res => {
            window.location.reload(false);
            console.log(res)
        }).catch(err => { 
            if(!localStorage.getItem("userJWT"))
            {
                err.message = "Login First"
            }
            alert(err.message);
           console.log(err)
        })
    }

    const updateCategory=(id)=>{
        setUpdatedCat(id)
    }

    function catDropdown(){
        const dropdownData = categories.map((e,i)=>{
            return (
                <Dropdown.Item onClick={()=>updateCategory(e._id)}>{e.name}</Dropdown.Item>
            )
        })

        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {dropdownData}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    

    function JsonDataDisplay(){
        const DisplayData=data.map((e,i)=> {
            let cat
            categories.map((p,i)=>{
                if(p._id == e.category){
                    cat = p.name
                    
                }
            })

            return (
                <tr>
                    <td>{i+1}</td>
                    <td>{e.name}</td>
                    <td>{e.price}</td>
                    <td>{e.availability}</td>
                    <td>{cat}</td>
                    <td><Button variant="warning" onClick={()=>toggleUpdateField(e._id)}>Update</Button> <Button variant="danger" onClick={()=>deleteState(e._id)}>Delete</Button></td>
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
                    <th>Price</th>
                    <th>Availability</th>
                    <th>Category</th>
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
        {!localStorage.getItem("userJWT")?
        (
           navigate("/login")
        ):
        (
           <div className='indexTable'>
            <div className='updatefields'>
                <p>Enter the updated information first and click Update for the record you want to set the information to.</p>
                <InputGroup className="mb-3">
                    <Button onClick={()=>createProduct()} variant='primary'>Add new</Button>
                    <FormControl aria-label="name" placeholder='Name' onChange={e => setUpdatedName(e.target.value)}/>
                    <FormControl aria-label="price" placeholder='Price' onChange={e => setUpdatedPrice(e.target.value)} />
                    <FormControl aria-label="availability" placeholder='Availability' onChange={e => setUpdatedAvl(e.target.value)} />    {/* <FormControl aria-label="category" placeholder='Category' onChange={e => setUpdatedCat(e.target.value)}> */}
                        {catDropdown()}
                </InputGroup>
            </div>
            <br/>
            {JsonDataDisplay()}
        </div>
        )
        }
        </>
    )
    

    
}