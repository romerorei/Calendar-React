import { addHours } from "date-fns";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"
import { useSelector } from "react-redux";

export const FabAddNew = () => {
  const { setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const { user } = useAuthStore();

  const handleClickNew = () => {
    setActiveEvent(null)
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours( new Date(), 2 ),
      bgColor: '#fafafa',
      user: {
          _id: user.uid,
          name: user.name
      }
    });
    openDateModal();

  }


  return (
    <button
      className="btn btn-primary "
      onClick={ handleClickNew }
    >
      <i className="fas fa-plus"> </i>
      <span>Nuevo evento</span>
    </button>
  )
}
