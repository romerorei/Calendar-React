import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  }


  return (
    <button
      className={`btn fab-danger btn-${hasEventSelected ? 'danger' : 'secondary'} `}
      onClick={ handleDelete }
      disabled={!hasEventSelected}
      style={{
        display: hasEventSelected ? '' : 'none'
      }}

    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
