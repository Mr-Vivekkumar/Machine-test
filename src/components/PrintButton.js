import React from "react";

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return <button onClick={handlePrint}>Print PDF</button>;
};

export default PrintButton;
