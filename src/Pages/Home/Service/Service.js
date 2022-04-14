import React from "react";
import { useNavigate } from "react-router-dom";
import "./Service.css";

const Service = ({ service }) => {
  const navigate = useNavigate();
  const { name, img, price, description, id } = service;
  return (
    <div className="service-container">
      <img src={img} alt="" />
      <h2>{name}</h2>
      <p>Price: ${price}</p>
      <small>{description}</small>
      <button onClick={() => navigate(`/serviceDetail/${id}`)}>
        Book this Service
      </button>
    </div>
  );
};

export default Service;
