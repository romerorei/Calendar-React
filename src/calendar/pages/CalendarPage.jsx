import { useState } from 'react';

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns';
import { CalendarEventBox, CalendarModal, Navbar } from "../"

import { getMessagesES, localizer } from '../../helpers';



const events = [{
  title: 'Cumpleaños del perro',
  notes: 'Comprar torta',
  start: addHours( new Date(), 3 ),
  end: addHours( new Date(), 7 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando'
  }

}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    //console.log({ event, start, end, isSelected });

    const style = {
      backgroudColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    if (isSelected ) return { style };

  }

  const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event });
  }

  const onSelect = ( event ) => {
    console.log({ click: event });
  }

  const onViewChanged = ( event ) => {
    //console.log({ viewChanged: event });
    localStorage.setItem('lastView', event);
    setLastView( event )

  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      <CalendarModal />
    </>
  )
}
