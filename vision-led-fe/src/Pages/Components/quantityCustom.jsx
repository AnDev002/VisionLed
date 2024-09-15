import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeQuantity, getTotalPrice } from '../../Redux/Slides/orderSlide';
export default function QuantityCustom({ value, id }) {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(value);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const onChangeEvent = (e) => {
    const i = e.target.value
    if (!isNaN(i) && i > 0) {
      setQuantity(i);
    }
  }
  useEffect(() => {
    if (!isNaN(quantity) && quantity > 0) {
      dispatch(changeQuantity({ quantity: quantity, productId: id }))
      dispatch(getTotalPrice())
    }
  }, [quantity])
  return (
    <div className="quantity-input">
      <button style={{
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        fontWeight: 'bold',
      }} onClick={decreaseQuantity}>-</button>
      <input type="number" value={quantity} onChange={onChangeEvent} />
      <button style={{
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        fontWeight: 'bold',
      }} onClick={increaseQuantity}>+</button>
    </div>
  );
}
