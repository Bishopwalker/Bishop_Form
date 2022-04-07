import axios from 'axios';
const initialState={
    person:[],
    id:0
}


const ADD_PERSON='ADD_PERSON',
    DELETE_PERSON='DELETE_PERSON',
    VIEW_PERSON='VIEW_PERSON',
    INITIALIZED="INITIALIZED",
    UPDATE_PERSON='UPDATE_PERSON',
    GET_USER='GET_USER';


export function addPerson(person) {
    return {
        type: ADD_PERSON,
        person
    }
}

export function viewPerson(id){
    return{
        type:VIEW_PERSON,
        id
    }
}
export function getUser(user){
    console.log(user)
    return{
        type:GET_USER,
        user
    }
}
const fixStr=(str)=>{
    console.log(str);
    let firstLetter = str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase()
    return firstLetter.replace(/\s/g, "")

}
const founder = (id, arr)=>{
    let newArray=[];
    newArray= arr.find(item=>item.id===id)
    return newArray
}


const postPerson=(person)=> {
    let clone =  JSON.parse(JSON.stringify(person))
    delete clone.id

    console.log(clone)
 axios.post(`http://localhost:3003/form/users/`, clone)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
  const registerPerson=(person)=>{
    let clone =  JSON.parse(JSON.stringify(person))
  // clone.id=initialState.id
console.log(clone)
  //  clone.firstname = fixStr(clone.firstname)
    axios.post(`http://localhost:3003/auth/register/`, clone)
        .then(res => {
            getUser(res.data);
            console.log(res)
        }) .catch(err => {
            console.log(err)
        })
      
}
export function registerUser(userData){
    registerPerson(userData)
    return{
        type:GET_USER,
        userData
    }
}
const addPersonObj= (person )=>{
    let clone =  JSON.parse(JSON.stringify(person))
    clone.id=initialState.id
         postPerson(clone)

    return clone
}
const updatePersonFunction=(person,state)=>{
    let clone =  JSON.parse(JSON.stringify(person))
    //check to see if id exist currently

    let newState = JSON.parse(JSON.stringify(state))
    let checkID = state.person.findIndex(person=>person.id===clone.id)

  newState.person[checkID] = clone
    return newState
}

const filtered = (id,arr)=>{
    let clone = JSON.parse(JSON.stringify(arr))
    let newArray;
    newArray=clone.filter((item,index)=>item.id!==id)

    return  newArray;
}

  const reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'INITIALIZED':
                console.log(state)
                return{
                    ...state,
                }
                case 'GET_USER':
                    let user = action.payload
                    console.log(user)
                    return{
                        ...state,
                        id:action.payload.id,
                        person:[...state.person,action.payload]
                    }
            case 'ADD_PERSON':
                let people = addPersonObj(action.payload)
                initialState.id=++initialState.id
                return {
                    ...state,
                    id:initialState.id,
                    person: [...state.person, people]
                }
            case 'DELETE_PERSON':
                let filteredList = filtered(action.payload,state.person)
                return {
                    ...state,
                    person:[...filteredList]
                }
            case 'UPDATE_PERSON':
                let answer = updatePersonFunction(action.payload,state)

                return{
                    ...state,
                   ...answer
                }

            case 'VIEW_PERSON':
               // let found = state.person.length<2?null:state.person.find(person => person.id === action.payload)
                    let found = founder(action.payload,state.person)
                // let found = state.find(person => person.id === action.payload)
                return {
                    person:[found]
                }
            default:
                return {
                    ...state
                }
        }
    }

    export default reducer;