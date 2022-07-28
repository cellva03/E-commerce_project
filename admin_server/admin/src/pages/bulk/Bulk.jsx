import Sidebar from '../../components/sidebar/Sidebar';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Bulk = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState();

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('csvFile', file);
        axios.post('http://localhost:4002/api/products/bulk', formData)
        .then(res => {
        console.log(res.data.products)
        if(res.data.products){
            alert('CSV Bulk Upload added successfully')
            navigate('/product')
        }
        else{
            alert('Error adding Bulk upload product')
        }
    })
    }
  return (
    <>
    <div className='home_container'>
        <Sidebar />
        <Card sx={{ height: '300px',width: '70%',padding:'100px 20px',margin: '100px auto' }}>
            <form encType='multipart/form-data'>
                <div style={{width:'50%'}}>
                    <label className="new_label">Bulk Upload CSV</label>
                    <input className="new_input" type="file" name="csvFile" onChange={(e)=>{setFile(e.target.files[0])}} required={true}/>
                </div>
                <Button variant="contained" color="primary" sx={{marginTop:'20px'}} type='submit' onClick={onSubmit}>Submit</Button>
            </form>
        </Card>
    </div>  
    </>
)
}

export default Bulk