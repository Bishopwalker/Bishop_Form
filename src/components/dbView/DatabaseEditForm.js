import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from "axios";
import './DatabaseEditForm.css';

const DatabaseEditForm=()=>{
    const location = useLocation();
    const {from} = location.state || {}
    const [firstname,setFirstName] = useState(''),
        [lastname,setLastName] = useState(''),
        [person_age,setAge] = useState(''),
        [hobbies,setHobbies] = useState(''),
        [id,setID] = useState(0),
        [people,setPerson] = useState({
            firstname,
            lastname,
            person_age,
            hobbies
        }),
        [isEdit,setIsEdit] = useState(false);

    const updatePerson= async(id,people)=>{
        await setIsEdit(true);
        try {
            const result = await axios.put(`http://localhost:3003/form/users/${id}`,people)

        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const person = {
            firstname,
            lastname ,
            person_age,
            hobbies
        };
        // console.log(person)
        updatePerson(id,person).then((r)=>setTimeout(()=>setIsEdit(false),3000) )

    }


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
            const result = await axios.get(`http://localhost:3003/form/users/${id}`)

            setFirstName(result.data[0].firstname)
            setLastName(result.data[0].lastname)
            setAge(result.data[0].person_age)
            setHobbies(result.data[0].hobbies)
            setID(result.data[0].id)

        } catch (err) {
            console.log(err)
        }

    }
    React.useEffect(()=>{

        editPerson(from).then((r)=>console.log('I promise to edit'))
    },[])
React.useEffect(()=>{
    setPerson({
        firstname,
        lastname,
        person_age,
        hobbies
    })
},[firstname,lastname,person_age,hobbies])

    return(
        <form onSubmit={handleSubmit} data-testid='helper'>

            <input
                type='text'
                placeholder='First Name'
                value={firstname?firstname:''}
                onChange={handleFirstNameChange}
                
            />

            <input
                type='text'
                placeholder='Last Name'
                value={lastname?lastname:''}
                onChange={handleLastNameChange}
                name='lastname'
            />

            <input
                type='number'
                placeholder='Age'
                value={person_age?person_age:''}
                onChange={handleAgeChange}
                name='person_age'
            />

            <input
                type='text'
                placeholder='Hobbies'
                value={hobbies?hobbies:''}
                onChange={handleHobbiesChange}
                name='hobbies'
            />
            <button>Update User</button>
            <Link to='/viewDatabase'>
                <button>return to db</button>
            </Link>
            {isEdit?
                <div>
                    <h4>id: {id}</h4>
                    <h2>name: {people.firstname}, {people.lastname}</h2>
                    <h2>age: {people.person_age}</h2>
                    <h3>hobbies: {people.hobbies}</h3>
                </div>
                :
                <div>
                    <h1>Loading...</h1>
                </div>
            }
        </form>
    )
}
export default DatabaseEditForm;