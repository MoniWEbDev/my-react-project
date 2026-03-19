import React from 'react';
import { User, Settings, Package, Heart } from 'lucide-react';

const Profile = () => {
  return (
    <div className="placeholder-page fade-in" style={{ padding: '100px 5%', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', background: 'var(--white)', borderRadius: '20px', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '30px', borderBottom: '1px solid #E5E7EB', marginBottom: '30px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--bg-light)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid var(--primary)' }}>
            <User size={50} color="var(--primary-dark)" />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '5px' }}>Eco Warrior</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>eco.warrior@kachrabeche.com</p>
          </div>
        </div>

        {/* Profile Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ padding: '20px', background: 'var(--bg-light)', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '5px' }}>150 kg</h3>
            <p style={{ color: 'var(--text-light)' }}>Scrap Sold</p>
          </div>
          <div style={{ padding: '20px', background: 'var(--bg-light)', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '5px' }}>₹ 3,450</h3>
            <p style={{ color: 'var(--text-light)' }}>Total Earnings</p>
          </div>
          <div style={{ padding: '20px', background: 'var(--bg-light)', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '5px' }}>3</h3>
            <p style={{ color: 'var(--text-light)' }}>Gifts Claimed</p>
          </div>
        </div>

        {/* Profile Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', background: 'var(--bg-light)', border: 'none', borderRadius: '10px', fontSize: '1.1rem', cursor: 'pointer', transition: 'var(--transition)' }} className="profile-action-btn">
            <Package size={24} color="var(--primary-dark)" />
            <span>My Orders & Pickups</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', background: 'var(--bg-light)', border: 'none', borderRadius: '10px', fontSize: '1.1rem', cursor: 'pointer', transition: 'var(--transition)' }} className="profile-action-btn">
            <Heart size={24} color="var(--primary-dark)" />
            <span>Wishlist Rewards</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', background: 'var(--bg-light)', border: 'none', borderRadius: '10px', fontSize: '1.1rem', cursor: 'pointer', transition: 'var(--transition)' }} className="profile-action-btn">
            <Settings size={24} color="var(--primary-dark)" />
            <span>Account Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
