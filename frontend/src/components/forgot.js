import { Button, FormGroup, InputGroup } from "@blueprintjs/core"
import React, { useContext,useState,useEffect } from "react"
import axios from 'axios';
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [userContext, setUserContext] = useContext(UserContext)
  const handleSubmit = event => {
    event.preventDefault();

    axios.post(`http://localhost:3000/user/password/forgot`, {email})
      .then(res => {
        alert("Mail was successfully sent to your email address")
        navigate("/")
      }).catch(err=>{
        alert(err)
        console.log(err)
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
           <Button
          intent="primary"
          text="forgot"
          fill type="submit"
        />
      </form>
    </> 
  )
}

export default Login