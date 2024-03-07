import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from 'react-redux'; 
import checkAuth from "../auth/checkAuth";

function AddMedicine() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry, setExpiry] = useState('');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); 
    const navigate = useNavigate();

    const user = useSelector(store => store.auth.user);
    const token = user ? user.token : null; 


    function addMed() {
       

        axios.post('https://medicalstore.mashupstack.com/api/medicine', {
            name: name,
            company: company,
            expiry_date: expiry
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then(response => {
            setIsSuccessModalVisible(true);
            console.log("Medicine added successfully:", response.data);
        })
        .catch(error => {
            console.error('Failed to add medicine:', error);
        });
    }

    function handleCloseModal() {
        setIsSuccessModalVisible(false); 
        navigate('/Medical/data/Medicines'); 
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Add Medicine</h1>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => { setName(event.target.value); }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={company}
                                onChange={(event) => { setCompany(event.target.value); }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <input className="form-control" type="date" value={expiry}
                            onInput={(event)=>{setExpiry(event.target.value)}}></input>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={addMed}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

           
        <div className={`modal ${isSuccessModalVisible ? 'show' : ''}`}  role="dialog" style={{ display: isSuccessModalVisible ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Success</h5>
                            <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Medicine added successfully.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleCloseModal}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(AddMedicine);
