import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { plans } from "../benefits";
import "../App.css";

const initialWalletAmount = 1400;

const BenefitSelection = () => {
  const [selectedBenefits, setSelectedBenefits] = useState({
    Health: null,
    Life: null,
    Accident: null,
  });
  const [walletAmount, setWalletAmount] = useState(initialWalletAmount);
  const navigate = useNavigate();

  const selectBenefit = (plan, benefitIndex) => {
    const updatedSelectedBenefits = { ...selectedBenefits };
    updatedSelectedBenefits[plan] = benefitIndex;

    const tiles = document.querySelectorAll(`#${plan} .benefit-tile`);
    tiles.forEach((tile) => tile.classList.remove("selected"));

    const selectedTile = document.querySelector(
      `#${plan} .benefit-tile:nth-child(${benefitIndex + 1})`
    );
    if (selectedTile) {
      selectedTile.classList.add("selected");
    }
    setSelectedBenefits(updatedSelectedBenefits);
    updateWalletAmount(updatedSelectedBenefits);
  };

  const calculateTotalAmount = (benefits) => {
    return Object.keys(benefits).reduce((total, plan) => {
      const benefitIndex = benefits[plan];
      if (benefitIndex !== null) {
        const benefit = plans[plan][benefitIndex];
        return total + benefit.points * benefit.multiplier;
      }
      return total;
    }, 0);
  };

  const updateWalletAmount = (benefits) => {
    const totalAmount = calculateTotalAmount(benefits);
    setWalletAmount(initialWalletAmount - totalAmount);
  };
  const handleCheckout = () => {
    const missingPlan = Object.keys(selectedBenefits).find(
      (plan) => selectedBenefits[plan] === null
    );

    if (missingPlan) {
      alert(`Please select a benefit for the ${missingPlan} plan.`);
    } else {
      navigate("/summary", {
        state: { selectedBenefits },
      });
    }
  };

  return (
    <div className="container">
      <h1>Flexible Benefits Solution</h1>
      <div id="wallet-amount">
        <h2>Wallet Allocation : {walletAmount >= 0 ? walletAmount : 0}</h2>
      </div>
      <div className="benefit-selection-container">
        <div id="benefit-selection" className="plan-container">
          {Object.keys(plans).map((plan) => (
            <div key={plan} className="plan" id={plan}>
              <h3>{plan} Plan</h3>
              <div className="benefit-tiles">
                {plans[plan].map((benefit, index) => (
                  <div
                    key={index}
                    className={`benefit-tile ${
                      selectedBenefits[plan] === index ? "selected" : ""
                    }`}
                    onClick={() => selectBenefit(plan, index)}
                  >
                    <div className="amount-box">
                      {benefit.points * benefit.multiplier}
                    </div>
                    <p>{benefit.name}</p>
                    <input
                      type="checkbox"
                      checked={selectedBenefits[plan] === index}
                      onChange={() => selectBenefit(plan, index)}
                    />
                    <div className="tile-fotter">
                      <p style={{ color: "dark-blue" }}>Details</p>
                      <p>X{benefit.multiplier}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="summary-table">
          <h2>Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Points</th>
                <th>Multiplier</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(selectedBenefits).map((plan) => {
                const benefitIndex = selectedBenefits[plan];
                if (benefitIndex !== null) {
                  const benefit = plans[plan][benefitIndex];
                  return (
                    <tr key={plan}>
                      <td>{plan}</td>
                      <td>{benefit.points}</td>
                      <td>{benefit.multiplier}</td>
                      <td>{benefit.points * benefit.multiplier}</td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={plan}>
                      <td>{plan}</td>
                      <td>0</td>
                      <td>0</td>
                      <td>Not Selected</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <div className="wallet-summary">
            <table>
              <tbody>
                <tr>
                  <td>Wallet Amount</td>
                  <td>{initialWalletAmount}</td>
                </tr>
                <tr>
                  <td>Used</td>
                  <td>{initialWalletAmount - walletAmount}</td>
                </tr>
                <tr>
                  <td>Available</td>
                  <td>{walletAmount >= 0 ? walletAmount : 0}</td>
                </tr>
                <tr>
                  <td>To Pay</td>
                  <td>{walletAmount < 0 ? Math.abs(walletAmount) : 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default BenefitSelection;
