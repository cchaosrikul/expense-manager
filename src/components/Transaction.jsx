import Item from "./Item";
import "./Transaction.css";

const Transaction = (props) => {
  const { entries } = props;

  return (
    <div>
      <ul className="item-list">
        {entries.map((element) => (
          <Item key={element.id} {...element} />
        ))}
      </ul>
    </div>
  );
};

export default Transaction;
