import React from 'react';

function CartPage({ cart }) {
  // Calculate the total price of all products in the cart
  const totalPrice = cart.reduce((total, item) => total + item.mrp * item.quantity, 0);
  const finalPrice = cart.reduce((total, item) => total + item.disrate1 * item.quantity, 0);
  return (
    <div style={cartPageStyle}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Product Name</th>
                <th style={tableHeaderStyle}>Brand</th>
                <th style={tableHeaderStyle}>Quantity</th>
                <th style={tableHeaderStyle}>Price (₹)</th>
                <th style={tableHeaderStyle}>Dis.Rate (₹)</th>
                <th style={tableHeaderStyle}>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id} style={tableRowStyle}>
                  <td style={tableCellStyle}>{item.name}</td>
                  <td style={tableCellStyle}>{item.brand}</td> {/* Display the brand */}
                  <td style={tableCellStyle}>{item.quantity}</td>
                  <td style={tableCellStyle}>{item.mrp}</td>
                  <td style={tableCellStyle}>{item.disrate1}</td>
                  <td style={tableCellStyle}>{item.mrp * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>





          
          <div style={totalPriceContainerStyle}>
            <h3>Total MRP: ₹{totalPrice}</h3>
            <h3>Total Discounted Rate: ₹{finalPrice}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

const cartPageStyle = {
  textAlign: 'center',
  padding: '50px',
};

const tableStyle = {
  width: '80%',
  margin: '0 auto',
  borderCollapse: 'collapse',
};

const tableHeaderStyle = {
  padding: '10px',
  borderBottom: '2px solid #ddd',
  backgroundColor: '#f4f4f4',
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'center',
};

const totalPriceContainerStyle = {
  marginTop: '20px',
  fontSize: '20px',
  fontWeight: 'bold',
};

export default CartPage;
