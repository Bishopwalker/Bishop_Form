import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios";

const DatabaseEditForm=()=>{
    const location = useLocation();
    const {from} = location.state
    const [firstName,setFirstName] = useState(''),
        [lastName,setLastName] = useState(''),
        [age,setAge] = useState(''),
        [hobbies,setHobbies] = useState(''),
        [id,setID] = useState(0),
        [person,setPerson] = useState({
            id,
            firstName,
            lastName,
            age,
            hobbies
        });
    console.log(from)
    function handleFirstNameChange(e) {
        e.preventDefault();
        setFirstName(e.target.value)
    }
    function handleLastNameChange(e) {
        e.preventDefault();
        setLastName(e.target.value)
    }
    function handleAgeChange(e) {
        e.preventDefault();
        setAge(e.target.value)
    }
    function handleHobbiesChange(e) {
        e.preventDefault();
        setHobbies(e.target.value)
    }
    const editPerson = async(id) => {
        try {
            const result = await axios.get(`http://localhost:3003/form/user/${id}`)

            setFirstName(result.data[0].firstname)
            setLastName(result.data[0].lastname)
            setAge(result.data[0].person_age)
            setHobbies(result.data[0].hobbies)
            setID(result.data[0].id)
            console.log(result.data[0])
        } catch (err) {
            console.log(err)
        }

    }
    React.useEffect(()=>{

        editPerson(from).then((r)=>console.log(r))
    },[])

    const updatePerson= async(id)=>{
        try {
            const result = await axios.put(`http://localhost:3003/form/user/${id}`,person)
            console.log(result)
        } catch (err) {
            console.log(err)
        }
    }
    return(
        <form>
            <input
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={handleFirstNameChange}
            />
            <input
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={handleLastNameChange}
            />
            <input
                type='number'
                placeholder='Age'
                value={age}
                onChange={handleAgeChange}
            />
            <input
                type='text'
                placeholder='Hobbies'
                value={hobbies}
                onChange={handleHobbiesChange}
            />
            <button>Submit</button>
        </form>
    )
}
export default DatabaseEditForm;