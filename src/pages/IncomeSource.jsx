import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Weight, Gift, LayoutDashboard } from 'lucide-react';
import './IncomeSource.css';

const IncomeSource = () => {
  const [wasteType, setWasteType] = useState('Plastic');
  const [weight, setWeight] = useState('');
  const [entries, setEntries] = useState([
    { id: 1, type: 'Plastic', weight: 5 },
    { id: 2, type: 'Plastic', weight: 7 },
    { id: 3, type: 'Organic', weight: 4 },
  ]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [newEntryAdded, setNewEntryAdded] = useState(false);
  const [pickupInfo, setPickupInfo] = useState({
    fullName: '',
    phone: '',
    confirmPhone: '',
    address: '',
    pinCode: '',
    block: '',
    village: '',
  });

  const totalSubmitted = useMemo(
    () => entries.reduce((sum, item) => sum + item.weight, 0),
    [entries]
  );

  const requiredPickupFields = ['fullName', 'phone', 'confirmPhone', 'address', 'pinCode', 'block', 'village'];
  const isAnyRequiredMissing = requiredPickupFields.some((field) => !pickupInfo[field].trim());
  const isWeightInvalid = !weight || Number(weight) <= 0;
  const isFormIncomplete = isAnyRequiredMissing || isWeightInvalid;

  const handleAddEntry = () => {
    const parsedWeight = Number(weight);
    const phonePattern = /^[6-9]\d{9}$/;

    if (isAnyRequiredMissing) {
      setError('Please fill all required fields before submitting.');
      setSuccess('');
      window.alert('Please fill this: complete all required fields.');
      return;
    }

    if (!pickupInfo.fullName.trim()) {
      setError('Please enter full name.');
      setSuccess('');
      return;
    }

    if (!phonePattern.test(pickupInfo.phone.trim())) {
      setError('Please enter a valid 10-digit phone number.');
      setSuccess('');
      return;
    }

    if (pickupInfo.phone.trim() !== pickupInfo.confirmPhone.trim()) {
      setError('Phone number and confirm phone number must match.');
      setSuccess('');
      return;
    }

    if (!pickupInfo.address.trim()) {
      setError('Please enter address.');
      setSuccess('');
      return;
    }

    if (!/^\d{6}$/.test(pickupInfo.pinCode.trim())) {
      setError('Please enter a valid 6-digit PIN code.');
      setSuccess('');
      return;
    }

    if (!pickupInfo.block.trim() || !pickupInfo.village.trim()) {
      setError('Please enter both block and village details.');
      setSuccess('');
      return;
    }

    if (!parsedWeight || parsedWeight <= 0) {
      setError('Please enter a valid weight greater than 0.');
      setSuccess('');
      window.alert('Please fill this: enter a valid weight.');
      return;
    }

    setEntries((prev) => [
      { id: Date.now(), type: wasteType, weight: parsedWeight },
      ...prev,
    ]);
    setWeight('');
    setError('');
    setSuccess('Form submitted successfully. Your waste pickup details have been saved.');
    setShowSuccess(true);
    setNewEntryAdded(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setTimeout(() => setNewEntryAdded(false), 600);
    window.alert('Successfully submitted. Your waste pickup details have been saved.');
  };

  const handlePickupInputChange = (event) => {
    const { name, value } = event.target;
    setPickupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccess('');
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (!imageFiles.length) {
      setError('Please upload image files only.');
      event.target.value = '';
      return;
    }

    const photoItems = imageFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));

    setUploadedPhotos((prev) => [...photoItems, ...prev].slice(0, 8));
    setError('');
    setSuccess('');
    event.target.value = '';
  };

  return (
    <section className="waste-page">
      <div className="waste-input-card animate-fade-in">
        <h1>Waste Input</h1>
        <p>
          Add household waste manually or upload photos from your phone gallery or camera.
        </p>

        <div className="waste-input-row">
          <select
            value={wasteType}
            onChange={(event) => setWasteType(event.target.value)}
            className="waste-control"
          >
            <option>Plastic</option>
            <option>Paper</option>
            <option>Metal</option>
            <option>Glass</option>
            <option>Organic</option>
            <option>E-Waste</option>
          </select>

          <div className="weight-field">
            <Weight size={16} />
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className="waste-control"
            />
          </div>

          <button
            type="button"
            className="add-entry-btn"
            onClick={handleAddEntry}
            aria-disabled={isFormIncomplete}
          >
            Add Entry
          </button>
        </div>

        <div className="pickup-info-card">
          <h3>Pickup Information</h3>
          <p>Add your contact and address details for doorstep scrap pickup.</p>

          <div className="pickup-info-grid">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={pickupInfo.fullName}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="tel"
              name="phone"
              maxLength="10"
              placeholder="Phone Number"
              value={pickupInfo.phone}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="tel"
              name="confirmPhone"
              maxLength="10"
              placeholder="Confirm Phone Number"
              value={pickupInfo.confirmPhone}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="text"
              name="pinCode"
              maxLength="6"
              placeholder="PIN Code"
              value={pickupInfo.pinCode}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="text"
              name="block"
              placeholder="Block"
              value={pickupInfo.block}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="text"
              name="village"
              placeholder="Village"
              value={pickupInfo.village}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <textarea
              name="address"
              rows="3"
              placeholder="House no, street, area"
              value={pickupInfo.address}
              onChange={handlePickupInputChange}
              className="waste-control pickup-address"
              required
            />
          </div>
        </div>

        <div className="waste-input-footer">
          <label className="upload-btn" htmlFor="photo-upload">
            <Upload size={15} /> Upload Photos
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handlePhotoUpload}
            hidden
          />

          <span className="total-weight">Total submitted: {totalSubmitted.toFixed(1)} kg</span>
        </div>

        {error && <p className="waste-error animate-shake">{error}</p>}
        {success && <p className={`waste-success ${showSuccess ? 'animate-bounce-in' : 'animate-bounce-out'}`}>{success}</p>}

        {uploadedPhotos.length > 0 && (
          <div className="uploaded-photos animate-scale-in">
            <h3>Uploaded Photos</h3>
            <div className="photo-grid">
              {uploadedPhotos.map((photo, index) => (
                <figure key={photo.id} className="photo-item animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <img src={photo.previewUrl} alt={photo.name} />
                  <figcaption>{photo.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="waste-grid">
        <div className="recent-entries-card animate-slide-in-right">
          <h2>Recent Entries</h2>
          <ul>
            {entries.slice(0, 3).map((item, index) => (
              <li key={item.id} className={`animate-slide-in-left ${newEntryAdded && index === 0 ? 'highlight-new' : ''}`} style={{ animationDelay: `${index * 80}ms` }}>
                <span>{item.type}</span>
                <strong>{item.weight} kg</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="rewards-card animate-slide-in-left">
          <h2>Ready to unlock rewards?</h2>
          <p>
            Your rewards are dynamically calculated based on your total recycled weight.
          </p>
          <div className="rewards-actions">
            <Link to="/gift" className="rewards-link rewards-link-light">
              <Gift size={16} /> View Gifts
            </Link>
            <Link to="/profile" className="rewards-link rewards-link-outline">
              <LayoutDashboard size={16} /> Open Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomeSource;
