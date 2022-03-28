import React from 'react';
import axios from 'axios';
import "../../App.css"
const ViewDatabase = (props) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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
    fetchData().then(r => console.log(r));
  }, []);

  if (loading) {
    return <div><h2>Loading...</h2></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
console.log(data)
  let mappedData = data.map((item, index) =>(
      <ul key={index}>
        <li >{item.id}</li>
        <li >{item.firstname} {item.lastname}</li>
        <li>{item.person_age}</li>
        <li>{item.hobbies}</li>
      </ul>
  ))
  return (
    <div className="App-header outSide ">
      <div>
          <h2>DataBase Entries</h2>
      {mappedData}
      </div>
    </div>
  );
};
export default ViewDatabase;