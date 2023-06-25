import "../../App.css"
import React , { useState }  from 'react';
import { Table, Container, Icon, Form, Button } from 'semantic-ui-react'
import { useRecoilState } from 'recoil';
import UpdateRouteModal from './UpdateRouteModal';
import tableSorter from '../tableSorter';
import { currentRoutes } from '../../Recoil/routesRecoil';

const EmployeeHome = () => {
    const [allRoutes, setAllRoutes] = useRecoilState(currentRoutes)
    const [filterActive, setFilterActive] = useState("All")
    const [sortby,setSortBy] = useState({
                                            order: "regular",
                                            attribute :null
                                        })

    //! handle Filter of Active vs NonActive Routes
    let filteredRoutes = allRoutes
    if (filterActive === "All"){
        filteredRoutes = allRoutes
    } else if (filterActive === "Active"){
        filteredRoutes = allRoutes.filter((route)=>route.active)
    } else {
        filteredRoutes = allRoutes.filter((route)=>route.active === false)
    }
    
    //!Created table sorter function that handles specific attributes from tables and sorts accordingly
    const displayRoutes = tableSorter(filteredRoutes, sortby)
    

    //!Handle Functions
    const handleFilter = (e) => {
        setFilterActive(e.target.value)
    }

    const handleSort = (e) => {
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

    const handleTableReset = (e) => {
        setFilterActive("All")
        setSortBy({
            order: "regular",
            attribute :null
        })
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
                <Table.Cell>{route.likes.length}</Table.Cell>
                <Table.Cell>
                    <div className='table_icons' >
                        <UpdateRouteModal route={route}/>
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
                    <div>
                        <div style={{fontWeight:"bold"}} >Filter Options:</div>
                        <div className='table_filter'>
                            <Form className='filter_options' >
                                <Form.Field control='select' onChange={handleFilter}>
                                    <option>All</option>
                                    <option>Active</option>
                                    <option>Not Active</option>
                                </Form.Field>
                            </Form>
                            <Button className='filter_options' onClick={handleTableReset} >Reset Table</Button>
                        </div>
                    </div>
                </div >
                <Table celled >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <option className='tableHeaders' value="id" onClick={handleSort}>ID</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="active" onClick={handleSort}>Active</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="name" onClick={handleSort} >Name</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="rating" onClick={handleSort}>Rating</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="setter" onClick={handleSort}>Setter</option>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <option className='tableHeaders'  value="likes" onClick={handleSort}>Likes</option>
                            </Table.HeaderCell>
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