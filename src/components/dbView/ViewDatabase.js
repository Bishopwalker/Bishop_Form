import React from 'react';
import axios from 'axios';
import "../../App.css"
import {Link} from "react-router-dom"
import './ViewDatabase.css'

const ViewDatabase = (props) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [ghosting, setGhosting] = React.useState('alert');

React.useEffect(() => {

},[error, loading])
    const fetchData = async () => {
        try {
            const result = await axios.get(
                'http://localhost:3003/form/users/'
            );

            setData(result.data);
            setLoading(false);
        } catch (error) {
            setError(error);

            setLoading(false);
        }
    };
const deletePerson = async(id) => {
    console.log(id)
 const result = await axios.delete(`http://localhost:3003/form/used/${id}`)
  console.log(result.data)
      setData(result.data)
  .catch(err => {
    console.log(err)
    setGhosting('alert2')
  })
}
  React.useEffect(() => {


    fetchData().then(r => console.log(r));
  }, []);

  if (loading) {
    return <div className={ghosting}><h2>Loading...</h2></div>;
  }

  if (error) {

         // setGhosting('alert1');
             setTimeout(() => {
            setGhosting('alert2');
          }, 1000);
             setInterval(() => {
            setGhosting('alert');
             },1000)
    return <div className={ghosting}>Error: {error.message}</div>;
  }
console.log(data)
  let mappedData = data.map((item, index) =>(
      <ul key={index}>

        <li >{item.id}</li>
        <li >{item.firstname} {item.lastname}</li>
        <li>{item.person_age}</li>
        <li>{item.hobbies}</li>
          <div className="btn-group">
          <button onClick={()=>deletePerson(item.id)}>Delete</button>
          <button>Edit</button>
              </div>
      </ul>
  ))
  return (
    <div className="App-header outSide ">
      <div>
          <h2>DataBase Entries</h2>
      {mappedData}
          <Link to='/addUser'>
              <button>Return to Form</button>
          </Link>
      </div>
    </div>
  );
};
export default ViewDatabase;