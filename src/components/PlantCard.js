import React, {useState} from "react";

function PlantCard({ plant, handleUpdatePlant, handleDeletePlant }) {

  const [inStock, setInStock] = useState(true)
  const [updatedPrice, setUpdatedPrice] = useState("");

  function handleClick() {
    setInStock(!inStock);
  }

  function handleChange(event) {
    setUpdatedPrice(event.target.value)
  }

  function handleUpdatePrice(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        price: updatedPrice,
      }),
    })
    .then((r) => r.json())
    // change this to have a handle update plant function defined in PlantPage using plants.map
    .then((updatedPlant) => handleUpdatePlant(updatedPlant));
  }

  function deletePlant() {
    fetch(`http://localhost:6001/plants/${plant.id}`,{
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => handleDeletePlant(plant))
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <form onSubmit={handleUpdatePrice}>
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Update Price" 
          className="update-price" 
          value={updatedPrice}
          onChange={handleChange}
        />
        <button className="update-price-button">Submit</button>
      </form>
      {inStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button id="delete-button" onClick={deletePlant}>X</button>
      <div>
      </div>
    </li>
  );
}

export default PlantCard;
