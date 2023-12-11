import './App.scss';
import Header from './components/Header';
import { Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  }, [])

  return (
    <>
      <div className='app-container'>
        <Header />
        <hr />
        <Container>
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

