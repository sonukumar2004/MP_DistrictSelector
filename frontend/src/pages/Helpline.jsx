import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Helpline = () => {
  const { language } = useAuth();
  const [activeTab, setActiveTab] = useState('helpline');

  const content = {
    english: {
      title: 'Helpline & Support',
      subtitle: 'Get assistance for MGNREGA related queries',
      tabs: {
        helpline: 'Helpline Numbers',
        contact: 'Contact Officials',
        grievance: 'Grievance Redressal',
        faq: 'FAQ'
      },
      helpline: {
        title: '24x7 Helpline Numbers',
        numbers: [
          { department: 'MGNREGA State Helpline', number: '1800-180-1551', timing: '24x7' },
          { department: 'District Coordinator', number: '0755-2666123', timing: '9 AM - 6 PM' },
          { department: 'Technical Support', number: '0755-2666124', timing: '9 AM - 6 PM' },
          { department: 'Grievance Cell', number: '1800-180-1552', timing: '24x7' }
        ]
      },
      contact: {
        title: 'Contact District Officials',
        officials: [
          { name: 'State Program Coordinator', email: 'spc.mgnrega@mp.gov.in', phone: '0755-2666101' },
          { name: 'District Program Officer', email: 'dpo.mgnrega@mp.gov.in', phone: '0755-2666102' },
          { name: 'Technical Assistant', email: 'ta.mgnrega@mp.gov.in', phone: '0755-2666103' }
        ]
      },
      grievance: {
        title: 'Grievance Redressal Mechanism',
        steps: [
          'Register your complaint through helpline number',
          'Submit written application to district office',
          'Online complaint portal: mp.mgnrega.gov.in/grievance',
          'Expected resolution time: 15 working days'
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        questions: [
          {
            q: 'How to check job card status?',
            a: 'Visit your district portal or contact helpline with job card number.'
          },
          {
            q: 'What is the wage rate in MP?',
            a: 'Current wage rate is ₹243 per day for unskilled manual work.'
          },
          {
            q: 'How to file a complaint?',
            a: 'Use the helpline numbers or visit your district program office.'
          }
        ]
      }
    },
    hindi: {
      title: 'हेल्पलाइन और सहायता',
      subtitle: 'मनरेगा संबंधित प्रश्नों के लिए सहायता प्राप्त करें',
      tabs: {
        helpline: 'हेल्पलाइन नंबर',
        contact: 'अधिकारियों से संपर्क',
        grievance: 'शिकायत निवारण',
        faq: 'सामान्य प्रश्न'
      },
      helpline: {
        title: '24x7 हेल्पलाइन नंबर',
        numbers: [
          { department: 'मनरेगा राज्य हेल्पलाइन', number: '1800-180-1551', timing: '24x7' },
          { department: 'जिला समन्वयक', number: '0755-2666123', timing: 'सुबह 9 - शाम 6' },
          { department: 'तकनीकी सहायता', number: '0755-2666124', timing: 'सुबह 9 - शाम 6' },
          { department: 'शिकायत सेल', number: '1800-180-1552', timing: '24x7' }
        ]
      },
      contact: {
        title: 'जिला अधिकारियों से संपर्क करें',
        officials: [
          { name: 'राज्य कार्यक्रम समन्वयक', email: 'spc.mgnrega@mp.gov.in', phone: '0755-2666101' },
          { name: 'जिला कार्यक्रम अधिकारी', email: 'dpo.mgnrega@mp.gov.in', phone: '0755-2666102' },
          { name: 'तकनीकी सहायक', email: 'ta.mgnrega@mp.gov.in', phone: '0755-2666103' }
        ]
      },
      grievance: {
        title: 'शिकायत निवारण तंत्र',
        steps: [
          'हेल्पलाइन नंबर के माध्यम से अपनी शिकायत दर्ज कराएं',
          'जिला कार्यालय में लिखित आवेदन जमा करें',
          'ऑनलाइन शिकायत पोर्टल: mp.mgnrega.gov.in/grievance',
          'अपेक्षित समाधान समय: 15 कार्य दिवस'
        ]
      },
      faq: {
        title: 'अक्सर पूछे जाने वाले प्रश्न',
        questions: [
          {
            q: 'जॉब कार्ड स्थिति कैसे जांचें?',
            a: 'अपने जिला पोर्टल पर जाएं या जॉब कार्ड नंबर के साथ हेल्पलाइन से संपर्क करें।'
          },
          {
            q: 'एमपी में मजदूरी दर क्या है?',
            a: 'अकुशल मैनुअल काम के लिए वर्तमान मजदूरी दर ₹243 प्रति दिन है।'
          },
          {
            q: 'शिकायत कैसे दर्ज करें?',
            a: 'हेल्पलाइन नंबर का उपयोग करें या अपने जिला कार्यक्रम कार्यालय में जाएं।'
          }
        ]
      }
    }
  };

  const currentContent = content[language];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '32px 16px'
    },
    innerContainer: {
      maxWidth: '1000px',
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
    tabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '32px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    tab: {
      padding: '12px 24px',
      backgroundColor: 'white',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.3s'
    },
    activeTab: {
      backgroundColor: '#2563eb',
      color: 'white',
      borderColor: '#2563eb'
    },
    contentCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      border: '2px solid #e5e7eb'
    },
    contentTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '24px',
      textAlign: 'center'
    },
    numberList: {
      display: 'grid',
      gap: '16px'
    },
    numberItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    numberInfo: {
      flex: 1
    },
    department: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '4px'
    },
    timing: {
      fontSize: '14px',
      color: '#6b7280'
    },
    number: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2563eb'
    },
    officialList: {
      display: 'grid',
      gap: '16px'
    },
    officialItem: {
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    officialName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    },
    officialContact: {
      fontSize: '14px',
      color: '#6b7280'
    },
    stepList: {
      display: 'grid',
      gap: '12px'
    },
    stepItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '12px'
    },
    stepNumber: {
      backgroundColor: '#2563eb',
      color: 'white',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      flexShrink: 0
    },
    stepText: {
      fontSize: '16px',
      color: '#6b7280',
      lineHeight: '1.5'
    },
    faqList: {
      display: 'grid',
      gap: '16px'
    },
    faqItem: {
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    question: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    },
    answer: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: '1.5'
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'helpline':
        return (
          <div>
            <h3 style={styles.contentTitle}>{currentContent.helpline.title}</h3>
            <div style={styles.numberList}>
              {currentContent.helpline.numbers.map((item, index) => (
                <div key={index} style={styles.numberItem}>
                  <div style={styles.numberInfo}>
                    <div style={styles.department}>{item.department}</div>
                    <div style={styles.timing}>{item.timing}</div>
                  </div>
                  <div style={styles.number}>{item.number}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div>
            <h3 style={styles.contentTitle}>{currentContent.contact.title}</h3>
            <div style={styles.officialList}>
              {currentContent.contact.officials.map((official, index) => (
                <div key={index} style={styles.officialItem}>
                  <div style={styles.officialName}>{official.name}</div>
                  <div style={styles.officialContact}>
                    <div>📧 {official.email}</div>
                    <div>📞 {official.phone}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'grievance':
        return (
          <div>
            <h3 style={styles.contentTitle}>{currentContent.grievance.title}</h3>
            <div style={styles.stepList}>
              {currentContent.grievance.steps.map((step, index) => (
                <div key={index} style={styles.stepItem}>
                  <div style={styles.stepNumber}>{index + 1}</div>
                  <div style={styles.stepText}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'faq':
        return (
          <div>
            <h3 style={styles.contentTitle}>{currentContent.faq.title}</h3>
            <div style={styles.faqList}>
              {currentContent.faq.questions.map((faq, index) => (
                <div key={index} style={styles.faqItem}>
                  <div style={styles.question}>❓ {faq.q}</div>
                  <div style={styles.answer}>💡 {faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>{currentContent.title}</h1>
          <p style={styles.subtitle}>{currentContent.subtitle}</p>
        </div>

        <div style={styles.tabs}>
          {Object.entries(currentContent.tabs).map(([key, label]) => (
            <button
              key={key}
              style={{
                ...styles.tab,
                ...(activeTab === key && styles.activeTab)
              }}
              onClick={() => setActiveTab(key)}
              onMouseEnter={(e) => {
                if (activeTab !== key) {
                  e.target.style.backgroundColor = '#f1f5f9';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== key) {
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={styles.contentCard}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Helpline;