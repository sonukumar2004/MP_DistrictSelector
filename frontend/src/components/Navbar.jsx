// // import React from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';

// // const Navbar = () => {
// //   const { isAuthenticated, user, logout, language, toggleLanguage, t } = useAuth();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/login');
// //   };

// //   return (
// //     <nav className="bg-blue-600 text-white shadow-lg">
// //       <div className="max-w-7xl mx-auto px-4">
// //         <div className="flex justify-between items-center h-16">
// //           <Link to="/" className="flex items-center space-x-2">
// //             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
// //               <span className="text-blue-600 font-bold text-sm">MGNREGA</span>
// //             </div>
// //             <span className="text-xl font-bold">MP Dashboard</span>
// //           </Link>

// //           <div className="flex items-center space-x-4">
// //             <button
// //               onClick={toggleLanguage}
// //               className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-400 transition-colors btn-large"
// //             >
// //               {language === 'english' ? 'हिंदी' : 'English'}
// //             </button>

// //             {isAuthenticated ? (
// //               <div className="flex items-center space-x-4">
// //                 <span className="text-blue-100">Welcome, {user?.name}</span>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-400 transition-colors btn-large"
// //                 >
// //                   {t('logout')}
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="flex space-x-2">
// //                 <Link
// //                   to="/login"
// //                   className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-400 transition-colors btn-large"
// //                 >
// //                   {t('login')}
// //                 </Link>
// //                 <Link
// //                   to="/signup"
// //                   className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-400 transition-colors btn-large"
// //                 >
// //                   {t('signup')}
// //                 </Link>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { isAuthenticated, user, logout, language, toggleLanguage, t } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   // Inline styles
//   const styles = {
//     nav: {
//       backgroundColor: '#2563eb',
//       color: 'white',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//       padding: '0 16px'
//     },
//     container: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       height: '64px'
//     },
//     logo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       textDecoration: 'none',
//       color: 'white'
//     },
//     logoIcon: {
//       width: '32px',
//       height: '32px',
//       backgroundColor: 'white',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     logoText: {
//       color: '#2563eb',
//       fontWeight: 'bold',
//       fontSize: '12px'
//     },
//     logoTitle: {
//       fontSize: '20px',
//       fontWeight: 'bold'
//     },
//     buttonsContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px'
//     },
//     languageButton: {
//       padding: '8px 16px',
//       backgroundColor: '#3b82f6',
//       borderRadius: '8px',
//       border: 'none',
//       color: 'white',
//       fontSize: '16px',
//       cursor: 'pointer',
//       minHeight: '48px',
//       minWidth: '48px'
//     },
//     authContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px'
//     },
//     welcomeText: {
//       color: '#dbeafe'
//     },
//     logoutButton: {
//       padding: '8px 16px',
//       backgroundColor: '#ef4444',
//       borderRadius: '8px',
//       border: 'none',
//       color: 'white',
//       fontSize: '16px',
//       cursor: 'pointer',
//       minHeight: '48px',
//       minWidth: '48px'
//     },
//     authButtons: {
//       display: 'flex',
//       gap: '8px'
//     },
//     loginButton: {
//       padding: '8px 16px',
//       backgroundColor: '#10b981',
//       borderRadius: '8px',
//       border: 'none',
//       color: 'white',
//       fontSize: '16px',
//       cursor: 'pointer',
//       textDecoration: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '48px',
//       minWidth: '48px'
//     },
//     signupButton: {
//       padding: '8px 16px',
//       backgroundColor: '#8b5cf6',
//       borderRadius: '8px',
//       border: 'none',
//       color: 'white',
//       fontSize: '16px',
//       cursor: 'pointer',
//       textDecoration: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '48px',
//       minWidth: '48px'
//     }
//   };

//   // Hover effects (you can add these with onMouseEnter/onMouseLeave if needed)
//   const hoverEffects = {
//     languageButton: { backgroundColor: '#1d4ed8' },
//     logoutButton: { backgroundColor: '#dc2626' },
//     loginButton: { backgroundColor: '#059669' },
//     signupButton: { backgroundColor: '#7c3aed' }
//   };

//   return (
//     <nav style={styles.nav}>
//       <div style={styles.container}>
//         <Link to="/" style={styles.logo}>
//           <div style={styles.logoIcon}>
//             <span style={styles.logoText}>MGNREGA</span>
//           </div>
//           <span style={styles.logoTitle}>MP Dashboard</span>
//         </Link>

//         <div style={styles.buttonsContainer}>
//           <button
//             onClick={toggleLanguage}
//             style={styles.languageButton}
//             onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.languageButton.backgroundColor}
//             onMouseLeave={(e) => e.target.style.backgroundColor = styles.languageButton.backgroundColor}
//           >
//             {language === 'english' ? 'हिंदी' : 'English'}
//           </button>

