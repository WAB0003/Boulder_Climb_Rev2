import React from 'react'
import { Button, Form, Icon, Select } from 'semantic-ui-react'
import { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { currentRoutes, currentUser } from '../../Recoil/routesRecoil'
import VideoOptions from './VideoOptions'

const UpdateRouteForm = ({ route, setSelectedDot }) =>{
    //Pull in required state from Recoil
    const user = useRecoilValue(currentUser)
    const [allRoutes, setAllRoutes] = useRecoilState(currentRoutes)
    const [isActive, setIsActive] = useState(route.active)
    
    // Create state to handle form:
    const [formData, setFormData] = useState({
        name: route.name,
        rating:route.rating,
        active: isActive
      })

    // Destruction state of FormData:
    const { name, rating, active } = formData

    //! Handle form changes
    const handleChange = (e) => {
        setFormData({...formData, 
        [e.target.name]:e.target.value,
        })
    }
    const handleRadioChange=()=>{
        setIsActive(()=>!isActive)
        setFormData({...formData, 
            active:!isActive,
        })
    }

    
    //! Handle Submit
    const handleSubmit = () => {
        //Create new team object that pull information from formData
        const newRouteObj = {
            name: name,
            rating: rating, 
            setter_id: user.id,
            active: active,
          }

        //*Update Route
        fetch (`/routes/${route.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type":"application/json",
            },
            body: JSON.stringify(newRouteObj)
        })
        .then((r)=>r.json())
        .then((updatedRoute)=>{
            // debugger
            const updatedRouteList = allRoutes.map((route)=>{
                if (route.id===updatedRoute.id) {
                    return updatedRoute;
                }else{
                    return route;
                }
            })
            setAllRoutes(()=>updatedRouteList)
        })
    }

    //! Handle Delete
    const handleDeleteClick=()=>{
        fetch(`/routes/${route.id}`,{
        method: "DELETE",
        })
        // .then(r=>r.json())
        .then(()=>handleDeleteRoute(route))
    }

    const handleDeleteRoute = (deletedRoute) =>{
        const updatedRouteList = allRoutes.filter((route)=>route.id !== deletedRoute.id)
        setAllRoutes(()=>updatedRouteList)
    }



    return(
            <div className='updateRouteForm'>
                <h1>Update Route Info</h1>
                <Form  >
                    <Form.Field>
                        <label>Route Name</label>
                        <input placeholder={route.name} name="name" value={name} onChange={handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Rating</label>
                        <input placeholder={route.rating} name="rating" value={rating} onChange={handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Active</label>
                        <Form.Radio toggle  checked={isActive} onChange={handleRadioChange}/>
                    </Form.Field>
                    <div style={{justifyContent:"center", display:"flex"}} >
                        <VideoOptions key={route.id} route = {route} setSelectedDot={setSelectedDot}/>
                    </div>
                    <br></br>
                    <div style={{justifyContent:"center", display:"flex"}} >
                        <Button.Group>
                            <Button type='submit' onClick={handleSubmit} positive>Confirm Update</Button>
                            <Button.Or />
                            <Button onClick={handleDeleteClick} negative>Delete Route</Button>
                        </Button.Group>
                    </div>

                </Form>
            </div>
    )
}

export default UpdateRouteForm