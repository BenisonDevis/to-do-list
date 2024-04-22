import { useEffect, useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { GiNotebook } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

function App() {
  const [noteList, setNoteLIst] = useState([
    {
      text: null,
      id: null,
      date: null

    }

  ])
  const [note, setNote] = useState("")
  const [today, SetToday] = useState("")


  useEffect(() => {
    const todays = new Date()
    console.log(todays.toISOString().slice(0, 10).split('-').reverse().join('-'))

    SetToday(todays.toISOString().slice(0, 10))
  }, [today])
  console.log(noteList)
  return (
    <div className='bg-color vh-100 d-flex align-item-center'>
      <div className='border border-2 rounded-3 main-box px-5 py-3'>
        <input onChange={(e) => SetToday(e.target.value)} className='mb-2' type="date" value={today} />
        <h2 className='text-white'>My Note Book <GiNotebook /></h2>
        <div className='d-flex justify-content-center align-item-center'  >
          <div>
            <textarea onChange={(e) => setNote(e.target.value)} placeholder='Enter Your Note Here.....' className='mx-3' name="" id="" cols="50" rows="5"></textarea>

          </div>
          <div className='d-flex div mt-5'>
            <Button onClick={() => setNoteLIst([...noteList, { text: note, id: new Date(), date: today }])} type='submit' className='bg-success'>Add</Button>
          </div>
        </div>

        <div style={{ width: "600px" }} className='border corder-2 border-primary mt-5 rounded ms-2'>
          <div className='m-2 note-main-box'>
            {
              noteList?.length > 0 ? noteList.map((data, i) => {

                return (data.text != null) && (
                  <div className='border text-white m-2 rounded d-flex justify-content-between align-item-center '>
                    <p className='p-2'>{data?.text}</p>
                    <div className=''>
                      <p className='m-0 p-0 mx-2'>{data?.date}</p>
                      <div className='d-flex align-item-end '>
                        <p className='m-0 p-0 mx-3'>{<FaEdit />}</p>
                        <p className='m-0 p-0 mx-3'>{<RiDeleteBin2Line />}</p>
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
