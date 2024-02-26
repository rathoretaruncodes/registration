import { useContext } from "react";
import { UserContext } from "../../context/userContext";

//if the user is not signed in, cannot see the dashboard
export default function Dashboard() {
    const {user} = useContext(UserContext)
  return (
    <div>
        <h1>Dashboard</h1>
        {!!user && (<h2> Hi {user.firstName}!</h2>)}
    </div>
  )
}
//rfc