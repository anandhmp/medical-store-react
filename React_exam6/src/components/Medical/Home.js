import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import SearchMedicine from './SearchMedicine';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../auth/checkAuth';
import { useSelector } from 'react-redux';

function Home() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const token = user ? user.token : null; 
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    if (!token) {
      console.log("response.data",token)
      navigate('/login');
    }
  }, [navigate, token]); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()}`;

  const email = user ? user.email : '';

  return (
    <div>
      <Navbar />
      <SearchMedicine />
      <div className="container-fluid">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          
          
        </div>
        
      </div>
    </div>
  );
}

export default checkAuth(Home);
