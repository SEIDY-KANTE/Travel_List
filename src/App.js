import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Telephone", quantity: 12, packed: false },
  { id: 4, description: "Alephone", quantity: 12, packed: false },
  { id: 5, description: "Bootl", quantity: 12, packed: false },
];
export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(newItem) {
    setItems(() => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems(() => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(() =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClear() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems(() => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggle={handleToggleItem}
        onClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
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
    setQuantity("");
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

function PackingList({ items, onDeleteItem, onToggle, onClear }) {
  const [sortBy, setSortBy] = useState("");
  let sortedItems;

  switch (sortBy) {
    case "description":
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;
    case "packed":
      sortedItems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
    default:
      sortedItems = items;
      break;
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggle={onToggle}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => {
            //console.log(e.target.value);
            return setSortBy(e.target.value);
          }}
        >
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClear}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numbItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numbItems) * 100);

  if (numbItems === 0)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything Ready to go 🛫"
          : `👜 You have ${numbItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
