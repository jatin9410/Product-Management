import { Button, FormGroup, InputGroup } from "@blueprintjs/core"
import React, { useContext,useState,useEffect } from "react"
import axios from 'axios';
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userContext, setUserContext] = useContext(UserContext)
  const handleSubmit = event => {
    event.preventDefault();

    axios.post(`http://localhost:3000/user/login`, { email,password })
      .then(res => {
        if(res.data.token){
          console.log(res.data.token);
          localStorage.setItem("userJWT", res.data.token)
          localStorage.setItem("userID", res.data._id)
          setUserContext(oldValues => {
            return { ...oldValues, token: res.data.token }
          })
          navigate("/")
        }
      })
      .catch(err=>{
        alert("Invalid credentials")
      })

    
  }

  

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="loginemail"
            placeholder="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="loginpassword"
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          intent="primary"
          text="Login"
          fill type="submit"
        />
      </form>
      <Button ><Link to="/forgot" style={{ textDecoration: 'none'}}>Forgot Password</Link></Button>
    </> 
  )
}

export default Login