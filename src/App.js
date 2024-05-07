import { useEffect, useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { GiNotebook } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from './axios';

import Swal from 'sweetalert2'



function App() {
  

  const [dataId, setDataId] = useState(false)
  // const navigate = useNavigate();
  const [getList, setGetList] = useState([])

  const [today, SetToday] = useState("")

  const [values, setValues] = useState({
    text: null,
    date: new Date().toISOString()
  })

  const getData = () => {
    axios.get('/create').then((response) => {
   
      try {
        if (response.data.success) {
          setGetList(response.data.data)

        }
      }
      catch (err) {
        console.log('error')
      }
    })
  }

  useEffect(() => {
    
    
  },[values])

  useEffect(() => {
    handleReset()
    getData()
  
  },[])  

  // useEffect(() => {
  //   const todays = new Date()


  //   SetToday(todays.toISOString().slice(0, 10))
  // }, [today])



  const handleChange = (e) => {
    if (e.target.value) {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
  }

  const handleReset = () => {
   
    setValues(
      {
        text: null,
        date: new Date().toISOString()
      }
    )
    
  }

  const handlesEdit = (data) =>{
  
    let temp
    if (data){
      temp = {
        ...data,
      }
      setValues(temp)

    }
    console.log(data,"values:",values)
    setDataId(data?.id)
  }

  const handleDelete = (id) =>{
    try{
        axios.delete(`/updated/${id}/`).then(response =>{
          if (response?.data?.success){
            Swal.fire({
              title: 'Note Deleted Successfully Done',
              timer: 1500,
              showConfirmButton: false,
              icon: 'success'
            })
          }
        })
    } catch(err){

    }
    getData()
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!dataId){
      axios.post('/create/', values).then(response => {
        if (response?.data?.success){
          Swal.fire('Created Successfully created','','success')
          // navigate('/create/')
        }
        else{
          Swal.fire(response?.data?.message,"Failed Try Again",'','error')
        }
  
      }).catch(err => console.log(err))
    }
    else{
      axios.put(`/updated/${dataId}/`,values).then(response =>{
        if (response?.data?.success){
          Swal.fire('Created Successfully Updated','','success')
          // navigate('/create/')
        }
        else{
          Swal.fire(response?.data?.message,"Failed Try Again",'','error')
        }
      })
    }
    
    handleReset()
    getData()
  }

  console.log(values)
  return (
    <div className='bg-color vh-100 d-flex align-item-center'>
      <div className='border border-2 rounded-3 main-box px-5 py-3'>
        <input onChange={(e) => SetToday(e.target.value)} className='mb-2' type="date" value={today} />
        <h2 className='text-white'>My Note Book <GiNotebook /></h2>
        <div className='d-flex justify-content-center align-item-center'  >
          <form onSubmit={handleSubmit}>
            <div>
              <textarea onChange={handleChange} placeholder='Enter Your Note Here.....' className='mx-3' name="text" value={values?.text||""}    cols="50" rows="5"></textarea>
         
            </div>
            <div className='mt-4 d-flex justify-content-end me-3'>
              <Button  type='submit' className='bg-success px-4 py-2'><span className='mb-'>Add</span></Button>
            </div>
          </form>
        </div>

        <div style={{ width: "600px" }} className='border corder-2 border-primary mt-5 rounded ms-2'>
          <div className='m-2 note-main-box'>
            {
              getList?.length > 0 ? getList.map((data, i) => {

                return (data.text != null) && (
                  <div className='border text-white m-2 rounded d-flex justify-content-between align-item-center '>
                    <p className='p-2'>{data?.text}</p>
                    <div className=''>
                      <p className='m-0 p-0 mx-2'>{data?.date?.slice(0, 10).split('-').reverse().join('-')}</p>
                      <div className='d-flex align-item-end '>
                        <p onClick={e => handlesEdit(data)} className='m-0 p-0 mx-3 mouse-hover'>{<FaEdit />}</p>
                        <p onClick={e => handleDelete(data?.id)} className='m-0 p-0 mx-3 mouse-hover'>{<RiDeleteBin2Line />}</p>
                      </div>

                    </div>
                  </div>
                )
              }) : null
            }

          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
