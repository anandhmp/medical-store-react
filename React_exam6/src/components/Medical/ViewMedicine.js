import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import { useNavigate } from "react-router-dom"; 

function ViewMedicine() {
  const user = useSelector((store) => store.auth.user);
  const token =user.token;

  const { medId } = useParams();
  const navigate = useNavigate(); 

  const [Med, setMed] = useState({ name: "", company: "", expiry_date: "" });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`https://medicalstore.mashupstack.com/api/medicine/${medId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setMed(response.data);

          const currentDate = new Date();
          const expiryDate = new Date(response.data.expiry_date);

          setIsExpired(expiryDate < currentDate);
        })
        .catch((error) => {
          console.error("Fetching medicine data failed:", error);
        });
    }
  }, [medId, token]);

  const nameColorClass = isExpired ? "text-danger" : "text-success";

  const goToHomePage = () => {
    navigate('/Medical/data/Medicines');
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card mt-5">
              <div className={`card-header ${nameColorClass}`}>
                <h3>name: {Med.name}</h3>
              </div>
              <div className="card-body">
                <p>Company: {Med.company}</p>
                <p>
                  Expiry Date: {Med.expiry_date}{" "}
                  {isExpired ? "(Expired)" : "(Not Expired)"}
                </p>
                <button className="btn btn-primary" onClick={goToHomePage}>Go Home</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ViewMedicine);
