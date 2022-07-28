import Sidebar from '../../components/sidebar/Sidebar';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Sales = () => {

  // const [user, setUser] = useState([]);
  const [sales, setSales] = useState([]);
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      fetch('http://localhost:4001/api/sales')
        .then(res => res.json())
        .then(data => {
          console.log(data);  
          setSales(data.sales);
          setLoading(false);
        })
},[])

  return (
    <> 
        <div className='home_container'>
          <Sidebar />
          {
            loading ? 
            <>
              <Stack alignItems="center" sx={{margin: '0 auto'}}>
                <CircularProgress />
              </Stack>
            </>
            :
            <>
              <Card sx={{ width: '100%',marginTop:'20px',display:'flex',flexDirection:'column'}} >
                <CardContent>
                  <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                    Sales And Reports
                  </Typography>
                </CardContent>
                {
                  sales.map((sale,index) => {
                      // console.log(sale);
                      // console.log(products);
                    return (
                    <Card key={index} style={{marginTop:'10px'}}>
                      <CardContent key={index}>
                        <Typography variant="body1" component="p">
                          User {sale.username} brought {sale.products.length} products at {sale.date}
                        </Typography>
                        <Typography variant="body2" component="p">
                          Email : {sale.email}
                        </Typography>
                        {
                          sale.products.map((product,index) => {
                            return (
                              <Typography variant="body2" component="p" key={index}>
                                User {sale.username} brought {product.quantity}  {product.title}
                              </Typography>
                            )
                          })
                        }
                        <Typography variant="body2" component="p">
                          Total Cost : ${sale.cost}
                        </Typography>
                      </CardContent>
                    </Card>
                    )
                  })
                }
              </Card>
              
            </>
          }

        </div>
    </>
  )
}

export default Sales