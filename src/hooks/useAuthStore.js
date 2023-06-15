import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";


export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const startLogin = async({ email, password }) => {
    dispatch( onChecking() );

    try {
      const { data } = await calendarApi.post('/auth', { email, password })
      //console.log({ resp })
      localStorage.setItem( 'token', data.token );
      localStorage.setItem( 'userEmail', email );
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( onLogin({ name: data.name, uid: data.uid, email: email }) );

    } catch (error) {
      dispatch( onLogout('Email o password incorrectos') );
      setTimeout(() => {
        dispatch( clearErrorMessage() )
      }, 10);

    }
  }

  const startRegister = async({ name, email, password }) => {
    dispatch( onChecking() );

    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password })
     console.log({ data })
      localStorage.setItem( 'token', data.token );
      localStorage.setItem( 'userEmail', email );
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( onLogin({ name: data.name, uid: data.uid, email: data.email }) );

    } catch (error) {
      console.log(error)
      const message = error.response.data?.msg || '-----' ;
      const statusCode = error.response.status || 'Error';
      dispatch( onLogout( { code: statusCode, message: message }) );
      setTimeout(() => {
        dispatch( clearErrorMessage() )
      }, 10);

    }
  }

  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');
    if ( !token ) return dispatch( onLogout() );

    try {
        const { data } = await calendarApi.get('auth/renew');
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch( onLogin({ name: data.name, uid: data.uid }) );
    } catch (error) {
        localStorage.clear();
        dispatch( onLogout() );
    }

  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());

  }

  return {
    // Propiedades
    errorMessage,
    status,
    user,

    //Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  }

}
