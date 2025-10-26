import React from 'react';
// import { useAuth } from '../context/AuthContext';

const TrendChart = ({ data, language, districtName }) => {
  // const { t } = useAuth();

  if (!data || data.length === 0) {
    return (
      <div style={styles.noData}>
        <div style={styles.noDataIcon}>📊</div>
        <p style={styles.noDataText}>
          {language === 'hindi' ? 'कोई डेटा उपलब्ध नहीं' : 'No data available'}
        </p>
      </div>
    );
  }

  // Calculate max values for scaling
  const maxWorkers = Math.max(...data.map(d => d.workers || 0));
  const maxExpenditure = Math.max(...data.map(d => d.expenditure || 0));
  const maxPersonDays = Math.max(...data.map(d => d.person_days || 0));

  const formatNumber = (num) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + 'Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + 'L';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  const getMonthName = (month, year) => {
    return `${month} ${year}`;
  };

  const styles = {
    container: {
      width: '100%',
      overflow: 'hidden'
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    chartCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      border: '1px solid #e1e5e9',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    chartHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: '2px solid #f1f5f9'
    },
    chartTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '20px',
      fontWeight: '600',
      color: '#1e293b'
    },
    chartIcon: {
      fontSize: '24px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    chartSubtitle: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '500'
    },
    chartContent: {
      position: 'relative'
    },
    barContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      height: '300px',
      overflowY: 'auto',
      paddingRight: '8px'
    },
    barItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 0'
    },
    monthLabel: {
      minWidth: '80px',
      fontSize: '12px',
      fontWeight: '600',
      color: '#475569',
      textAlign: 'right'
    },
    barWrapper: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    bar: {
      height: '24px',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    barValue: {
      position: 'absolute',
      right: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '11px',
      fontWeight: '600',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },
    trendIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      fontWeight: '500',
      minWidth: '60px'
    },
    noData: {
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '2px dashed #cbd5e1'
    },
    noDataIcon: {
      fontSize: '48px',
      marginBottom: '12px',
      opacity: 0.5
    },
    noDataText: {
      color: '#64748b',
      fontSize: '16px',
      margin: 0
    },
    summaryCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginTop: '24px'
    },
    summaryCard: {
      backgroundColor: '#f8fafc',
      padding: '16px',
      borderRadius: '12px',
      textAlign: 'center',
      border: '1px solid #e2e8f0'
    },
    summaryValue: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '4px'
    },
    summaryLabel: {
      fontSize: '12px',
      color: '#64748b',
      fontWeight: '500'
    }
  };

  // Calculate summary statistics
  const totalWorkers = data.reduce((sum, item) => sum + (item.workers || 0), 0);
  const totalExpenditure = data.reduce((sum, item) => sum + (item.expenditure || 0), 0);
  const totalPersonDays = data.reduce((sum, item) => sum + (item.person_days || 0), 0);

  const averageWorkers = Math.round(totalWorkers / data.length);
  const averageExpenditure = Math.round(totalExpenditure / data.length);
  const averagePersonDays = Math.round(totalPersonDays / data.length);

  // Color schemes for different charts
  const colorSchemes = {
    workers: {
      primary: '#3b82f6',
      gradient: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
      icon: '👷',
      iconBg: '#dbeafe'
    },
    expenditure: {
      primary: '#10b981',
      gradient: 'linear-gradient(90deg, #10b981, #34d399)',
      icon: '💰',
      iconBg: '#d1fae5'
    },
    personDays: {
      primary: '#f59e0b',
      gradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
      icon: '📅',
      iconBg: '#fef3c7'
    }
  };

  const ChartCard = ({ title, subtitle, data, metric, colorScheme, formatValue }) => (
    <div 
      style={styles.chartCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={styles.chartHeader}>
        <div>
          <div style={styles.chartTitle}>
            <div style={{
              ...styles.chartIcon,
              backgroundColor: colorScheme.iconBg
            }}>
              {colorScheme.icon}
            </div>
            {title}
          </div>
          <div style={styles.chartSubtitle}>{subtitle}</div>
        </div>
      </div>

      <div style={styles.chartContent}>
        <div style={styles.barContainer}>
          {data.map((item, index) => {
            const value = item[metric] || 0;
            const maxValue = metric === 'workers' ? maxWorkers : 
                            metric === 'expenditure' ? maxExpenditure : maxPersonDays;
            const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
            
            // Calculate trend (compare with previous month)
            const prevValue = index > 0 ? data[index - 1][metric] || 0 : value;
            const trend = prevValue > 0 ? ((value - prevValue) / prevValue) * 100 : 0;
            
            return (
              <div key={index} style={styles.barItem}>
                <div style={styles.monthLabel}>
                  {getMonthName(item.month, item.year)}
                </div>
                <div style={styles.barWrapper}>
                  <div
                    style={{
                      ...styles.bar,
                      width: `${Math.max(percentage, 5)}%`,
                      background: colorScheme.gradient,
                      boxShadow: `0 2px 8px ${colorScheme.primary}40`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 4px 12px ${colorScheme.primary}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = `0 2px 8px ${colorScheme.primary}40`;
                    }}
                  >
                    <span style={styles.barValue}>
                      {formatValue ? formatValue(value) : value.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div style={{
                  ...styles.trendIndicator,
                  color: trend >= 0 ? '#10b981' : '#ef4444'
                }}>
                  {trend >= 0 ? '↗' : '↘'} {Math.abs(trend).toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.chartsGrid}>
        <ChartCard
          title={language === 'hindi' ? 'श्रमिक' : 'Workers'}
          subtitle={language === 'hindi' ? `${districtName} - मासिक श्रमिक भागीदारी` : `Monthly Worker Participation - ${districtName}`}
          data={data}
          metric="workers"
          colorScheme={colorSchemes.workers}
          formatValue={(value) => value.toLocaleString()}
        />

        <ChartCard
          title={language === 'hindi' ? 'व्यय' : 'Expenditure'}
          subtitle={language === 'hindi' ? 'मासिक व्यय रुझान' : 'Monthly Expenditure Trend'}
          data={data}
          metric="expenditure"
          colorScheme={colorSchemes.expenditure}
          formatValue={(value) => `₹${formatNumber(value)}`}
        />

        <ChartCard
          title={language === 'hindi' ? 'व्यक्ति दिवस' : 'Person Days'}
          subtitle={language === 'hindi' ? 'मासिक व्यक्ति दिवस' : 'Monthly Person Days'}
          data={data}
          metric="person_days"
          colorScheme={colorSchemes.personDays}
          formatValue={(value) => value.toLocaleString()}
        />
      </div>

      {/* Summary Statistics */}
      <div style={styles.summaryCards}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>{averageWorkers.toLocaleString()}</div>
          <div style={styles.summaryLabel}>
            {language === 'hindi' ? 'औसत मासिक श्रमिक' : 'Avg Monthly Workers'}
          </div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>₹{formatNumber(averageExpenditure)}</div>
          <div style={styles.summaryLabel}>
            {language === 'hindi' ? 'औसत मासिक व्यय' : 'Avg Monthly Expenditure'}
          </div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>{averagePersonDays.toLocaleString()}</div>
          <div style={styles.summaryLabel}>
            {language === 'hindi' ? 'औसत व्यक्ति दिवस' : 'Avg Person Days'}
          </div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryValue}>{data.length}</div>
          <div style={styles.summaryLabel}>
            {language === 'hindi' ? 'महीने' : 'Months'}
          </div>
        </div>
      </div>

      <style>
        {`
          /* Custom scrollbar for chart container */
          .chart-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .chart-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
          }
          .chart-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
          .chart-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}
      </style>
    </div>
  );
};

export default TrendChart;