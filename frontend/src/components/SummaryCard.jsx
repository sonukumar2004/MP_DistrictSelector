// import React from 'react';

// const SummaryCard = ({ title, value, change, icon, onSpeak }) => {
//   const isPositive = change >= 0;

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 high-contrast border-2 border-gray-200 hover:border-blue-500 transition-all duration-300">
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex items-center space-x-3">
//           <span className="text-3xl">{icon}</span>
//           <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
//         </div>
//         <button
//           onClick={onSpeak}
//           className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors btn-large"
//           aria-label="Read aloud"
//         >
//           🔊
//         </button>
//       </div>
      
//       <div className="flex items-end justify-between">
//         <div>
//           <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
//           <div className={`flex items-center space-x-1 ${
//             isPositive ? 'text-green-600' : 'text-red-600'
//           }`}>
//             <span className={`text-lg ${isPositive ? '▲' : '▼'}`}>
//               {isPositive ? '↗' : '↘'}
//             </span>
//             <span className="text-lg font-semibold">
//               {Math.abs(change)}%
//             </span>
//             <span className="text-sm">from last month</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SummaryCard;

import React from 'react';

const SummaryCard = ({ title, value, change, icon, onSpeak }) => {
  const isPositive = change >= 0;

  const styles = {
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      border: '2px solid #e5e7eb',
      transition: 'all 0.3s ease'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    titleSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    icon: {
      fontSize: '32px'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937'
    },
    speakButton: {
      padding: '12px',
      backgroundColor: '#dbeafe',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      minHeight: '48px',
      minWidth: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    value: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    change: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '16px'
    },
    positiveChange: {
      color: '#059669'
    },
    negativeChange: {
      color: '#dc2626'
    }
  };

  return (
    <div 
      style={styles.card}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-4px)';
        e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={styles.cardHeader}>
        <div style={styles.titleSection}>
          <span style={styles.icon}>{icon}</span>
          <h3 style={styles.title}>{title}</h3>
        </div>
        <button
          onClick={onSpeak}
          style={styles.speakButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#bfdbfe'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#dbeafe'}
          aria-label="Read aloud"
          title="Read aloud"
        >
          🔊
        </button>
      </div>
      
      <div>
        <p style={styles.value}>{value}</p>
        <div style={{
          ...styles.change,
          ...(isPositive ? styles.positiveChange : styles.negativeChange)
        }}>
          <span>{isPositive ? '↗' : '↘'}</span>
          <span>{Math.abs(change)}%</span>
          <span style={{color: '#6b7280', fontSize: '14px'}}>from last month</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;