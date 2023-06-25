import { Routes, Route } from "react-router-dom"
import NavEmployee from "./NavEmployee";
import EmployeeRoutesPage from "./EmployeeRoutesPage/EmployeeRoutesPage";
import EmployeeGymLayout from "./GymLayoutPage/EmployeeGymLayout";



const EmployeeApp = () => {

    return(
        <div>
          <NavEmployee />
          <Routes>
            <Route path="/" element={<EmployeeRoutesPage />}/>
            <Route path="/gym_layout" element={<EmployeeGymLayout />} />
            <Route path="/routes" element={<EmployeeRoutesPage />}/>
          </Routes>
        </div>
      )
}
export default EmployeeApp;