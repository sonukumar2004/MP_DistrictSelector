// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { signup, t } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     const success = await signup(name, email, password);
//     if (success) {
//       navigate('/dashboard');
//     } else {
//       setError('Error creating account. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="bg-white p-8 rounded-2xl shadow-xl high-contrast">
//           <div className="text-center">
//             <h2 className="mt-6 text-3xl font-bold text-gray-900">
//               {t('signup')}
//             </h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Create your MGNREGA Dashboard account
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
//                 <input
//                   name="name"
//                   type="text"
//                   required
//                   className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//                   placeholder="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <input
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
//                 <input
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
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 btn-large"
//               >
//                 {t('signup')}
//               </button>
//             </div>

//             <div className="text-center">
//               <Link
//                 to="/login"
//                 className="font-medium text-blue-600 hover:text-blue-500 text-lg"
//               >
//                 Already have an account? {t('login')}
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, t, language } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError(language === 'hindi' ? 'पासवर्ड मेल नहीं खा रहे हैं' : 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError(language === 'hindi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए' : 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    const result = await signup(name, email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Error creating account. Please try again.');
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
      maxWidth: '480px',
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
      backgroundColor: '#10b981',
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
      background: 'linear-gradient(135deg, #10b981, #059669)',
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
      gap: '20px'
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
      marginLeft: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    required: {
      color: '#ef4444'
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
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
      backgroundColor: '#f8fafc'
    },
    passwordStrength: {
      marginTop: '4px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    strengthWeak: {
      color: '#ef4444'
    },
    strengthMedium: {
      color: '#f59e0b'
    },
    strengthStrong: {
      color: '#10b981'
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
      overflow: 'hidden',
      marginTop: '8px'
    },
    signupButton: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
    },
    signupButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
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
    loginLink: {
      textAlign: 'center',
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid #f1f5f9'
    },
    loginText: {
      fontSize: '16px',
      color: '#6b7280'
    },
    loginButton: {
      color: '#2563eb',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease',
      marginLeft: '4px'
    },
    loginButtonHover: {
      color: '#1d4ed8',
      textDecoration: 'underline'
    },
    benefits: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '12px',
      marginTop: '32px',
      paddingTop: '32px',
      borderTop: '1px solid #f1f5f9'
    },
    benefit: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      backgroundColor: '#f0fdf4',
      borderRadius: '10px',
      border: '1px solid #dcfce7'
    },
    benefitIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      color: '#10b981',
      flexShrink: 0
    },
    benefitContent: {
      flex: 1
    },
    benefitTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#065f46',
      marginBottom: '2px'
    },
    benefitDescription: {
      fontSize: '12px',
      color: '#047857'
    },
    decorativeElement: {
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
      zIndex: '0'
    },
    decorativeElement2: {
      position: 'absolute',
      bottom: '-30px',
      left: '-30px',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(29, 78, 216, 0.05))',
      zIndex: '0'
    }
  };

  const content = {
    english: {
      title: 'Create Account',
      subtitle: 'Join MGNREGA Madhya Pradesh Dashboard',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Create a password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      signupButton: 'Create Account',
      loginText: 'Already have an account?',
      loginLink: 'Login',
      benefits: [
        {
          title: 'Track Performance',
          description: 'Monitor district-wise MGNREGA data'
        },
        {
          title: 'Multi-language',
          description: 'Available in English and Hindi'
        },
        {
          title: 'Audio Support',
          description: 'Text-to-speech for better accessibility'
        },
        {
          title: 'Real-time Updates',
          description: 'Get latest MGNREGA statistics'
        }
      ]
    },
    hindi: {
      title: 'खाता बनाएं',
      subtitle: 'मनरेगा मध्य प्रदेश डैशबोर्ड में शामिल हों',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'पासवर्ड बनाएं',
      confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
      confirmPasswordPlaceholder: 'पासवर्ड दोबारा दर्ज करें',
      signupButton: 'खाता बनाएं',
      loginText: 'पहले से खाता मौजूद है?',
      loginLink: 'लॉगिन',
      benefits: [
        {
          title: 'प्रदर्शन ट्रैक करें',
          description: 'जिलावार मनरेगा डेटा की निगरानी करें'
        },
        {
          title: 'बहु-भाषा',
          description: 'अंग्रेजी और हिंदी में उपलब्ध'
        },
        {
          title: 'ऑडियो समर्थन',
          description: 'बेहतर पहुंच के लिए टेक्स्ट-टू-स्पीच'
        },
        {
          title: 'रियल-टाइम अपडेट',
          description: 'नवीनतम मनरेगा आंकड़े प्राप्त करें'
        }
      ]
    }
  };

  const currentContent = content[language];

  // Password strength indicator
  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return { strength: 0, text: '', color: '' };
    if (pass.length < 6) return { strength: 1, text: 'Weak', color: styles.strengthWeak.color };
    
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
    
    if (strength === 1) return { strength: 1, text: 'Weak', color: styles.strengthWeak.color };
    if (strength === 2) return { strength: 2, text: 'Medium', color: styles.strengthMedium.color };
    if (strength === 3) return { strength: 3, text: 'Strong', color: styles.strengthStrong.color };
    return { strength: 4, text: 'Very Strong', color: styles.strengthStrong.color };
  };

  const passwordStrength = getPasswordStrength(password);

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
            <label style={styles.label}>
              {currentContent.nameLabel}
              <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder={currentContent.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label style={styles.label}>
              {currentContent.emailLabel}
              <span style={styles.required}>*</span>
            </label>
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
            <label style={styles.label}>
              {currentContent.passwordLabel}
              <span style={styles.required}>*</span>
            </label>
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
            {password.length > 0 && (
              <div style={{...styles.passwordStrength, color: passwordStrength.color}}>
                <span>●</span>
                {passwordStrength.text} {language === 'hindi' ? 'पासवर्ड' : 'Password'}
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              {currentContent.confirmPasswordLabel}
              <span style={styles.required}>*</span>
            </label>
            <input
              type="password"
              required
              placeholder={currentContent.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                ...styles.input,
                ...(confirmPassword && password !== confirmPassword && {
                  borderColor: '#ef4444',
                  boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
                }),
                ...(confirmPassword && password === confirmPassword && {
                  borderColor: '#10b981',
                  boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
                })
              }}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                e.target.style.backgroundColor = styles.inputFocus.backgroundColor;
              }}
              onBlur={(e) => {
                if (!confirmPassword) {
                  e.target.style.borderColor = styles.input.borderColor;
                  e.target.style.boxShadow = 'none';
                }
                e.target.style.backgroundColor = styles.input.backgroundColor;
              }}
            />
            {confirmPassword && password !== confirmPassword && (
              <div style={{...styles.passwordStrength, color: styles.strengthWeak.color}}>
                <span>⚠️</span>
                {language === 'hindi' ? 'पासवर्ड मेल नहीं खाते' : 'Passwords do not match'}
              </div>
            )}
            {confirmPassword && password === confirmPassword && (
              <div style={{...styles.passwordStrength, color: styles.strengthStrong.color}}>
                <span>✓</span>
                {language === 'hindi' ? 'पासवर्ड मेल खाते हैं' : 'Passwords match'}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.signupButton,
              ...(loading && styles.buttonDisabled)
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = styles.signupButtonHover.transform;
                e.target.style.boxShadow = styles.signupButtonHover.boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = styles.signupButton.boxShadow;
              }
            }}
          >
            {loading ? (
              <>
                <span style={styles.buttonLoading}>{currentContent.signupButton}</span>
                <div style={styles.spinner}></div>
              </>
            ) : (
              currentContent.signupButton
            )}
          </button>
        </form>

        <div style={styles.loginLink}>
          <span style={styles.loginText}>
            {currentContent.loginText}{' '}
            <Link
              to="/login"
              style={styles.loginButton}
              onMouseEnter={(e) => {
                e.target.style.color = styles.loginButtonHover.color;
                e.target.style.textDecoration = styles.loginButtonHover.textDecoration;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.loginButton.color;
                e.target.style.textDecoration = 'none';
              }}
            >
              {currentContent.loginLink}
            </Link>
          </span>
        </div>

        <div style={styles.benefits}>
          {currentContent.benefits.map((benefit, index) => (
            <div key={index} style={styles.benefit}>
              <div style={styles.benefitIcon}>
                {index === 0 && '📊'}
                {index === 1 && '🌐'}
                {index === 2 && '🔊'}
                {index === 3 && '⚡'}
              </div>
              <div style={styles.benefitContent}>
                <div style={styles.benefitTitle}>{benefit.title}</div>
                <div style={styles.benefitDescription}>{benefit.description}</div>
              </div>
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

export default Signup;