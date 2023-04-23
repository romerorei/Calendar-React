import { useState } from 'react';

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEventBox, CalendarModal, FabAddNew, Navbar } from "../"

import { getMessagesES, localizer } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';


export const CalendarPage = () => {
  const {events, setActiveEvent} = useCalendarStore();
  const { openDateModal, closeDateModal } = useUiStore();
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
    openDateModal();
    //console.log(events)
  }

  const onSelect = ( event ) => {
   // console.log({ click: event });
   setActiveEvent( event );
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
      <FabAddNew />
    </>
  )
}
