import "../../App.css"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Link, useNavigate } from "react-router-dom"
import { currentUser } from "../../Recoil/routesRecoil"



export default function NavUser() {
    const user = useRecoilValue(currentUser)
    const updateUser = useSetRecoilState(currentUser)
    const navigate = useNavigate()
    
    

    const handleLogout = () => {
        fetch('/logout', { method: 'DELETE'})
          .then(res => {
            if (res.ok) {
              updateUser(null)
              navigate("/")
            }
          })
     }


    return (
        <nav className="navbar">
            <div className="nav-menu">
                <ul>
                    <li>
                        <h3>Hello, {user.first_name} </h3>
                        <Link className="nav_button_secondary" onClick={handleLogout}>Logout</Link>
                    </li>
                    <li>
                        <Link className="nav_button" to="/climbed_routes">Climbed Routes</Link>
                    </li>
                    <li>
                        <Link className="nav_button" to="/routes">Current Routes</Link>
                    </li>
                    <li>
                        <Link className="nav_button" to="/">Home</Link>
                    </li>
                </ul>
            </div>
         </nav>
    )
}