

function convertToOrderItems(productDetailsArray) {
    const orderItems = productDetailsArray.reduce((acc, productId, index, array) => {
      if (index === 0 || productId !== array[index - 1]) {
        acc.push({ quantity: 1, productDetails: productId });
      } else {
        acc[acc.length - 1].quantity++;
      }
      return acc;
    }, []);
    return orderItems;
  }
  
  module.exports = convertToOrderItems;