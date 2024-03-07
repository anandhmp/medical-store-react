import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { checkAuth } from './../auth/checkAuth';
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";

function EditMedicine() {
    const { medId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry, setExpiry] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user);
    const token = user.token;

    useEffect(() => {
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${medId}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then(response => {
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry(response.data.expiry_date); 
        })
        .catch(error => {
            console.error('Failed to fetch medicine data:', error);
        });
    }, [medId, token]);

    function updateMedicine() {
        axios.post(
            `https://medicalstore.mashupstack.com/api/medicine/${medId}`,
            {
                name: name,
                company: company,
                expiry_date: expiry
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            if (response.status === 200) {
                setIsModalVisible(true); 
            } else {
                console.error(' error status:', response.status);
            }
        })
        .catch((error) => {
            console.error('API request failed:', error);
        });
    }

    function handleCloseModal() {
        setIsModalVisible(false);
        navigate('/Medical/data/Medicines'); 
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Edit Medicine</h1>

                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company:</label>
                            <textarea
                                className="form-control"
                                value={company}
                                onChange={(event) => { setCompany(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <input className="form-control" type="date" value={expiry}
                            onInput={(event)=>{setExpiry(event.target.value)}}></input>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={updateMedicine}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

          
            {isModalVisible && (
                 <div className={`modal ${isModalVisible ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalVisible ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edited</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Medicine edited successfully.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleCloseModal}></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default checkAuth(EditMedicine);
