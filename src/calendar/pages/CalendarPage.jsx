import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns';
import { Navbar } from "../"

import { getMessagesES, localizer } from '../../helpers';


const events = [{
  title: 'Cumpleaños del perro',
  notes: 'Comprar torta',
  start: new Date(),
  end: addHours( new Date(), 0 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando'
  }

}]

export const CalendarPage = () => {

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    console.log({ event, start, end, isSelected });

    const style = {
      backgroudColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    if (isSelected ) return { style };

  }

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
      />
    </>
  )
}
