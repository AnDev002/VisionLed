import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { changeQuantity, getTotalPrice } from '../../Redux/Slides/orderSlide';
export default function QuantityCustomm({ value, onChangeEvent, increaseQuantity, decreaseQuantity }) {
  

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
      <input type="number" value={value} onChange={onChangeEvent} />
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
