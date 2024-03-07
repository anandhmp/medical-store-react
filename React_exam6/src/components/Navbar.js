import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeUser } from '../store/authSlice';
import axios from 'axios';

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const token = user ? user.token : null; 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    if (user) {
      axios.post(
        'https://medicalstore.mashupstack.com/api/logout',
        {},
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      dispatch(removeUser(user));
      navigate('/');
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar-height bg-light">
      <div className="navbar-brand">
        <p className='display-4'>MEDICO</p>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: 'left' }}>
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
  <NavLink to="/Medical/data/Home" className="nav-link">
           Home
  </NavLink>
</li>


<li className="nav-item">
  <NavLink to="/Medical/data/Medicines" className="nav-link">
          Medicines
  </NavLink>
</li>


          {user ? (
            <li className="nav-item">
              <span className="nav-link" onClick={logout}>
                     Logout
    
                
              </span>
            </li>
          ) :
           (
            <li className="nav-item">
              <NavLink to="/Register" className="nav-link">
                Register
              </NavLink>
            </li>
            
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
