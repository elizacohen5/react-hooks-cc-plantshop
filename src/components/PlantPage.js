import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import PlantCard from "./PlantCard";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((plantData) => setPlants(plantData));
  }, []);

  function handleSearchChange(event) {
    const plantSearch = event.target.value;
    setSearch(plantSearch);
    console.log(search);
  }

  const plantsToDisplay = plants.filter((plant) => {
    const lowerCaseSearch = search.toLocaleLowerCase();
    const lowerCasePlant = plant.name.toLocaleLowerCase();
    return lowerCasePlant.includes(lowerCaseSearch);
  });

  function handleUpdatePlant(updatedPlant) {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant;
      } else {
        return plant
      }
    })
    setPlants(updatedPlants)
  }

  function handleDeletePlant(deletedPlant) {
    const updatedPlants = plants.filter(
      (plant) => plant.id !== deletedPlant.id
    );
    setPlants(updatedPlants);
  }

  const plantCardList = plantsToDisplay.map((plant) => {
    return (
      <PlantCard
        key={plant.id}
        plant={plant}
        handleUpdatePlant={handleUpdatePlant}
        handleDeletePlant={handleDeletePlant}
      />
    );
  });

  return (
    <main>
      <NewPlantForm plants={plants} setPlants={setPlants} />
      <Search onSearchChange={handleSearchChange} />
      <PlantList plantCardList={plantCardList} />
    </main>
  );
}

export default PlantPage;
