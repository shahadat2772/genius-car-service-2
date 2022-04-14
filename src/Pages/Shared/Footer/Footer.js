import React from "react";

const data = new Date();
const year = data.getFullYear();

const Footer = () => {
  return (
    <div>
      <p className="text-center mt-4">
        <small>COPYRIGHT ©{year}</small>
      </p>
    </div>
  );
};

export default Footer;
