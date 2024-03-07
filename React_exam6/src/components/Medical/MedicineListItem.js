import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MedicineListItem(props) {
  const user = useSelector((store) => store.auth.user);
  const token = user.token;

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const currentTimestamp = Date.now();
    setIsExpired(props.medicine.expiryDate < currentTimestamp);
    console.log("Is Expired:", isExpired);
  }, [props.medicine.expiryDate, isExpired]);

  function deleteMedicine() {
    setIsDeleteConfirmationVisible(false);

    axios
      .delete(`https://medicalstore.mashupstack.com/api/medicine/${props.medicine.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsSuccessModalVisible(true);
        props.refresh();
      })
      .catch((error) => {
        console.error('Failed to delete medicine:', error);
      });
  }

  function handleCloseModal() {
    setIsSuccessModalVisible(false);
  }

  function handleOpenDeleteConfirmation() {
    setIsDeleteConfirmationVisible(true);
  }

  function handleCloseDeleteConfirmation() {
    setIsDeleteConfirmationVisible(false);
  }

  return (
    
    <div className={`card ${isExpired ? 'expired' : ''}`}>
      <div className={`card-body ${isExpired ? 'expired' : ''}`}>
        {props.medicine.name}
        <button className="btn btn-danger float-right" onClick={handleOpenDeleteConfirmation}>
          Delete
        </button>

        <Link to={`/Medical/data/${props.medicine.id}/edit`} className="btn btn-secondary float-right">
          Edit
        </Link>

        <Link to={`/Medical/data/${props.medicine.id}`} className="btn btn-success float-right">
          View
        </Link>
      </div>


      <div
        className={`modal ${isDeleteConfirmationVisible ? 'show' : ''}`}
        role="dialog"
        style={{ display: isDeleteConfirmationVisible ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Confirmation</h5>
              <button type="button" className="close" onClick={handleCloseDeleteConfirmation} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this medicine?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={deleteMedicine}>
                Yes
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteConfirmation}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal ${isSuccessModalVisible ? 'show' : ''}`}
        role="dialog"
        style={{ display: isSuccessModalVisible ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
              <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Medicine deleted successfully!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicineListItem;
