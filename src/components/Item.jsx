import PropTypes from "prop-types";
import "./Item.css";

const Item = (props) => {
  const { transaction, amount } = props;
  const status = amount < 0 ? "expense" : "income";
  const amountSign = amount < 0 ? "-" : "+";

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <li className={status}>
      {transaction}
      <span>
        {amountSign}
        {formatNumber(Math.abs(amount))}฿
      </span>
    </li>
  );
};

Item.propTypes = {
  transaction: PropTypes.string,
  amount: PropTypes.number,
};

export default Item;
