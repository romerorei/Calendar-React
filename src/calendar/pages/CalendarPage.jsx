import { useState } from 'react';

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEventBox, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"

import { getMessagesES, localizer } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


export const CalendarPage = () => {
  const { user } = useAuthStore();
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
  const { openDateModal, closeDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    //console.log({ event, start, end, isSelected });

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style };
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

  useEffect(() => {

    startLoadingEvents()
  }, [])


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
      <FabDelete />
    </>
  )
}
