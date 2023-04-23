import { FabAddNew } from "./FabAddNew"

const Test = () => (
  console.log('PRESS Salir')
)
export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">

      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group me-2" role="group" aria-label="First group">
          <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            Reinaldo Romero
          </span>
        </div>
        <div class="btn-group me-2" role="group" aria-label="Second group">
          <FabAddNew />
        </div>
      </div>

      <button onClick={Test} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  )
}
