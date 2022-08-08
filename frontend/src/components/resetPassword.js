
import { Button, FormGroup, InputGroup } from "@blueprintjs/core"
import React, { Fragment,useContext,useState,useEffect } from "react"
import axios from 'axios';
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom";
const Login = () => {
    let { token } = useParams();

  const navigate = useNavigate();
  const [password, setEmail] = useState("")
  const [confirmPassword, setPassword] = useState("")
  const [userContext, setUserContext] = useContext(UserContext)
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/user/password/reset/${token}`, { password,confirmPassword })
      .then((res) => {
        console.log(event)
        alert("Password Changed")
       navigate("/login")
      })
      .catch(err => {
        console.log(event)
        console.log(err)
        alert(err.message)
      }) 
  }
  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="loginemail"
            placeholder="Password"
            type="password"
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Confirm Password" labelFor="confirmPassword">
          <InputGroup
            id="loginpassword"
            placeholder="confirmPassword"
            type="confirmPassword"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          intent="primary"
          text="Change"
          fill type="submit"
        />
      </form>
    </> 
  )
}

export default Login