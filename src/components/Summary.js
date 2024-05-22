import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PrintButton from "./PrintButton";
import { plans } from "../benefits";

const Summary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedBenefits } = state;

  const calculateTotalPoints = () => {
    let totalPoints = 0;
    Object.entries(selectedBenefits).forEach(([plan, index]) => {
      if (index !== null) {
        const benefit = plans[plan][index];
        totalPoints += benefit.points;
      }
    });
    return totalPoints;
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    Object.entries(selectedBenefits).forEach(([plan, index]) => {
      if (index !== null) {
        const benefit = plans[plan][index];
        totalAmount += benefit.points * benefit.multiplier;
      }
    });
    return totalAmount;
  };

  return (
    <div>
      <h1>Summary</h1>
      <PrintButton />
      <button onClick={() => navigate("/")}>Go Back</button>

      <div id="table-container">
        <table border="1">
          <thead>
            <tr>
              <td colSpan="6" className="Invoice">
                Flexible Benefits Solution - Invoice
              </td>
            </tr>
            <tr>
              <th>Plan</th>
              <th>Benefit</th>
              <th>Description</th>
              <th>Points</th>
              <th>Multiplier</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedBenefits &&
              Object.entries(selectedBenefits).map(([plan, index]) => {
                if (index !== null) {
                  const benefit = plans[plan][index];
                  return (
                    <tr key={`${plan}-${index}`}>
                      <td>{plan}</td>
                      <td>{benefit.name}</td>
                      <td>{benefit.description}</td>
                      <td>{benefit.points}</td>
                      <td>{benefit.multiplier}</td>
                      <td>{benefit.points * benefit.multiplier}</td>
                    </tr>
                  );
                }
                return null;
              })}
            <tr>
              <td></td>
              <td></td>
              <td colSpan="1">Total</td>
              <td>{calculateTotalPoints()}</td>
              <td></td>
              <td colSpan="2">{calculateTotalAmount()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