//           {isAuthenticated ? (
//             <div style={styles.authContainer}>
//               <span style={styles.welcomeText}>Welcome, {user?.name}</span>
//               <button
//                 onClick={handleLogout}
//                 style={styles.logoutButton}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.logoutButton.backgroundColor}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = styles.logoutButton.backgroundColor}
//               >
//                 {t('logout')}
//               </button>
//             </div>
//           ) : (
//             <div style={styles.authButtons}>
//               <Link
//                 to="/login"
//                 style={styles.loginButton}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.loginButton.backgroundColor}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = styles.loginButton.backgroundColor}
//               >
//                 {t('login')}
//               </Link>
//               <Link
//                 to="/signup"
//                 style={styles.signupButton}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.signupButton.backgroundColor}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = styles.signupButton.backgroundColor}
//               >
//                 {t('signup')}
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout, language, toggleLanguage, t } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Inline styles
  const styles = {
    nav: {
      backgroundColor: '#2563eb',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '0 16px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      color: 'white'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #f59e0b'
    },
    logoText: {
      color: '#2563eb',
      fontWeight: 'bold',
      fontSize: '10px',
      textAlign: 'center'
    },
    logoTitle: {
      fontSize: '20px',
      fontWeight: 'bold'
    },
    menu: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    menuItem: {
      padding: '8px 16px'
    },
    menuLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '500',
      padding: '8px 12px',
      borderRadius: '6px',
      transition: 'background-color 0.3s'
    },
    activeMenuLink: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    buttonsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    languageButton: {
      padding: '8px 16px',
      backgroundColor: '#3b82f6',
      borderRadius: '8px',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      minHeight: '48px',
      minWidth: '48px'
    },
    authContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    welcomeText: {
      color: '#dbeafe',
      fontSize: '14px'
    },
    logoutButton: {
      padding: '8px 16px',
      backgroundColor: '#ef4444',
      borderRadius: '8px',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      minHeight: '48px',
      minWidth: '48px'
    },
    authButtons: {
      display: 'flex',
      gap: '8px'
    },
    loginButton: {
      padding: '8px 16px',
      backgroundColor: '#10b981',
      borderRadius: '8px',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '48px',
      minWidth: '48px'
    },
    signupButton: {
      padding: '8px 16px',
      backgroundColor: '#8b5cf6',
      borderRadius: '8px',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '48px',
      minWidth: '48px'
    }
  };

  // Hover effects
  const hoverEffects = {
    languageButton: { backgroundColor: '#1d4ed8' },
    logoutButton: { backgroundColor: '#dc2626' },
    loginButton: { backgroundColor: '#059669' },
    signupButton: { backgroundColor: '#7c3aed' },
    menuLink: { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logoSection}>
          <Link to="/" style={styles.logo}>
            <div style={styles.logoIcon}>
              <span style={styles.logoText}>MP<br/>MGNREGA</span>
            </div>
            <span style={styles.logoTitle}>Madhya Pradesh</span>
          </Link>
          
          <ul style={styles.menu}>
            <li style={styles.menuItem}>
              <Link 
                to="/" 
                style={{
                  ...styles.menuLink,
                  ...(isActiveLink('/') && styles.activeMenuLink)
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.menuLink.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = isActiveLink('/') ? styles.activeMenuLink.backgroundColor : 'transparent'}
              >
                Home
              </Link>
            </li>
            <li style={styles.menuItem}>
              <Link 
                to="/districts" 
                style={{
                  ...styles.menuLink,
                  ...(isActiveLink('/districts') && styles.activeMenuLink)
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.menuLink.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = isActiveLink('/districts') ? styles.activeMenuLink.backgroundColor : 'transparent'}
              >
                Districts
              </Link>
            </li>
            <li style={styles.menuItem}>
              <Link 
                to="/about" 
                style={{
                  ...styles.menuLink,
                  ...(isActiveLink('/about') && styles.activeMenuLink)
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.menuLink.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = isActiveLink('/about') ? styles.activeMenuLink.backgroundColor : 'transparent'}
              >
                About
              </Link>
            </li>
            <li style={styles.menuItem}>
              <Link 
                to="/helpline" 
                style={{
                  ...styles.menuLink,
                  ...(isActiveLink('/helpline') && styles.activeMenuLink)
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.menuLink.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = isActiveLink('/helpline') ? styles.activeMenuLink.backgroundColor : 'transparent'}
              >
                Helpline
              </Link>
            </li>
          </ul>
        </div>

        <div style={styles.buttonsContainer}>
          <button
            onClick={toggleLanguage}
            style={styles.languageButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.languageButton.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.languageButton.backgroundColor}
          >
            {language === 'english' ? 'हिंदी' : 'English'}
          </button>

          {isAuthenticated ? (
            <div style={styles.authContainer}>
              <span style={styles.welcomeText}>Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.logoutButton.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.logoutButton.backgroundColor}
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <div style={styles.authButtons}>
              <Link
                to="/login"
                style={styles.loginButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.loginButton.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.loginButton.backgroundColor}
              >
                {t('login')}
              </Link>
              <Link
                to="/signup"
                style={styles.signupButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = hoverEffects.signupButton.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.signupButton.backgroundColor}
              >
                {t('signup')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;