import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {addPerson} from'../ducks/reducer'
 import {dispatchInfo,addPersonFunction, initializedFunction} from "../ducks/actions";
import '../App.css';
import {Link,useNavigate,useLocation} from "react-router-dom";
import axios from "axios";


const AddUser=(props)=>{
    const statePerson = useSelector(state=>state.id);
    const [submit,setSubmit] = useState(false)
    const dispatch = useDispatch();
    const hobbyRef=React.useRef(),
        firstnameRef = React.useRef();
const navigate = useNavigate();
    const [firstname,setFirstName] = useState(''),
        [lastname,setLastName] = useState(''),
        [person_age,setAge] = useState(''),
        [hobbies,setHobbies] = useState(''),
        [id,setID] = useState(''),
        [person,setPerson] = useState({
            firstname,
            lastname,
            person_age,
            hobbies
        }),
        [isMounted,setIsMounted] = useState(false),
        [errors,setErrors] = useState([]),
        [showErrorMessage,setShowErrorMessage] = useState(false),
        [classChoice,setClassChoice] = useState('reset1')

    const error={
       name:'Your first or last name need to be less than 50 characters',
        name_required:'You must enter a first and last name',
        person_age:'Your Age is must be between 1-110 years Old',
        person_age_min:'Your Min person_age must be 18',
        person_age_required:'Please enter a valid person_age over 18',
        hobby_min:'Your Hobbies must be at least 5 characters long',
        hobby_max:'Your Hobbies cannot be longer than 250 characters',
        hobby_required: 'Please include a hobby'
    }
    const fixStr=(str)=>{
            let firstLetter = str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase()

            if(!str){
            setErrors((prev)=>[...prev,error.name_required])
        }

       else if(firstLetter.length > 50) {

          setErrors((prev)=>[...prev,error.name])

        }

        return firstLetter.replace(/\s/g,"_")
    },
        fixAge=(person_age)=>{
        if(person_age>110) {
            setErrors((prev)=>[...prev,error.person_age])
        }
            if(!person_age){
                setErrors((prev)=>[...prev,error.person_age_required])
            }
       else if(person_age<18 && person_age !==undefined){
            setErrors((prev)=>[...prev,error.person_age_min])
        }

        return person_age
        },
        fixHobbies=(hobby)=>{
        if(hobby.length > 250){
            setErrors((prev)=>[...prev,error.hobby_max])
        }
        if(!hobby){
            setErrors((prev)=>[...prev,error.hobby_required])
        }
        else if(hobby.length<5){
            setErrors((prev)=>[...prev,error.hobby_min])
        }
        return hobby
        };

// console.log(errors.length)
    const addNewPerson = async() => {

                  await setID(statePerson)
                  await setPerson({
                      id: id,
                      firstname: fixStr(firstname),
                      lastname: fixStr(lastname),
                      person_age: fixAge(person_age),
                      hobbies: fixHobbies(hobbies)
                  })
    }
const updatePerson=async(peps)=>{
delete peps.id
    console.log(statePerson)
        const results = await axios.put(`http://localhost:3003/form/users/${statePerson}`, peps)
    console.log(results);

}
const isLoggedIn=async()=>{
        const users = await axios.get('http://localhost:3003/auth/check-user')
        console.log(users);

}
useEffect(async()=>{
    firstnameRef.current.focus()
    // await isLoggedIn()
},[])
    useEffect(async()=>{
       dispatch(initializedFunction())

if(isMounted) {
if(errors.length > 0){

  await  setShowErrorMessage(true)
    firstnameRef.current.focus()
    setClassChoice('reset2')


}else {
    setSubmit(true)
  dispatch(addPersonFunction(person))
await updatePerson(person)
    setErrors([])
    setShowErrorMessage(false)
    setTimeout(() => {
        setSubmit(false)
    }, 750)
    return async()=> {
        await setIsMounted(false)
        setClassChoice('reset1')

    }
}
}
    },[person])

    const reset=(e)=>{
        e.preventDefault()
        if(firstname.length ===0 && lastname.length === 0 && person_age.length === 0 && hobbies.length === 0){
            window.alert(`Cannot clear an empty field`)
        }else{
            setFirstName('')
            setLastName('')
            setAge('')
            setHobbies('')

        }
        firstnameRef.current.focus()
    }


    const handleFirstNameChange=async(e)=>{
        e.preventDefault();
     // const {firstname, lastname, person_age, hobbies} = e.target;
        setErrors([]);
        setShowErrorMessage(false)
      await  setFirstName(e.target.value)

    },
        handleLastNameChange=(e)=>{
        e.preventDefault();
            setErrors([]);
            setShowErrorMessage(false)
        setLastName(e.target.value)
        },
        handleAgeChange=(e)=>{
        e.preventDefault();
            setErrors([]);
            setShowErrorMessage(false)
        setAge(e.target.value)
    },
        handleHobbiesChange=(e)=>{
        e.preventDefault();
            setErrors([]);
            setShowErrorMessage(false)
        setHobbies(e.target.value)
        }


    const handleSubmit = async(e) => {
        e.preventDefault();
if(errors.length===0) {
    await setIsMounted(true)
    await addNewPerson()

    setFirstName('')
    setLastName('')
    setAge('')
    setHobbies('')
}else{
    firstnameRef.current.focus()
}


    }
    const logout=async(e) => {
        e.preventDefault();
        await axios.get('http://localhost:3003/auth/logout')
      navigate('/login')
    }
//please this in dropdown menu soon
    //logout
    return(
        <div className="App-header outSide" >
            <div onClick={logout}>Log Out</div>
            <div id='contain'>
                <div id='right'>
            {showErrorMessage ?(
                <div>
                    <h3>Errors</h3>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </div>
            ):null}
                </div>
        <form onSubmit={handleSubmit}>
                    <span id='spans'><h2>Fill Out Form</h2></span>

    <div id='form' >
            <input
                type='text'
                name={firstname}
                placeholder="First Name"
                onChange={handleFirstNameChange}
                value={firstname}
                ref={firstnameRef}

            />
            <input
                type='text'
                name={lastname}
                placeholder="Last Name"
                onChange={handleLastNameChange}
                value={lastname}
            />
            <input
                type={'number'}
                name={person_age}
                placeholder="Age"
                onChange={handleAgeChange}
                value={person_age}
            />
            <input
                type={'text'}
                name={hobbies}
                placeholder="Hobbies"
                onChange={handleHobbiesChange}
                value={hobbies}
                ref={hobbyRef}
            />
        <Link to='/viewDatabase'>
            <button>View Database</button>
        </Link>
    </div>

            <div>
            <button className={classChoice} onClick={reset}>Reset</button>
            <button >Submit Form</button>
            </div>
        </form>
            <Link to='/viewContainer'  >
            <button id='listButton'>See Local List</button>
            </Link>
            {submit?(<div className='green'><h2>You Have Successfully added a Person!</h2></div>):null}
        </div>
        </div>
    )
}


export default AddUser