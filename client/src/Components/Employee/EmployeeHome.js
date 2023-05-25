import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table, Container, Icon, Form } from 'semantic-ui-react'
import "../../App.css"
import AddRouteModal from './AddRouteModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentRoutes } from '../../Recoil/routesRecoil';
import UpdateRouteModal from './UpdateRouteModal';
import { currentGyms } from '../../Recoil/gymsRecoil';



const EmployeeHome = () => {
    const [allRoutes, setAllRoutes] = useRecoilState(currentRoutes)
    const allGyms = useRecoilValue( currentGyms )
    const [filterGym, setFilterGym] = useState("All")
    const [sortby,setSortBy] = useState({
                                            order: "regular",
                                            attribute :null
                                        })

    //! handle Filter of Gyms
    let filteredRoutes = allRoutes
    if (filterGym === "All"){
        filteredRoutes = allRoutes
    } else {
        filteredRoutes = allRoutes.filter((route)=>route.gym.name === filterGym)
        // console.log(filteredRoutes)
    }
    

    //! handle the Sorting of items 
    let displayRoutes
    if (sortby.attribute === null){
        displayRoutes = filteredRoutes
    } else if(sortby.order === "regular") {
        const sortedRoutes = [...filteredRoutes].sort((a, b) => {
            return (b[sortby.attribute] - a[sortby.attribute])
        } );
        displayRoutes = sortedRoutes
    } else {
        const sortedRoutes = [...filteredRoutes].sort((a, b) => {
            return (a[sortby.attribute] - b[sortby.attribute])
        } );
        displayRoutes = sortedRoutes
    }

    //! Handle Delete of route
    const handleDeleteClick=(route)=>{
        fetch(`/routes/${route.id}`,{
        method: "DELETE",
        })
        // .then(r=>r.json())
        .then(()=>handleDeleteRoute(route))
    }

    const handleDeleteRoute = (deletedRoute) =>{
        const updatedRouteList = allRoutes.filter((route)=>route.id !== deletedRoute.id)
        setAllRoutes(updatedRouteList)
    }

    const handleFilter = (e) => {
        setFilterGym(e.target.value)
    }

    const handleNumberSorts = (e) => {
        if (sortby.attribute === e.target.value && sortby.order ==="regular"){
            setSortBy({
                order: "reverse",
                attribute: e.target.value})
        }else{
            setSortBy({
                order: "regular",
                attribute: e.target.value})
        }
    }


    //Variable to display all routes as a row in the Table:
    const eachRoute = displayRoutes.map((route) => {
        return (
            <Table.Row key={route.id}>
                <Table.Cell>{route.id}</Table.Cell>
                <Table.Cell>{route.active?"Active":""}</Table.Cell>
                <Table.Cell>{route.name}</Table.Cell>
                <Table.Cell>V-{route.rating}</Table.Cell>
                <Table.Cell>{route.setter.first_name} {route.setter.last_name}</Table.Cell>
                <Table.Cell>{route.gym.name}</Table.Cell>
                <Table.Cell>{route.likes.length}</Table.Cell>
                <Table.Cell>
                    <div className='table_icons' >
                        <UpdateRouteModal route={route}/>
                        <Icon className='table_icon' name='delete' onClick={()=>handleDeleteClick(route)}/>
                    </div>
                </Table.Cell>
            </Table.Row>
        )
    })
    

    return(
        <div>
            <h1 className='User_Page_Titles' >Employee Home</h1>
            <Container className='route_table'  >
                <div className='employee_home_options' >
                    <Form>
                        <Form.Field label="Filter By Gym" control='select' onChange={handleFilter}>
                            <option>All</option>
                            {allGyms.map((each_gym)=><option key={each_gym.id} >{each_gym.name}</option>)}
                        </Form.Field>
                    </Form>
                    {<AddRouteModal />}
                </div >
                <Table celled >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <option className='tableHeaders' value="id" onClick={handleNumberSorts}>ID</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="active" onClick={handleNumberSorts}>Active</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="name" >Name</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="rating" onClick={handleNumberSorts}>Rating</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>Setter</Table.HeaderCell>
                            <Table.HeaderCell>Gym</Table.HeaderCell>
                            <Table.HeaderCell>Likes</Table.HeaderCell>
                            <Table.HeaderCell>Options</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {eachRoute}
                    </Table.Body>
                </Table>
            </Container>
        </div>
    )
}

export default EmployeeHome