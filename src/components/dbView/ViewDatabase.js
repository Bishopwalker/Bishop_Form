import React, {useState} from 'react';
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
    try {
        const result = await axios.delete(`http://localhost:3003/form/users/${id}`)

        setData(result.data)
    }catch(err) {
    console.log(err)
    setGhosting('alert2')
  }
}

  React.useEffect(() => {


    fetchData().then(r => (r));
  }, []);

  if (loading) {
    return <div data-testid='loading' className={ghosting}><h2>Loading...</h2></div>;
  }

  if (error) {

         // setGhosting('alert1');
         //     setTimeout(() => {
         //    setGhosting('alert2');
         //  }, 1000);
             setInterval(() => {
            setGhosting('alert');
             },1000)
    return <div className={ghosting}>Error: {error.message}
        <Link to='/addUser'>
            <span>Return to Form</span>
        </Link>
             </div>;
  }

  let mappedData = data.map((item, index) =>(
      <ul key={index} id='listItem'>
        <li>ID: {item.id}</li>
        <li>Name: {item.firstname} {item.lastname}</li>
        <li>Age: {item.person_age}</li>
        <li>Hobbies: {item.hobbies}</li>

          <div className="btn-group">
          <button onClick={()=>deletePerson(item.id)}>Delete</button>
              <Link to='/editDatabase' state={{from:item.id}}>
          <button  >Edit</button>
              </Link>
              </div>
      </ul>
  ))

    return (
    <div className="db" data-testid="db">
      <div>
          <h2>DataBase Entries</h2>
          <Link to='/addUser'>
              <span>Return to Form</span>
          </Link>
          <br/>
          <div id='dived'>
              <div>
      {mappedData}

              </div>

              <div>


              </div>
          </div>

      </div>

    </div>
  );
};
export default ViewDatabase;