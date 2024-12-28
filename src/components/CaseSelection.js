import React from "react";
import { useCustomization } from "./context/CustomizationContext";
import { customizationData } from "../data/customizationData";

const CaseSelection = () => {
  const { customization, updateCustomization } = useCustomization();

  // Find the selected brand data
  const selectedBrandData = customizationData.brands.find(
    (brand) => brand.name === customization.brand
  );

  // If no brand is selected, show a message
  if (!selectedBrandData) {
    return <p>Please select a brand first.</p>;
  }

  // Handle case selection and reset the band and size
  const handleCaseClick = (caseOption) => {
    updateCustomization("case", caseOption.name);
    updateCustomization("price", caseOption.price);
    updateCustomization("band", ""); // Reset band when case changes
    updateCustomization("size", ""); // Optionally reset size when case changes
  };

  // Get the selected case image
  const selectedCaseImage =
    selectedBrandData.cases?.find((caseOption) => caseOption.name === customization.case)
      ?.image || null;

  return (
    <div className="section" style={{ textAlign: "center" }}>
      <h2>Select Case</h2>
      <div className="options">
        {selectedBrandData.cases.map((caseOption) => (
          <button
            style={{
              margin: "20px",
              border: "none",
              outline: "none",
              height: "30px",
              padding: "10px",
              backgroundColor: customization.case === caseOption.name ? "#ddd" : "#fff", // Highlight selected option
            }}
            key={caseOption.name}
            className={`option ${
              customization.case === caseOption.name ? "selected" : ""
            }`}
            onClick={() => handleCaseClick(caseOption)}
          >
            {caseOption.name}
          </button>
        ))}
      </div>

      {/* Display selected case image if a case is selected */}
      {customization.case && selectedCaseImage && (
        <div className="selected-case-display">
          <h3>Selected Case:</h3>
          <img src={selectedCaseImage} alt={customization.case} style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default CaseSelection;
