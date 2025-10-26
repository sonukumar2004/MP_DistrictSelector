// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';

// const DistrictSelector = ({ onDistrictSelect, selectedDistrict }) => {
//   const [districts, setDistricts] = useState([]);
//   const { t } = useAuth();

//   useEffect(() => {
//     fetchDistricts();
//   }, []);

//   const fetchDistricts = async () => {
//     try {
//       const response = await fetch('/api/districts');
//       const data = await response.json();
//       setDistricts(data);
//     } catch (error) {
//       console.error('Error fetching districts:', error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 high-contrast">
//       <label htmlFor="district-select" className="block text-xl font-semibold mb-4 text-center">
//         {t('selectDistrict')}:
//       </label>
//       <select
//         id="district-select"
//         value={selectedDistrict?.id || ''}
//         onChange={(e) => {
//           const district = districts.find(d => d.id === parseInt(e.target.value));
//           onDistrictSelect(district);
//         }}
//         className="w-full max-w-md mx-auto block px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//       >
//         <option value="">{t('selectDistrict')}</option>
//         {districts.map(district => (
//           <option key={district.id} value={district.id}>
//             {district.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default DistrictSelector;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DistrictSelector = ({ onDistrictSelect, selectedDistrict }) => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useAuth();

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await fetch('/api/districts');
      if (!response.ok) {
        throw new Error('Failed to fetch districts');
      }
      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDistrictName = (district) => {
    return language === 'hindi' ? district.hindiName : district.name;
  };

  const styles = {
    container: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '24px',
      border: '2px solid #e5e7eb'
    },
    label: {
      display: 'block',
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px',
      textAlign: 'center'
    },
    select: {
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
      display: 'block',
      padding: '16px 20px',
      fontSize: '18px',
      border: '2px solid #d1d5db',
      borderRadius: '12px',
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none',
      transition: 'border-color 0.3s, box-shadow 0.3s'
    },
    loading: {
      textAlign: 'center',
      padding: '20px',
      color: '#6b7280'
    },
    spinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '2px solid #f3f4f6',
      borderLeft: '2px solid #2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          {language === 'hindi' ? 'जिले लोड हो रहे हैं...' : 'Loading districts...'}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <label style={styles.label}>
        {language === 'hindi' ? 'जिला चुनें:' : 'Select District:'}
      </label>
      <select
        value={selectedDistrict?.id || ''}
        onChange={(e) => {
          const districtId = e.target.value;
          if (districtId) {
            const district = districts.find(d => d.id === parseInt(districtId));
            onDistrictSelect(district);
          } else {
            onDistrictSelect(null);
          }
        }}
        style={styles.select}
        onFocus={(e) => {
          e.target.style.borderColor = '#2563eb';
          e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d1d5db';
          e.target.style.boxShadow = 'none';
        }}
      >
        <option value="">
          {language === 'hindi' ? '-- जिला चुनें --' : '-- Select District --'}
        </option>
        {districts.map(district => (
          <option key={district.id} value={district.id}>
            {getDistrictName(district)}
          </option>
        ))}
      </select>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default DistrictSelector;