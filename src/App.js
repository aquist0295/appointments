import { useState, useEffect, useCallback} from "react"
import {BiCalendar } from "react-icons/bi"
import Search from "./Components/Search"
import Addappt from "./Components/Appointments"
import ApptInfo from "./Components/AppointmentInfo"

function App() {
  let[appointmentList, setappointmentList] = useState ([]);
  let[query, setQuery] = useState("");
  let[sortBy, setsortBy] = useState("petName")
  let[orderBy, setOrderBy] = useState("asc")

  const filteredAppt  =  appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) || 
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||  
        item.aptNotes.toLowerCase().includes(query.toLowerCase())  
      )
    }
  ).sort((a,b) =>{
      let order  = (orderBy === "asc") ? 1 : -1;

      return(
        a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ?
        -1 * order : 1 * order
      )
  })

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
     <Search 
      query = {query}
      onQueryChange ={myQuery => setQuery(myQuery)}
      orderBy = {orderBy}
      onOrderByChange = {mySort => setOrderBy(mySort)}
      sortBy = {sortBy}
      onSortByChange = {mySort => setsortBy(mySort)} 
     />

    <ul className ="divide-y divide-gray-200">
        {filteredAppt
          .map(appt =>(
            <ApptInfo key = {appt.id}
            appt = {appt}
            onDeleteAppt = {
              appId =>
              setappointmentList(appointmentList.filter(appointment => 
                appointment.id != appId))
            }
            />

          ))
        }
    </ul>

    </div>
  );
}

export default App;