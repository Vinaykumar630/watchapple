import React from "react";
import { useCustomization } from "./context/CustomizationContext";  // Correct the import path
import { customizationData } from "../data/customizationData";

const BandSelection = () => {
  const { customization, updateCustomization } = useCustomization();

  const selectedBrandData = customizationData.brands.find(
    (brand) => brand.name === customization.brand
  );

  if (!selectedBrandData || !selectedBrandData.bands) {
    return <p>No bands available for this brand.</p>;
  }

  const handleBandClick = (bandOption) => {
    updateCustomization("band", bandOption.name);
  };

  const selectedBandImage =
    selectedBrandData.bands.find((bandOption) => bandOption.name === customization.band)?.image ||
    "path/to/default/image.jpg";  // Fallback image

  return (
    <div className="section" style={{ textAlign: "center" }}>
      <h2>Select Band</h2>
      <div className="options">
        {selectedBrandData.bands.map((bandOption) => (
          <button
            key={bandOption.name}
            className={`band-button ${customization.band === bandOption.name ? "selected" : ""}`}
            onClick={() => handleBandClick(bandOption)}
            style={{ margin: "20px", border: "none", outline: "none", height: "30px" }}
          >
            {bandOption.name}
          </button>
        ))}
      </div>

      {customization.band && selectedBandImage && (
        <div className="selected-size-display">
          <h3>Selected Band:</h3>
          <img
            src={selectedBandImage}
            alt={customization.band}
            style={{ width: "350px", height: "300px", maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default BandSelection;
