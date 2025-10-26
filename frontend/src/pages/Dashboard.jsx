import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DistrictSelector from '../components/DistrictSelector';
import SummaryCard from '../components/SummaryCard';
import TrendChart from '../components/TrendChart';

const Dashboard = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useAuth();

  useEffect(() => {
    if (selectedDistrict) {
      fetchDistrictData(selectedDistrict.id);
    }
  }, [selectedDistrict]);

  const fetchDistrictData = async (districtId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const [summaryResponse, historyResponse] = await Promise.all([
        fetch(`/api/district/${districtId}/summary`, {
          headers: { 'Authorization': token }
        }),
        fetch(`/api/district/${districtId}/history`, {
          headers: { 'Authorization': token }
        })
      ]);

      const summary = await summaryResponse.json();
      const history = await historyResponse.json();

      setSummaryData(summary);
      setHistoryData(history);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN'; // Hindi for Hindi language
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            {t('dashboard')} - Madhya Pradesh
          </h1>
          <p className="text-xl text-gray-600 text-center">
            MGNREGA Performance Monitoring
          </p>
        </div>

        <DistrictSelector 
          onDistrictSelect={setSelectedDistrict}
          selectedDistrict={selectedDistrict}
        />

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {summaryData && !loading && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SummaryCard
                title={t('workers')}
                value={summaryData.workers}
                change={summaryData.change_percent}
                icon="👷"
                onSpeak={() => speakText(`${t('workers')}: ${summaryData.workers}`)}
              />
              <SummaryCard
                title={t('households')}
                value={summaryData.households}
                change={summaryData.change_percent}
                icon="🏠"
                onSpeak={() => speakText(`${t('households')}: ${summaryData.households}`)}
              />
              <SummaryCard
                title={t('expenditure')}
                value={`₹${(summaryData.expenditure / 10000000).toFixed(2)}Cr`}
                change={summaryData.change_percent}
                icon="💰"
                onSpeak={() => speakText(`${t('expenditure')}: ${(summaryData.expenditure / 10000000).toFixed(2)} crores`)}
              />
              <SummaryCard
                title={t('personDays')}
                value={summaryData.person_days}
                change={summaryData.change_percent}
                icon="📅"
                onSpeak={() => speakText(`${t('personDays')}: ${summaryData.person_days}`)}
              />
              <SummaryCard
                title={t('completionRate')}
                value={`${summaryData.completion_rate}%`}
                change={summaryData.change_percent}
                icon="✅"
                onSpeak={() => speakText(`${t('completionRate')}: ${summaryData.completion_rate} percent`)}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 high-contrast">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {t('workProvided')} - {selectedDistrict?.name}
              </h2>
              <TrendChart data={historyData} />
            </div>
          </div>
        )}

        {!selectedDistrict && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {t('selectDistrict')}
            </h3>
            <p className="text-gray-500 text-lg">
              Choose a district from the dropdown above to view MGNREGA performance data
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;