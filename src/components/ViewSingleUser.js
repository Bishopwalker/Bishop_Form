import React from 'react'
import {useLocation,Link} from 'react-router-dom'
import {useSelector}  from "react-redux";
import {connect} from 'react-redux'

const ViewSingleUser=(props)=>{
    const location = useLocation()
    const {from} = location.state || {}
    //{people:{people:[{id:1,name:"",email:""}]}}
//const person = useSelector(state=>state.person[from])
//     console.log(from.person)
//     console.log(from.people.people )
    const people=React.useRef()
    if(from===undefined){
        return(
 <div> <h3>The List is Empty</h3></div>
        )
    }

    const isObjectEmpty=(obj={})=>{
        return Object.keys(obj).length === 0
    }

        people.current = from.people.people.find(item=>item.id===from.person)



    return(
       !isObjectEmpty(people.current) ?
    <div className="App-header outSide ">

        <h2>Full Name: {people.current.firstname} {people.current.lastname}</h2>
        <h2>Age: {people.current.person_age}</h2>
        <h3>Hobbies: {people.current.hobbies}</h3>
        <Link to='/addUser'>Return Back to Form</Link>
        <br></br>
        <Link to='/viewContainer'>
            <button>View List</button>
        </Link>
        <Link to='/editUser' state={{from:{
            current:people.current,
                people:from.people.people

        }}} >
            <button>Edit Person</button>
        </Link>
    </div>:<div>
            <h3>The List is Empty</h3>
                <Link to='/addUser'>Return Back to Form</Link>
            </div>

    )
}
const mapStateToProps = state => ({
    person:state.person
})
export default connect(mapStateToProps,null)(ViewSingleUser)