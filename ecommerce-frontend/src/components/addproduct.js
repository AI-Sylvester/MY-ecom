import React, { useState,useRef  } from 'react';
import axios from 'axios';
import './addproduct.css';

function AddProductPage() {
  const [formData, setFormData] = useState({
    barcode: '',
    name: '',
    hsn: '',
    brand: '',
    type: '',
    style: '',
    color: '',
    size: '',
    qty: 0,
    crate: 0,
    mrp: '',
    disrate1: 0,
    disrate2: 0,
    verified: false,
    section: 'Mens',       // Default value
    sectionGroup: 'Men',   // Default value
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const imageInputRef = useRef(null); // Add this ref
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked }); // Use formData instead of product
    } else {
      setFormData({ ...formData, [name]: value }); // Use formData instead of product
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.verified) {
      setError('Please mark the product as verified to proceed.');
      return; // Stop form submission if verified is not checked
    }
    
    setLoading(true); // Set loading state
    setError(''); // Reset error message if any

    // Create FormData object
    const formDataToSend = new FormData();

    // Append product details to FormData
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Append the image if selected
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      // Send data to backend using axios
      const response = await axios.post('http://192.168.1.51:3000/products', formDataToSend);

      // Handle response
      console.log('Form Data Submitted:', response.data);
      console.log('Response:', response); // Add logging to check response

      // Reset the form and state
      setFormData({
        barcode: '',
        name: '',
        hsn: '',
        brand: '',
        type: '',
        style: '',
        color: '',
        size: '',
        qty: 0,
        crate: 0,
        mrp: '',
        disrate1: 0,
        disrate2: 0,
        verified: false,
        section: 'Mens',       // Default value
        sectionGroup: 'Men',   // Default value
      });

      // Reset the image state
      setImage(null);
  // ✅ Reset the file input
  if (imageInputRef.current) {
    imageInputRef.current.value = '';
  }
      alert('Product added successfully! Click OK to continue.');
    } catch (err) {
      // Catch any errors during the axios request
      console.error('Error adding product:', err);
      setError('Failed to add product');
      setSuccess('');
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <h1 className="add-product-page__title">Add Product</h1>
      {error && <p className="add-product-page__error">{error}</p>}
      {success && <p className="add-product-page__success">{success}</p>}
      <form onSubmit={handleSubmit} className="add-product-page__form">
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Barcode:</label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter barcode"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter product name"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">HSN:</label>
          <input
            type="text"
            name="hsn"
            value={formData.hsn}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter HSN"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Brand:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter brand"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter type"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Style:</label>
          <input
            type="text"
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter style"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter color"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Size:</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter size"
          />
        </div>
        <div className="add-product-page__form-group">
    <label className="add-product-page__label">Section:</label>
    <select
      name="section"
      value={formData.section}
      onChange={handleChange}
      className="add-product-page__input"
    >
      <option value="Mens">Mens</option>
      <option value="Womens">Womens</option>
      <option value="Boys">Boys</option>
      <option value="Girls">Girls</option>
    </select>
  </div>
  <div className="add-product-page__form-group">
    <label className="add-product-page__label">Section Group:</label>
    <select
      name="sectionGroup"
      value={formData.sectionGroup}
      onChange={handleChange}
      className="add-product-page__input"
    >
      <option value="Men">Men</option>
      <option value="Women">Women</option>
      <option value="Boys">Boys</option>
      <option value="Girls">Girls</option>
    </select>
  </div>

        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Quantity:</label>
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter quantity"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Crate:</label>
          <input
            type="number"
            name="crate"
            value={formData.crate}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter crate"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">MRP:</label>
          <input
            type="number"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter MRP"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Discount Rate 1:</label>
          <input
            type="number"
            name="disrate1"
            value={formData.disrate1}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter discount rate 1"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Discount Rate 2:</label>
          <input
            type="number"
            name="disrate2"
            value={formData.disrate2}
            onChange={handleChange}
            className="add-product-page__input"
            placeholder="Enter discount rate 2"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Verified:</label>
          <input
            type="checkbox"
            name="verified"
            checked={formData.verified}
            onChange={handleChange}
            className="add-product-page__checkbox"
          />
        </div>
        <div className="add-product-page__form-group">
          <label className="add-product-page__label">Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="add-product-page__file-input"
            ref={imageInputRef}  // Attach the ref here
          />
        </div>
        <div className="add-product-page__form-group">
          <button type="submit" className="add-product-page__submit-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;
