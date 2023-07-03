import { useState } from "react";

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(e.target);

    if (!description) return;

    const newItem = {
      id: Date.now(), //generate id
      description,
      quantity,
      packed: false,
    };
    //console.log(newItem);
    onAddItem(newItem);

    //init
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😊 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(() => Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num, indx) => (
          <option value={num} key={indx}>
            {num}
          </option>
        ))}
        {/* <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option> */}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) =>
          setDescription(() => {
            //console.log(e.target.value);
            return e.target.value;
          })
        }
      />
      <button>Add</button>
    </form>
  );
}
