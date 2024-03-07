import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { checkAuth } from "./../auth/checkAuth";
import MedicineListItem from "./MedicineListItem";

function SearchMedicine() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const [searchResults, setSearchResults] = useState([]);
  const token = user ? user.token : null;

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchText !== "") {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300); 
    return () => clearTimeout(delaySearch);
  }, [searchText]);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://medicalstore.mashupstack.com/api/medicine/search?keyword=${searchText}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      const filteredResults = response.data.filter((medicine) =>
        medicine.name.toLowerCase().startsWith(searchText.toLowerCase())
      );

      setSearchResults(filteredResults);

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center mt-5">
        <div className="col-md-6 text-center">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search medicines"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div>
          <h2>Search Results</h2>
          {searchResults.map((medicine) => (
            <MedicineListItem key={medicine.id} medicine={medicine} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default checkAuth(SearchMedicine);
