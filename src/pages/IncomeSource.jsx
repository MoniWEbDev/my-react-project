import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Weight, Gift, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './IncomeSource.css';

const IncomeSource = () => {
  const { t } = useLanguage();
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
      setError(t('incomeErrorRequiredFields'));
      setSuccess('');
      window.alert(t('incomeAlertRequiredFields'));
      return;
    }

    if (!pickupInfo.fullName.trim()) {
      setError(t('incomeErrorFullName'));
      setSuccess('');
      return;
    }

    if (!phonePattern.test(pickupInfo.phone.trim())) {
      setError(t('incomeErrorPhoneInvalid'));
      setSuccess('');
      return;
    }

    if (pickupInfo.phone.trim() !== pickupInfo.confirmPhone.trim()) {
      setError(t('incomeErrorPhoneMismatch'));
      setSuccess('');
      return;
    }

    if (!pickupInfo.address.trim()) {
      setError(t('incomeErrorAddress'));
      setSuccess('');
      return;
    }

    if (!/^\d{6}$/.test(pickupInfo.pinCode.trim())) {
      setError(t('incomeErrorPinInvalid'));
      setSuccess('');
      return;
    }

    if (!pickupInfo.block.trim() || !pickupInfo.village.trim()) {
      setError(t('incomeErrorBlockVillage'));
      setSuccess('');
      return;
    }

    if (!parsedWeight || parsedWeight <= 0) {
      setError(t('incomeErrorWeightInvalid'));
      setSuccess('');
      window.alert(t('incomeAlertWeightInvalid'));
      return;
    }

    setEntries((prev) => [
      { id: Date.now(), type: wasteType, weight: parsedWeight },
      ...prev,
    ]);
    setWeight('');
    setError('');
    setSuccess(t('incomeSuccessSubmitted'));
    window.alert(t('incomeSuccessAlertSubmitted'));
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
      setError(t('incomeErrorImagesOnly'));
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
      <div className="waste-input-card">
        <h1>{t('incomeSourceTitle')}</h1>
        <p>
          {t('incomeIntro')}
        </p>

        <div className="waste-input-row">
          <select
            value={wasteType}
            onChange={(event) => setWasteType(event.target.value)}
            className="waste-control"
          >
            <option>{t('wasteTypePlastic')}</option>
            <option>{t('wasteTypePaper')}</option>
            <option>{t('wasteTypeMetal')}</option>
            <option>{t('wasteTypeGlass')}</option>
            <option>{t('wasteTypeOrganic')}</option>
            <option>{t('wasteTypeEWaste')}</option>
          </select>

          <div className="weight-field">
            <Weight size={16} />
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder={t('incomeSourceWeight')}
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
            {t('incomeSourceAddEntry')}
          </button>
        </div>

        <div className="pickup-info-card">
          <h3>{t('incomePickupInfoTitle')}</h3>
          <p>{t('incomePickupInfoDesc')}</p>

          <div className="pickup-info-grid">
            <input
              type="text"
              name="fullName"
              placeholder={t('incomeSourceFullName')}
              value={pickupInfo.fullName}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="tel"
              name="phone"
              maxLength="10"
              placeholder={t('incomeSourcePhone')}
              value={pickupInfo.phone}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="tel"
              name="confirmPhone"
              maxLength="10"
              placeholder={t('incomeSourceConfirmPhone')}
              value={pickupInfo.confirmPhone}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="text"
              name="pinCode"
              maxLength="6"
              placeholder={t('incomeSourcePinCode')}
              value={pickupInfo.pinCode}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="text"
              name="block"
              placeholder={t('incomeSourceBlock')}
              value={pickupInfo.block}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="text"
              name="village"
              placeholder={t('incomeSourceVillage')}
              value={pickupInfo.village}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <textarea
              name="address"
              rows="3"
              placeholder={t('incomeAddressPlaceholder')}
              value={pickupInfo.address}
              onChange={handlePickupInputChange}
              className="waste-control pickup-address"
              required
            />
          </div>
        </div>

        <div className="waste-input-footer">
          <label className="upload-btn" htmlFor="photo-upload">
            <Upload size={15} /> {t('incomeUploadPhotos')}
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

          <span className="total-weight">{t('incomeTotalSubmitted')}: {totalSubmitted.toFixed(1)} kg</span>
        </div>

        {error && <p className="waste-error">{error}</p>}
        {success && <p className="waste-success">{success}</p>}

        {uploadedPhotos.length > 0 && (
          <div className="uploaded-photos">
            <h3>{t('incomeUploadedPhotos')}</h3>
            <div className="photo-grid">
              {uploadedPhotos.map((photo) => (
                <figure key={photo.id} className="photo-item">
                  <img src={photo.previewUrl} alt={photo.name} />
                  <figcaption>{photo.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="waste-grid">
        <div className="recent-entries-card">
          <h2>{t('incomeRecentEntries')}</h2>
          <ul>
            {entries.slice(0, 3).map((item) => (
              <li key={item.id}>
                <span>{item.type}</span>
                <strong>{item.weight} kg</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="rewards-card">
          <h2>{t('incomeRewardsTitle')}</h2>
          <p>
            {t('incomeRewardsDesc')}
          </p>
          <div className="rewards-actions">
            <Link to="/gift" className="rewards-link rewards-link-light">
              <Gift size={16} /> {t('incomeViewGifts')}
            </Link>
            <Link to="/profile" className="rewards-link rewards-link-outline">
              <LayoutDashboard size={16} /> {t('incomeOpenDashboard')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomeSource;
