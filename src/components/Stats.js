export default function Stats({ items }) {
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