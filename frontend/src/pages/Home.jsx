import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DistrictSelector from '../components/DistrictSelector';
import SummaryCard from '../components/SummaryCard';
import TrendChart from '../components/TrendChart';

const Home = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [stateOverview, setStateOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, language } = useAuth();

  // Fetch MP State Overview on component mount
  useEffect(() => {
    fetchStateOverview();
  }, []);

  // Fetch district data when district is selected
  useEffect(() => {
    if (selectedDistrict) {
      fetchDistrictData(selectedDistrict.id);
    } else {
      // Clear district data when no district is selected
      setSummaryData(null);
      setHistoryData([]);
    }
  }, [selectedDistrict]);

  const fetchStateOverview = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/state/overview', {
        headers: { 'Authorization': token || 'mock-token' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch state overview');
      }

      const data = await response.json();
      setStateOverview(data);
    } catch (error) {
      console.error('Error fetching state overview:', error);
      setError('Failed to load state overview data');
    } finally {
      setStateLoading(false);
    }
  };

  const fetchDistrictData = async (districtId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');

      const [summaryResponse, historyResponse] = await Promise.all([
        fetch(`/api/district/${districtId}/summary`, {
          headers: { 'Authorization': token || 'mock-token' }
        }),
        fetch(`/api/district/${districtId}/history?months=12`, {
          headers: { 'Authorization': token || 'mock-token' }
        })
      ]);

      if (!summaryResponse.ok) {
        throw new Error(`Failed to fetch district summary: ${summaryResponse.status}`);
      }
      if (!historyResponse.ok) {
        throw new Error(`Failed to fetch district history: ${historyResponse.status}`);
      }

      const summary = await summaryResponse.json();
      const history = await historyResponse.json();

      // Validate data
      if (!summary || typeof summary !== 'object') {
        throw new Error('Invalid district data received');
      }

      setSummaryData(summary);
      setHistoryData(history || []);
    } catch (error) {
      console.error('Error fetching district data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getDistrictName = () => {
    if (!selectedDistrict) return '';
    return language === 'hindi' ? selectedDistrict.hindiName : selectedDistrict.name;
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
    stateSection: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '32px',
      marginBottom: '32px',
      border: '2px solid #e5e7eb'
    },
    stateHeader: {
      textAlign: 'center',
      marginBottom: '24px'
    },
    stateTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '16px'
    },
    stateContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      alignItems: 'center'
    },
    stateImage: {
      width: '100%',
      height: '300px',
      borderRadius: '12px',
      objectFit: 'cover',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    stateStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px'
    },
    stateStat: {
      backgroundColor: '#f8fafc',
      padding: '16px',
      borderRadius: '8px',
      textAlign: 'center'
    },
    stateStatValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: '4px'
    },
    stateStatLabel: {
      fontSize: '14px',
      color: '#6b7280'
    },
    stateDescription: {
      gridColumn: '1 / -1',
      padding: '16px',
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      marginTop: '16px'
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
    error: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '16px',
      textAlign: 'center'
    },
    districtHeader: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      textAlign: 'center',
      marginBottom: '24px',
      border: '2px solid #e5e7eb'
    },
    districtTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    districtSubtitle: {
      fontSize: '18px',
      color: '#6b7280'
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    chartContainer: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      border: '2px solid #e5e7eb'
    },
    chartTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '24px',
      color: '#1f2937'
    },
    emptyState: {
      textAlign: 'center',
      padding: '64px 16px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e5e7eb'
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '16px'
    },
    emptyTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    emptyText: {
      fontSize: '18px',
      color: '#6b7280'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {t('dashboard')} - {t('madhyaPradesh')}
          </h1>
          <p style={styles.subtitle}>
            {t('mgnregaPerformance')}
          </p>
        </div>

        {/* MP State Overview Section */}
        <div style={styles.stateSection}>
          <div style={styles.stateHeader}>
            <h2 style={styles.stateTitle}>
              {language === 'hindi' ? 'मध्य प्रदेश अवलोकन' : 'Madhya Pradesh Overview'}
            </h2>
          </div>

          {stateLoading ? (
            <div style={styles.loading}>
              <div style={styles.spinner}></div>
              <p style={{ color: '#6b7280', marginTop: '16px' }}>Loading state overview...</p>
            </div>
          ) : stateOverview ? (
            <div style={styles.stateContent}>
              <div>
                <img
                  src="public/madhya.png"
                  alt="Madhya Pradesh Map"
                  style={styles.stateImage}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGQUZDIi8+CjxwYXRoIGQ9Ik0xMDAgMTAwSDUwMFYzMDBIMTAwVjEwMFoiIGZpbGw9IiMyNTYzZWIiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IiM2YjcyODAiPk1hZGh5YSBQcmFkZXNoIE1hcDwvdGV4dD4KPC9zdmc+';
                  }}
                />
              </div>
              <div style={styles.stateStats}>
                <div style={styles.stateStat}>
                  <div style={styles.stateStatValue}>{stateOverview.total_workers?.toLocaleString()}</div>
                  <div style={styles.stateStatLabel}>{language === 'hindi' ? 'कुल श्रमिक' : 'Total Workers'}</div>
                </div>
                <div style={styles.stateStat}>
                  <div style={styles.stateStatValue}>{stateOverview.total_households?.toLocaleString()}</div>
                  <div style={styles.stateStatLabel}>{language === 'hindi' ? 'कुल परिवार' : 'Total Households'}</div>
                </div>
                <div style={styles.stateStat}>
                  <div style={styles.stateStatValue}>₹{(stateOverview.total_expenditure / 10000000).toFixed(1)}Cr</div>
                  <div style={styles.stateStatLabel}>{language === 'hindi' ? 'कुल व्यय' : 'Total Expenditure'}</div>
                </div>
                <div style={styles.stateStat}>
                  <div style={styles.stateStatValue}>{stateOverview.average_completion_rate}%</div>
                  <div style={styles.stateStatLabel}>{language === 'hindi' ? 'पूर्णता दर' : 'Completion Rate'}</div>
                </div>
              </div>
              <div style={styles.stateDescription}>
                <p style={{ margin: 0, lineHeight: '1.6', color: '#374151' }}>
                  {language === 'hindi' ? stateOverview.hindiDescription : stateOverview.description}
                </p>
              </div>
            </div>
          ) : (
            <div style={styles.error}>
              ⚠️ Failed to load state overview data
            </div>
          )}
        </div>

        {/* District Selector */}
        <DistrictSelector
          onDistrictSelect={setSelectedDistrict}
          selectedDistrict={selectedDistrict}
        />

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p style={{ color: '#6b7280', marginTop: '16px' }}>Loading district data...</p>
          </div>
        )}

        {/* District Overview Section */}
        {selectedDistrict && !loading && summaryData && (
          <div>
            {/* District Header */}
            <div style={styles.districtHeader}>
              <h2 style={styles.districtTitle}>
                {getDistrictName()} {language === 'hindi' ? 'जिला विवरण' : 'District Details'}
              </h2>
              <p style={styles.districtSubtitle}>
                {t('mgnregaPerformance')} {language === 'hindi' ? 'का विवरण' : 'Overview'}
              </p>
            </div>

            {/* Summary Cards */}
            <div style={styles.cardsGrid}>
              <SummaryCard
                title={t('workers')}
                value={summaryData.workers?.toLocaleString() || '0'}
                change={summaryData.change_percent || 0}
                icon="👷"
                onSpeak={() => speakText(`${t('workers')}: ${summaryData.workers?.toLocaleString() || '0'}`)}
              />
              <SummaryCard
                title={t('households')}
                value={summaryData.households?.toLocaleString() || '0'}
                change={summaryData.change_percent || 0}
                icon="🏠"
                onSpeak={() => speakText(`${t('households')}: ${summaryData.households?.toLocaleString() || '0'}`)}
              />
              <SummaryCard
                title={t('expenditure')}
                value={`₹${((summaryData.expenditure || 0) / 10000000).toFixed(2)} Cr`}
                change={summaryData.change_percent || 0}
                icon="💰"
                onSpeak={() => speakText(`${t('expenditure')}: ${((summaryData.expenditure || 0) / 10000000).toFixed(2)} crores`)}
              />
              <SummaryCard
                title={t('personDays')}
                value={summaryData.person_days?.toLocaleString() || '0'}
                change={summaryData.change_percent || 0}
                icon="📅"
                onSpeak={() => speakText(`${t('personDays')}: ${summaryData.person_days?.toLocaleString() || '0'}`)}
              />
              <SummaryCard
                title={t('completionRate')}
                value={`${summaryData.completion_rate || 0}%`}
                change={summaryData.change_percent || 0}
                icon="✅"
                onSpeak={() => speakText(`${t('completionRate')}: ${summaryData.completion_rate || 0} percent`)}
              />
              <SummaryCard
                title={t('worksTaken')}
                value={summaryData.works_taken?.toLocaleString() || '0'}
                change={summaryData.change_percent || 0}
                icon="🏗️"
                onSpeak={() => speakText(`${t('worksTaken')}: ${summaryData.works_taken?.toLocaleString() || '0'}`)}
              />
            </div>

            {/* Charts */}
            <div style={styles.chartContainer}>
              <h2 style={styles.chartTitle}>
                {t('workProvided')} - {getDistrictName()}
              </h2>
              <TrendChart data={historyData} language={language} />
            </div>
          </div>
        )}

        {!selectedDistrict && !loading && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏛️</div>
            <h3 style={styles.emptyTitle}>
              {language === 'hindi' ? 'जिला चुनें' : 'Select a District'}
            </h3>
            <p style={styles.emptyText}>
              {language === 'hindi'
                ? 'विस्तृत मनरेगा प्रदर्शन डेटा देखने के लिए ऊपर से एक जिला चुनें'
                : 'Select a district from above to view detailed MGNREGA performance data'
              }
            </p>
          </div>
        )}
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
};

export default Home;