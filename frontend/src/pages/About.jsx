import React from 'react';
import { useAuth } from '../context/AuthContext';

const About = () => {
  const { language } = useAuth();

  const content = {
    english: {
      title: 'About MGNREGA MP Dashboard',
      subtitle: 'Transparent Governance through Technology',
      sections: [
        {
          title: 'What is MGNREGA?',
          content: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) is an Indian labour law and social security measure that aims to guarantee the right to work.',
          icon: '📋'
        },
        {
          title: 'Our Mission',
          content: 'To provide citizens with transparent, accessible, and real-time information about MGNREGA implementation across Madhya Pradesh.',
          icon: '🎯'
        },
        {
          title: 'Features',
          content: 'District-wise performance tracking, historical data analysis, multi-language support, and accessibility features for all citizens.',
          icon: '⭐'
        },
        {
          title: 'Technology',
          content: 'Built with modern web technologies to ensure fast, reliable, and secure access to government data.',
          icon: '💻'
        }
      ],
      contact: {
        title: 'Developed By',
        content: 'Madhya Pradesh Government\nTechnical Support Team\nEmail: support.mgnrega@mp.gov.in'
      }
    },
    hindi: {
      title: 'मनरेगा एमपी डैशबोर्ड के बारे में',
      subtitle: 'प्रौद्योगिकी के माध्यम से पारदर्शी शासन',
      sections: [
        {
          title: 'मनरेगा क्या है?',
          content: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा) एक भारतीय श्रम कानून और सामाजिक सुरक्षा उपाय है जो काम के अधिकार की गारंटी देता है।',
          icon: '📋'
        },
        {
          title: 'हमारा मिशन',
          content: 'मध्य प्रदेश में मनरेगा कार्यान्वयन के बारे में नागरिकों को पारदर्शी, सुलभ और वास्तविक समय की जानकारी प्रदान करना।',
          icon: '🎯'
        },
        {
          title: 'विशेषताएं',
          content: 'जिलावार प्रदर्शन ट्रैकिंग, ऐतिहासिक डेटा विश्लेषण, बहु-भाषा समर्थन, और सभी नागरिकों के लिए पहुंच योग्यता सुविधाएं।',
          icon: '⭐'
        },
        {
          title: 'प्रौद्योगिकी',
          content: 'आधुनिक वेब तकनीकों के साथ निर्मित, सरकारी डेटा तक त्वरित, विश्वसनीय और सुरक्षित पहुंच सुनिश्चित करने के लिए।',
          icon: '💻'
        }
      ],
      contact: {
        title: 'विकसित किया गया',
        content: 'मध्य प्रदेश सरकार\nतकनीकी सहायता टीम\nईमेल: support.mgnrega@mp.gov.in'
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
      marginBottom: '48px'
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
    sectionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '24px',
      marginBottom: '48px'
    },
    sectionCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      border: '2px solid #e5e7eb'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '16px'
    },
    sectionIcon: {
      fontSize: '32px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    sectionContent: {
      fontSize: '16px',
      color: '#6b7280',
      lineHeight: '1.6'
    },
    contactCard: {
      backgroundColor: '#2563eb',
      color: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      textAlign: 'center'
    },
    contactTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    contactContent: {
      fontSize: '16px',
      lineHeight: '1.6',
      whiteSpace: 'pre-line'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>{currentContent.title}</h1>
          <p style={styles.subtitle}>{currentContent.subtitle}</p>
        </div>

        <div style={styles.sectionsGrid}>
          {currentContent.sections.map((section, index) => (
            <div key={index} style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <span style={styles.sectionIcon}>{section.icon}</span>
                <h3 style={styles.sectionTitle}>{section.title}</h3>
              </div>
              <p style={styles.sectionContent}>{section.content}</p>
            </div>
          ))}
        </div>

        <div style={styles.contactCard}>
          <h3 style={styles.contactTitle}>{currentContent.contact.title}</h3>
          <p style={styles.contactContent}>{currentContent.contact.content}</p>
        </div>
      </div>
    </div>
  );
};

export default About;