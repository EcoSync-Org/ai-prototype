'use client';

// EcoSync - AI-First Sustainability Platform MVP
import { useState, useEffect } from 'react';
import {
  generateEnergyData,
  analyzeEnergyPatterns,
  generateRecommendations,
  calculatePrepaidStatus,
  projectSavings,
  getAIConfidenceMetrics
} from '@/lib/ai-engine';
import EnergyOverview from '@/components/EnergyOverview';
import AIInsightPanel from '@/components/AIInsightPanel';
import AIRecommendations from '@/components/AIRecommendations';
import PrepaidAlert from '@/components/PrepaidAlert';
import SavingsSimulator from '@/components/SavingsSimulator';
import AIConfidence from '@/components/AIConfidence';
import ImageUpload from '@/components/ImageUpload';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [energyData, setEnergyData] = useState(generateEnergyData(24));
  const [analysis, setAnalysis] = useState(analyzeEnergyPatterns(energyData));
  const [recommendations, setRecommendations] = useState(generateRecommendations(analysis, 45000));
  const [prepaidStatus, setPrepaidStatus] = useState(calculatePrepaidStatus(45000, 18.4));
  const [confidenceMetrics, setConfidenceMetrics] = useState(getAIConfidenceMetrics());

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // Auto-refresh data every 30 seconds to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateEnergyData(24);
      const newAnalysis = analyzeEnergyPatterns(newData);
      setEnergyData(newData);
      setAnalysis(newAnalysis);
      setRecommendations(generateRecommendations(newAnalysis, prepaidStatus.balance));
      setConfidenceMetrics(getAIConfidenceMetrics());
    }, 30000);

    return () => clearInterval(interval);
  }, [prepaidStatus.balance]);

  const handleProjectionChange = (percent: number) => {
    return projectSavings(analysis.consumptionRate, percent);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Initializing EcoSync AI</h2>
          <p className="text-sm text-gray-600">Analyzing your energy patterns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">EcoSync</h1>
                <p className="text-sm text-blue-100">AI-Powered Energy Optimization Platform</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs text-blue-100">Powered by</div>
                <div className="text-sm font-semibold">Artificial Intelligence</div>
              </div>
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border-2 border-blue-200">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                AI Active
              </span>
              <span className="text-xs text-gray-600">Last updated: {confidenceMetrics.lastUpdated}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Optimize Your Solar Energy & Prevent Power Outages
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our AI continuously monitors your household energy patterns, predicts future usage, 
              and provides intelligent recommendations to maximize solar efficiency while preventing 
              unexpected electricity outages.
          </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="space-y-8">
          {/* Energy Overview */}
          <section id="overview">
            <EnergyOverview data={energyData} />
          </section>

          {/* AI Insight Panel - Critical Component */}
          <section id="ai-insights">
            <AIInsightPanel analysis={analysis} isAnalyzing={false} />
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Recommendations */}
            <section id="recommendations">
              <AIRecommendations recommendations={recommendations} isGenerating={false} />
            </section>

            {/* Prepaid Alert */}
            <section id="prepaid">
              <PrepaidAlert status={prepaidStatus} />
            </section>
          </div>

          {/* Savings Simulator */}
          <section id="simulator">
            <SavingsSimulator 
              currentUsage={analysis.consumptionRate}
              onProjectionChange={handleProjectionChange}
            />
          </section>

          {/* AI Confidence Indicators */}
          <section id="confidence">
            <AIConfidence {...confidenceMetrics} />
          </section>

          {/* AI Vision - Image Analysis */}
          <section id="vision" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Vision Analysis</h2>
              <p className="text-gray-600">Upload images for real-time AI analysis powered by DeepSeek Vision</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ImageUpload type="meter" />
              <ImageUpload type="solar" />
            </div>
          </section>
        </div>

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Solar Optimization</h3>
              <p className="text-sm text-gray-600">
                Maximize solar energy utilization through intelligent load scheduling
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Outage Prevention</h3>
              <p className="text-sm text-gray-600">
                AI predicts prepaid balance depletion to prevent unexpected power loss
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cost Savings</h3>
              <p className="text-sm text-gray-600">
                Reduce electricity costs while minimizing environmental impact
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              <strong className="text-gray-900">EcoSync MVP</strong> - Demonstrating AI-powered sustainability technology
            </p>
            <p className="text-xs text-gray-500">
              All AI predictions are simulated for demonstration purposes. This is a visual MVP showcasing 
              the potential of intelligent energy management systems.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
