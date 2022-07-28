
// Imports a progress bar.
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { FaTrashAlt } from "react-icons/fa";
import { useEffect,useState } from 'react';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import './datatable.css';
import Button from '@mui/material/Button';


const ProductDataTable = () => {

  // Sets the row data to use state.
  const [data, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const row = data;


  // Delete a product
  const handleDelete = (id) => {
    fetch(`http://localhost:4001/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    })
    .then(res => res.json())  
    .then(data => {
      console.log(data);
      setProductData(data.products);
    })
  }


  // Renders a product action button and defining all the colums for DataGrid.
  const columns = [
    { field: 'title', headerName: 'Title', width: 130 },
    {
        field: 'image',
        headerName: 'Image',
        width: 230,
        renderCell: (params) => {
          if(params.row.ProductImage) {
            const buffer = params.row.ProductImage.data.data;
            const b64 = new Buffer(buffer).toString('base64');
              return (
                  <div className="productImg">
                      <img src={`data:image/png;base64,${b64}`} alt="product" width="100" height="100" />
                  </div>
              );
          }
          else{
            return (
              <div className="productImg">
                  <img src={`https://via.placeholder.com/100x100`} alt="product" width="100" height="100" />
              </div>
            );
          }
        }
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
    },
    {
        field: 'stock',
        headerName: 'Stock',
        type: 'number',
        width: 100,
      },
    {
        field: "category",
        headerName: "Category",
        width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const id = params.id;
        return (
          <div className="cellAction">
            <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div>
              <FaTrashAlt style={{fontSize: '22px',color:'rgb(174, 5, 5)',cursor:'pointer'}} onClick={()=>handleDelete(id)}/>
            </div>
          </div>
        );
      },
    }
  ];

  // Fetches the product data from the server.
  useEffect(() => {
    fetch('http://localhost:4001/api/products')
      .then(res => res.json())
      .then(data => {
        setProductData(data.products);
        setLoading(false);
      })
  },[]);

  // Renders the DataGrid and Loader.
  return (
    <div style={{ height: 400, width: '100%' }}>
      {
        loading ? <CircularProgress style={{margin: '200px 300px'}}/> :
        <>
        <Link to='/product/new' style={{textDecoration:'none'}}><Button variant="contained" className='new_btn' style={{margin:'50px 0px 10px 50px'}}>New +</Button></Link>
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

export default ProductDataTable
