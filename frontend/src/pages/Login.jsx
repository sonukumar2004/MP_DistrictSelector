// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login, t } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     const success = await login(email, password);
//     if (success) {
//       navigate('/dashboard');
//     } else {
//       setError('Invalid credentials. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="bg-white p-8 rounded-2xl shadow-xl high-contrast">
//           <div className="text-center">
//             <h2 className="mt-6 text-3xl font-bold text-gray-900">
//               {t('login')}
//             </h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Access MGNREGA Madhya Pradesh Dashboard
//             </p>
//           </div>
          
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                 {error}
//               </div>
//             )}
            
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="email" className="sr-only">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 btn-large"
//               >
//                 {t('login')}
//               </button>
//             </div>

//             <div className="text-center">
//               <Link
//                 to="/signup"
//                 className="font-medium text-blue-600 hover:text-blue-500 text-lg"
//               >
//                 Don't have an account? {t('signup')}
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, t, language } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  // Inline Styles
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    card: {
      maxWidth: '440px',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 15px 35px rgba(0, 0, 0, 0.08)',
      padding: '40px 32px',
      position: 'relative',
      overflow: 'hidden'
    },
    cardHeader: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '16px'
    },
    logoIcon: {
      width: '48px',
      height: '48px',
      backgroundColor: '#2563eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      lineHeight: '1.5'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    error: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    errorIcon: {
      fontSize: '18px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginLeft: '4px'
    },
    input: {
      width: '100%',
      padding: '16px 20px',
      fontSize: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      backgroundColor: 'white',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
      backgroundColor: '#f8fafc'
    },
    button: {
      width: '100%',
      padding: '18px 24px',
      fontSize: '18px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    loginButton: {
      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
    },
    loginButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)'
    },
    buttonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
      transform: 'none !important'
    },
    buttonLoading: {
      color: 'transparent'
    },
    spinner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    signupLink: {
      textAlign: 'center',
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid #f1f5f9'
    },
    signupText: {
      fontSize: '16px',
      color: '#6b7280'
    },
    signupButton: {
      color: '#2563eb',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease',
      marginLeft: '4px'
    },
    signupButtonHover: {
      color: '#1d4ed8',
      textDecoration: 'underline'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: '32px',
      paddingTop: '32px',
      borderTop: '1px solid #f1f5f9'
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#6b7280'
    },
    featureIcon: {
      fontSize: '16px',
      color: '#10b981'
    },
    decorativeElement: {
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(29, 78, 216, 0.05))',
      zIndex: '0'
    },
    decorativeElement2: {
      position: 'absolute',
      bottom: '-30px',
      left: '-30px',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
      zIndex: '0'
    }
  };

  const content = {
    english: {
      title: 'Login',
      subtitle: 'Access MGNREGA Madhya Pradesh Dashboard',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      loginButton: 'Login',
      signupText: "Don't have an account?",
      signupLink: 'Sign Up',
      features: [
        'Real-time Data',
        'Multi-language',
        'Audio Support',
        'District-wise Stats'
      ]
    },
    hindi: {
      title: 'लॉगिन',
      subtitle: 'मनरेगा मध्य प्रदेश डैशबोर्ड तक पहुंचें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      loginButton: 'लॉगिन',
      signupText: 'खाता नहीं है?',
      signupLink: 'साइन अप',
      features: [
        'रियल-टाइम डेटा',
        'बहु-भाषा',
        'ऑडियो समर्थन',
        'जिलावार आंकड़े'
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Decorative Elements */}
        <div style={styles.decorativeElement}></div>
        <div style={styles.decorativeElement2}></div>
        
        <div style={styles.cardHeader}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>MP</div>
          </div>
          <h1 style={styles.title}>{currentContent.title}</h1>
          <p style={styles.subtitle}>{currentContent.subtitle}</p>
        </div>

        <form 
          style={styles.form} 
          onSubmit={handleSubmit}
        >
          {error && (
            <div style={styles.error}>
              <span style={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>{currentContent.emailLabel}</label>
            <input
              type="email"
              required
              placeholder={currentContent.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                e.target.style.backgroundColor = styles.inputFocus.backgroundColor;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.borderColor;
                e.target.style.boxShadow = 'none';
                e.target.style.backgroundColor = styles.input.backgroundColor;
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>{currentContent.passwordLabel}</label>
            <input
              type="password"
              required
              placeholder={currentContent.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                e.target.style.backgroundColor = styles.inputFocus.backgroundColor;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.borderColor;
                e.target.style.boxShadow = 'none';
                e.target.style.backgroundColor = styles.input.backgroundColor;
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.loginButton,
              ...(loading && styles.buttonDisabled)
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = styles.loginButtonHover.transform;
                e.target.style.boxShadow = styles.loginButtonHover.boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = styles.loginButton.boxShadow;
              }
            }}
          >
            {loading ? (
              <>
                <span style={styles.buttonLoading}>{currentContent.loginButton}</span>
                <div style={styles.spinner}></div>
              </>
            ) : (
              currentContent.loginButton
            )}
          </button>
        </form>

        <div style={styles.signupLink}>
          <span style={styles.signupText}>
            {currentContent.signupText}{' '}
            <Link
              to="/signup"
              style={styles.signupButton}
              onMouseEnter={(e) => {
                e.target.style.color = styles.signupButtonHover.color;
                e.target.style.textDecoration = styles.signupButtonHover.textDecoration;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.signupButton.color;
                e.target.style.textDecoration = 'none';
              }}
            >
              {currentContent.signupLink}
            </Link>
          </span>
        </div>

        <div style={styles.features}>
          {currentContent.features.map((feature, index) => (
            <div key={index} style={styles.feature}>
              <span style={styles.featureIcon}>✓</span>
              {feature}
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .high-contrast {
              border: 2px solid #000 !important;
            }
            .high-contrast input {
              border: 2px solid #000 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;