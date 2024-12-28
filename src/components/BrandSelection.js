import React from "react";
import { useCustomization } from "./context/CustomizationContext";
import { customizationData } from "../data/customizationData";

const BrandSelection = () => {
  const { customization, updateCustomization } = useCustomization();

  // Find selected brand data
  const selectedBrandData = customizationData.brands.find(
    (brand) => brand.name === customization.brand
  );

  // Handle brand change
  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    updateCustomization("brand", selectedBrand);
    updateCustomization("price", "");
    updateCustomization("case", ""); // Reset case, size, and band when changing brand
    updateCustomization("size", "");
    updateCustomization("band", "");
  };

  // If no brand is selected, prevent accessing `selectedBrandData`
  const selectedCaseImage =
    selectedBrandData?.cases?.find((caseOption) => caseOption.name === customization.case)
      ?.image || null;

  return (
    <div className="section" style={{ textAlign: "center" }}>
      <select
        value={customization.brand || ""}
        onChange={handleBrandChange}
        className="dropdown"
      >
        <option value="" disabled>
          Collections
        </option>
        {customizationData.brands.map((brand) => (
          <option key={brand.name} value={brand.name}>
            {brand.name}
          </option>
        ))}
      </select>

      {/* Display selected brand if available */}
      {customization.brand && selectedBrandData && (
        <div className="selected-brand">
          <h3>Selected Brand:</h3>
          <p>{customization.brand}</p>
          <img src={selectedBrandData.image} alt={customization.brand} />
        </div>
      )}

      {/* Display selected case if available */}
      {customization.case && selectedCaseImage && (
        <div className="selected-size-display">
          <h3>Selected Case:</h3>
          <img src={selectedCaseImage} alt={customization.case} />
        </div>
      )}
    </div>
  );
};

export default BrandSelection;
