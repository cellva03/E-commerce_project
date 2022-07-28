// Importing the necessary components
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


const CouponDataTable = () => {
  // Creating a state variable to store the data
  const [data, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching the data from the API stroted in the state variable
  const row = data;

  // Function for the handleDelete button
  const handleDelete = (id) => {
    fetch(`http://localhost:4001/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    })
    .then(res => res.json())  
    .then(data => {
      console.log(data);
      setUserData(data.users);
    })
  }

  // setting the columns for the data grid
  const columns = [
    { field: 'username', headerName: 'User Name', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 160,
    },
    {
        field: 'discount',
        headerName: 'Discount',
        width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      // creating a button for the action column dynamically
      renderCell: (params) => {
        const id = params.id;
        return (
          <div className="cellAction">
            <Link to={`/discount/${id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
          </div>
        );
      },
    }
  ];
  // Fetching the data from the API when page renders and setting the data in the state variable using useEffect
  useEffect(() => {
    fetch('http://localhost:4001/api/users')
      .then(res => res.json())
      .then(data => {
        setUserData(data.users);
        setLoading(false);
      })
  },[]);
  // console.log(row);

  // Rendering the data grid here
  return (
    <div style={{ height: 400, width: '100%' }}>
      {/* Set the loader component if not the data fetch from api */}
      {
        loading ? <CircularProgress style={{margin: '200px 300px'}}/> :
        <>
        <Link to='/user/new' style={{textDecoration:'none'}}><Button variant="contained" className='new_btn' style={{margin:'50px 0px 10px 50px'}}>New +</Button></Link>
        <DataGrid
        getRowId={(row) => row._id}
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
        </>
      }
    </div>
  )
}

export default CouponDataTable
