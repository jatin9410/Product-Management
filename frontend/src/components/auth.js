import { Card, Tab, Tabs } from "@blueprintjs/core"
import { useState,useContext } from "react"
import Login from "./login.js"
import Register from "./register.js"
import { UserContext } from "../context/UserContext";

const AuthPage = () => {
  const [userContext, setUserContext] = useContext(UserContext)

  console.log(userContext.token)

    const [currentTab, setCurrentTab] = useState("login")
    return (
    <Card elevation="1" className="credCard">
        <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
        <Tab id="login" title="Login" panel={<Login />} />
        <Tab id="register" title="Register" panel={<Register />} />
        <Tabs.Expander />
        </Tabs>
    </Card>
  )
}

export default AuthPage