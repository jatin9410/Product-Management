import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core"
import React, { useContext, useState } from "react"
import axios, { AxiosResponse } from 'axios';
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userContext, setUserContext] = useContext(UserContext)
  const navigate=useNavigate();

  
  const handleSubmit = event => {
    event.preventDefault();

    axios.post(`http://localhost:3000/user/register`, {"name":name,"mobile":mobile,"email":email,"password":password })
      .then(res => {
        alert("User Created");
        navigate("/")
        console.log(res);
          localStorage.setItem("userID", res.data._id)
          localStorage.setItem("userJWT", res.data.token)
        setUserContext(oldValues => {
          return { ...oldValues, token: res.data.token }
        })
      })
      .catch(err => {
        alert(err.message)
      })
  }

  return (
    <>
      <form className="auth-form" Id="create" onSubmit={handleSubmit}>
      <FormGroup label="Set Name" labelFor="name">
          <InputGroup
            id="name"
            type="text"
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </FormGroup>
        <FormGroup label="Set mobile" labelFor="mobile">
          <InputGroup
            id="mobile"
            type="mobile"
            placeholder="Mobile"
            onChange={e => setMobile(e.target.value)}
            value={mobile}
          />
        </FormGroup>
        <FormGroup label="Set Email" labelFor="email">
          <InputGroup
            id="email"
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <FormGroup label="Set Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <Button intent="primary" text="Register" fill type="submit" />
      </form>
    </>
  )
}

export default Register