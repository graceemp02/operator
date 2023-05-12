/** @format */

// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Protected = () => {
//   const navigate = useNavigate();
//   const id = localStorage.getItem('op_id');
//   useEffect(() => {
//     if (!id) {
//       navigate('/login');
//     }
//   }, []);
//   return <Layout />;
// };

// export default Protected;


import { Navigate } from 'react-router-dom'
import Layout from '../components/Layout';

const PrivateRoutes = () => {
  const id = localStorage.getItem("op_id");
    return id ? <Layout /> : <Navigate to="/login" />;
}

export default PrivateRoutes

