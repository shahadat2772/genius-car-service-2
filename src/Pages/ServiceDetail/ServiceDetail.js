import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h2 className="text-center mt-4">This is detail for: {serviceId}</h2>
      <button
        onClick={() => navigate(`/checkout`)}
        className="border-0 p-1 mt-2 rounded-2"
      >
        Proceed CheckOut
      </button>
    </div>
  );
};

export default ServiceDetail;
