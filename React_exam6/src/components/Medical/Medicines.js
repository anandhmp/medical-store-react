import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import axios from "axios";
import { checkAuth } from "../auth/checkAuth";
import { useNavigate } from 'react-router-dom';

import MedicineListItem from "./MedicineListItem";

function ListMedicine() {
  const [meds, setMeds] = useState([]);
  const user = useSelector((store) => store.auth.user);
  const token = user ? user.token : null; 
  const navigate = useNavigate();

  const fetchMeds = async () => {
    try {
      const response = await axios.get(
        "https://medicalstore.mashupstack.com/api/medicine",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMeds(response.data);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access. Redirect to login.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchMeds();
    } else {
      console.log("Token is missing");
      navigate("/"); 
    }
  }, [token, navigate]);
  

  return (
    <div>
      <Navbar></Navbar>
      

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Medicines</h1>
          </div>
        </div>
        <div className="row">
        <div className="col-8">
  <Link to="/Medical/data/create" className="btn btn-info mb-2">
    <i className="fas fa-plus"></i> Add Medicine
  </Link>
</div>
        </div>

        <div>
          {meds.map((medicine) => (
            <MedicineListItem key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListMedicine);
