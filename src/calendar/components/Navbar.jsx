import { useAuthStore } from "../../hooks";
import { FabAddNew } from "./FabAddNew"


export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  const logoutSubmit = () => {
    startLogout();
    console.log('PRESS Salir')
  }
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">

      <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group me-2" role="group" aria-label="First group">
          <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            {user.name }
          </span>
        </div>
        <div className="btn-group me-2" role="group" aria-label="Second group">
          <FabAddNew />
        </div>
      </div>

      <button onClick={logoutSubmit} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  )
}
