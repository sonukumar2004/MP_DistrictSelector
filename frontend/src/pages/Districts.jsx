// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';

// // const Districts = () => {
// //   const [districts, setDistricts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const { t, language } = useAuth();

// //   useEffect(() => {
// //     fetchDistricts();
// //   }, []);

// //   const fetchDistricts = async () => {
// //     try {
// //       const response = await fetch('http://localhost:3000/api/districts');
// //       const data = await response.json();
// //       setDistricts(data);
// //     } catch (error) {
// //       console.error('Error fetching districts:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const styles = {
// //     container: {
// //       minHeight: '100vh',
// //       backgroundColor: '#f8fafc',
// //       padding: '32px 16px'
// //     },
// //     innerContainer: {
// //       maxWidth: '1200px',
// //       margin: '0 auto'
// //     },
// //     header: {
// //       textAlign: 'center',
// //       marginBottom: '32px'
// //     },
// //     title: {
// //       fontSize: '36px',
// //       fontWeight: 'bold',
// //       color: '#1f2937',
// //       marginBottom: '8px'
// //     },
// //     subtitle: {
// //       fontSize: '20px',
// //       color: '#6b7280'
// //     },
// //     loading: {
// //       textAlign: 'center',
// //       padding: '32px'
// //     },
// //     spinner: {
// //       display: 'inline-block',
// //       width: '48px',
// //       height: '48px',
// //       border: '4px solid #f3f4f6',
// //       borderLeft: '4px solid #2563eb',
// //       borderRadius: '50%',
// //       animation: 'spin 1s linear infinite'
// //     },
// //     grid: {
// //       display: 'grid',
// //       gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
// //       gap: '24px'
// //     },
// //     card: {
// //       backgroundColor: 'white',
// //       borderRadius: '16px',
// //       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
// //       padding: '24px',
// //       textAlign: 'center',
// //       border: '2px solid #e5e7eb',
// //       textDecoration: 'none',
// //       color: 'inherit',
// //       transition: 'transform 0.3s, box-shadow 0.3s'
// //     },
// //     cardIcon: {
// //       fontSize: '48px',
// //       marginBottom: '16px'
// //     },
// //     cardTitle: {
// //       fontSize: '20px',
// //       fontWeight: 'bold',
// //       color: '#1f2937',
// //       marginBottom: '8px'
// //     },
// //     cardCode: {
// //       fontSize: '14px',
// //       color: '#6b7280',
// //       backgroundColor: '#f3f4f6',
// //       padding: '4px 12px',
// //       borderRadius: '20px',
// //       display: 'inline-block'
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div style={styles.container}>
// //         <div style={styles.loading}>
// //           <div style={styles.spinner}></div>
// //           <p style={{color: '#6b7280', marginTop: '16px'}}>Loading districts...</p>
// //         </div>
// //         <style>
// //           {`
// //             @keyframes spin {
// //               0% { transform: rotate(0deg); }
// //               100% { transform: rotate(360deg); }
// //             }
// //           `}
// //         </style>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.innerContainer}>
// //         <div style={styles.header}>
// //           <h1 style={styles.title}>
// //             {language === 'hindi' ? 'मध्य प्रदेश के जिले' : 'Districts of Madhya Pradesh'}
// //           </h1>
// //           <p style={styles.subtitle}>
// //             {language === 'hindi' ? 'मनरेगा कार्यान्वयन के लिए जिले' : 'Districts for MGNREGA Implementation'}
// //           </p>
// //         </div>

