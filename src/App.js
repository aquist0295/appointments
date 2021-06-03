import { useState, useEffect, useCallback} from "react"
import {BiCalendar } from "react-icons/bi"
import Search from "./Components/Search"
import Addappt from "./Components/Appointments"
import ApptInfo from "./Components/AppointmentInfo"

function App() {
  let[appointmentList, setappointmentList] = useState ([]);

  const fetchData = useCallback (() =>{
    fetch("./AppointmentData.json")
       .then( response => response.json())
       .then(data => {
         setappointmentList(data) 
       });
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="App container mx-auto mt-3 font-thin">
     <h1 className ="text-5xl mb-3">
     <BiCalendar className ="inline-block text-red-400 align-top" /> Your Appointments</h1>
     <Addappt />
     <Search />

    <ul className ="divide-y divide-gray-200">
        {appointmentList
          .map(appt =>(
            <ApptInfo key = {appt.id}
            appt = {appt}
            />

          ))
        }
    </ul>

    </div>
  );
}

export default App;
