import React, {useEffect, useState,useCallback,useMemo} from "react";

import data from '../../../data/jobsData.js';



import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import JobDescription from "components/JobDescription/JobDescription.js";

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})




const events = [
  {
      title: "HP",
      allDay: true,
      start: new Date(2022, 10, 2),
      end: new Date(2022, 10, 2),
  },
  {
      title: "Happy",
      start: new Date(2022, 10, 5),
      end: new Date(2022, 10, 5),
  },
  {
      title: "Depression",
      start: new Date(2022, 10, 10),
      end: new Date(2022, 10, 10),
  },
];

const CalendarCard = () => {
  const [myEvents, setEvents] = useState(events)




  const handleSelectSlot =useCallback(
    ({start,end}) => {
      data.forEach(job=>console.log(job));
      const title= window.prompt("new event")
      if (title){
        setEvents((prev)=>[...prev,{start,end,title}])
      }
    },
    [setEvents]
  )

  const handleSelectEvent =useCallback(
    (event) => window.alert(event.title),
    []
  ) 



  console.log('ji');
  data.forEach(job => {
    const end = job.estEnd.replaceAll('/', '-');
    console.log(end);
    const start = new Date(end);
    console.log(start);
    const position = job.company + "-" + job.position;
    events.push({title:position,allDay:true,start:start,end:start});
  })

  console.log(events);

    return (
      <div className="text-blueGray-700">
        <Calendar
        localizer={localizer} 
        events={myEvents} 
        startAccessor="start" 
        endAccessor="end" 
        onSelectEvent ={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        style={{ height: 500, margin: "50px" }} />
        
      </div>
    );
  }
  

  export default CalendarCard;