// //         <div style={styles.grid}>
// //           {districts.map(district => (
// //             <Link
// //               key={district.id}
// //               to="/"
// //               style={styles.card}
// //               onMouseEnter={(e) => {
// //                 e.target.style.transform = 'translateY(-4px)';
// //                 e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
// //               }}
// //               onMouseLeave={(e) => {
// //                 e.target.style.transform = 'translateY(0)';
// //                 e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
// //               }}
// //             >
// //               <div style={styles.cardIcon}>🏛️</div>
// //               <h3 style={styles.cardTitle}>
// //                 {language === 'hindi' ? district.hindiName : district.name}
// //               </h3>
// //               <div style={styles.cardCode}>{district.code}</div>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Districts;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Districts = () => {
//   const [districts, setDistricts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { t, language } = useAuth();
//   const navigate = useNavigate();

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
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDistrictClick = (district) => {
//     navigate('/', { state: { district } });
//   };

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       padding: '32px 16px'
//     },
//     innerContainer: {
//       maxWidth: '1200px',
//       margin: '0 auto'
//     },
//     header: {
//       textAlign: 'center',
//       marginBottom: '32px'
//     },
//     title: {
//       fontSize: '36px',
//       fontWeight: 'bold',
//       color: '#1f2937',
//       marginBottom: '8px'
//     },
//     subtitle: {
//       fontSize: '20px',
//       color: '#6b7280'
//     },
//     loading: {
//       textAlign: 'center',
//       padding: '32px'
//     },
//     spinner: {
//       display: 'inline-block',
//       width: '48px',
//       height: '48px',
//       border: '4px solid #f3f4f6',
//       borderLeft: '4px solid #2563eb',
//       borderRadius: '50%',
//       animation: 'spin 1s linear infinite'
//     },
//     grid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//       gap: '24px'
//     },
//     card: {
//       backgroundColor: 'white',
//       borderRadius: '16px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//       padding: '24px',
//       textAlign: 'center',
//       border: '2px solid #e5e7eb',
//       textDecoration: 'none',
//       color: 'inherit',
//       transition: 'transform 0.3s, box-shadow 0.3s',
//       cursor: 'pointer'
//     },
//     cardIcon: {
//       fontSize: '48px',
//       marginBottom: '16px'
//     },
//     cardTitle: {
//       fontSize: '20px',
//       fontWeight: 'bold',
//       color: '#1f2937',
//       marginBottom: '8px'
//     },
//     cardCode: {
//       fontSize: '14px',
//       color: '#6b7280',
//       backgroundColor: '#f3f4f6',
//       padding: '4px 12px',
//       borderRadius: '20px',
//       display: 'inline-block'
//     }
//   };

//   if (loading) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.loading}>
//           <div style={styles.spinner}></div>
//           <p style={{color: '#6b7280', marginTop: '16px'}}>Loading districts...</p>
//         </div>
//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.innerContainer}>
//         <div style={styles.header}>
//           <h1 style={styles.title}>
//             {language === 'hindi' ? 'मध्य प्रदेश के जिले' : 'Districts of Madhya Pradesh'}
//           </h1>
//           <p style={styles.subtitle}>
//             {language === 'hindi' ? 'मनरेगा कार्यान्वयन के लिए जिले' : 'Districts for MGNREGA Implementation'}
//           </p>
//         </div>

//         <div style={styles.grid}>
//           {districts.map(district => (
//             <div
//               key={district.id}
//               style={styles.card}
//               onClick={() => handleDistrictClick(district)}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = 'translateY(-4px)';
//                 e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
//               }}
//             >
//               <div style={styles.cardIcon}>🏛️</div>
//               <h3 style={styles.cardTitle}>
//                 {language === 'hindi' ? district.hindiName : district.name}
//               </h3>
//               <div style={styles.cardCode}>{district.code}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Districts;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Districts = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useAuth();
  const navigate = useNavigate();

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

  const handleDistrictSelect = (district) => {
    navigate('/', { state: { selectedDistrict: district } });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '32px 16px'
    },
    innerContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '20px',
      color: '#6b7280'
    },
    loading: {
      textAlign: 'center',
      padding: '32px'
    },
    spinner: {
      display: 'inline-block',
      width: '48px',
      height: '48px',
      border: '4px solid #f3f4f6',
      borderLeft: '4px solid #2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      textAlign: 'center',
      border: '2px solid #e5e7eb',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    cardIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    cardCode: {
      fontSize: '14px',
      color: '#6b7280',
      backgroundColor: '#f3f4f6',
      padding: '4px 12px',
      borderRadius: '20px',
      display: 'inline-block'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p style={{color: '#6b7280', marginTop: '16px'}}>
            {language === 'hindi' ? 'जिले लोड हो रहे हैं...' : 'Loading districts...'}
          </p>
        </div>
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
  }

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {language === 'hindi' ? 'मध्य प्रदेश के जिले' : 'Districts of Madhya Pradesh'}
          </h1>
          <p style={styles.subtitle}>
            {language === 'hindi' 
              ? 'मनरेगा कार्यान्वयन के लिए जिले' 
              : 'Districts for MGNREGA Implementation'
            }
          </p>
        </div>

        <div style={styles.grid}>
          {districts.map(district => (
            <div
              key={district.id}
              style={styles.card}
              onClick={() => handleDistrictSelect(district)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={styles.cardIcon}>🏛️</div>
              <h3 style={styles.cardTitle}>
                {language === 'hindi' ? district.hindiName : district.name}
              </h3>
              <div style={styles.cardCode}>{district.code}</div>
              <p style={{marginTop: '12px', color: '#6b7280', fontSize: '14px'}}>
                {language === 'hindi' ? 'विवरण देखने के लिए क्लिक करें' : 'Click to view details'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Districts;