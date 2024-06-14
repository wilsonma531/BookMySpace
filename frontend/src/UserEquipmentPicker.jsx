import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserEquipmentPicker({ setSelectedEquipmentNames, setGreatestTesterRequired }) {
  const [equipmentList, setEquipmentList] = useState([]);
  const [selections, setSelections] = useState([{ selectedEquipment: '', testerRequired: 0 }]);

  useEffect(() => {
    axios.get('http://localhost:7001/api/equipment')
      .then(response => {
        setEquipmentList(response.data);
      })
      .catch(error => {
        console.error('Error fetching equipment data:', error);
      });
  }, []);

  const handleEquipmentChange = (index, event) => {
    const selectedName = event.target.value;
    const updatedSelections = [...selections];
    updatedSelections[index].selectedEquipment = selectedName;

    const selectedEquipmentObj = equipmentList.find(equipment => equipment.name === selectedName);

    if (selectedEquipmentObj) {
      updatedSelections[index].testerRequired = selectedEquipmentObj.tester_required;
    } else {
      updatedSelections[index].testerRequired = 0;
    }

    setSelections(updatedSelections);
    updateTotals(updatedSelections);
  };

  const addMoreSelections = () => {
    setSelections([...selections, { selectedEquipment: '', testerRequired: 0 }]);
  };

  const updateTotals = (selections) => {
    const greatestTesterRequired = Math.max(...selections.map(selection => selection.testerRequired));
    const selectedEquipmentNames = selections
      .filter(selection => selection.selectedEquipment)
      .map(selection => selection.selectedEquipment)
      .join('+ ');

    setGreatestTesterRequired(greatestTesterRequired);
    setSelectedEquipmentNames(selectedEquipmentNames);
  };

  return (
    <div>
       
      {selections.map((selection, index) => (
        <div key={index}>
          <label htmlFor={`equipment-${index}`}>Select Equipment:</label>
          <select
            id={`equipment-${index}`}
            value={selection.selectedEquipment}
            onChange={(event) => handleEquipmentChange(index, event)}
          >
            <option value="">Select</option>
            {equipmentList.map(equipment => (
              <option key={equipment.id} value={equipment.name}>
                {equipment.name}
              </option>
            ))}
          </select>
          {selection.testerRequired !== 0 && (
            <p>Tester Required: {selection.testerRequired}</p>
          )}
        </div>
      ))}
      <button onClick={addMoreSelections}>+ Add more</button>
    </div>
  );
}

export default UserEquipmentPicker;
