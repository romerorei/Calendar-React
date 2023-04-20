

export const CalendarEventBox = ({ event }) => {
  console.log(event);
  const { title, user } = event;
  return (
    <>
      <strong>{ title }</strong>
      <span> - { user.name }</span>

    </>
  )
}
