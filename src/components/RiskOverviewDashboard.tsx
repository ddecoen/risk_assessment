'use client';

import { RiskAssessment, RiskCategory } from '@/types/risk-assessment';
import { useState } from 'react';
import RiskMatrix from './RiskMatrix';
import RiskAssessmentForm from './RiskAssessmentForm';

interface RiskOverviewDashboardProps {
  assessment: RiskAssessment;
}

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'Critical': return 'bg-red-600 text-white';
    case 'High': return 'bg-red-400 text-white';
    case 'Medium': return 'bg-yellow-400 text-black';
    case 'Low': return 'bg-green-400 text-black';
    default: return 'bg-gray-400 text-black';
  }
};

const getRiskBorderColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'Critical': return 'border-red-600';
    case 'High': return 'border-red-400';
    case 'Medium': return 'border-yellow-400';
    case 'Low': return 'border-green-400';
    default: return 'border-gray-400';
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default function RiskOverviewDashboard({ assessment }: RiskOverviewDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'matrix' | 'details'>('overview');
  const [assessmentData, setAssessmentData] = useState(assessment);

  const handleCategoryUpdate = (updatedCategory: RiskCategory) => {
    const updatedCategories = assessmentData.categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    );
    setAssessmentData({
      ...assessmentData,
      categories: updatedCategories,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };

  const totalRisks = assessmentData.categories.reduce((sum, cat) => sum + cat.riskFactors.length, 0);
  const completedRisks = assessmentData.categories.reduce(
    (sum, cat) => sum + cat.riskFactors.filter(rf => rf.status === 'Completed').length, 0
  );
  const inProgressRisks = assessmentData.categories.reduce(
    (sum, cat) => sum + cat.riskFactors.filter(rf => rf.status === 'In Progress').length, 0
  );
  const criticalRisks = assessmentData.categories.reduce(
    (sum, cat) => sum + cat.riskFactors.filter(rf => rf.riskLevel === 'Critical').length, 0
  );
  const highRisks = assessmentData.categories.reduce(
    (sum, cat) => sum + cat.riskFactors.filter(rf => rf.riskLevel === 'High').length, 0
  );

  const allRiskFactors = assessmentData.categories.flatMap(cat => cat.riskFactors);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{assessmentData.title}</h1>
          <p className="text-gray-600 mb-4">{assessmentData.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Audit Year: {assessmentData.auditYear}</span>
            <span>•</span>
            <span>Status: {assessmentData.status}</span>
            <span>•</span>
            <span>Last Updated: {assessmentData.lastUpdated}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'matrix'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Risk Matrix
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Detailed Assessment
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-gray-900">{totalRisks}</div>
                <div className="text-sm text-gray-600">Total Risk Factors</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-red-600">{criticalRisks}</div>
                <div className="text-sm text-gray-600">Critical Risks</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-orange-600">{highRisks}</div>
                <div className="text-sm text-gray-600">High Risks</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-blue-600">{inProgressRisks}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl font-bold text-green-600">{completedRisks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>

            {/* Risk Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {assessmentData.categories.map((category) => (
                <div
                  key={category.id}
                  className={`bg-white rounded-lg shadow-lg border-l-4 ${getRiskBorderColor(category.overallRiskRating)} cursor-pointer hover:shadow-xl transition-shadow`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(category.overallRiskRating)}`}>
                        {category.overallRiskRating}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{category.riskFactors.length} risk factors</span>
                      <span>
                        {category.riskFactors.filter(rf => rf.status === 'Completed').length} completed
                      </span>
                    </div>
                  </div>

                  {/* Expanded Risk Factors */}
                  {selectedCategory === category.id && (
                    <div className="border-t bg-gray-50 p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Risk Factors:</h4>
                      <div className="space-y-4">
                        {category.riskFactors.map((risk) => (
                          <div key={risk.id} className="bg-white rounded-lg p-4 border">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-900">{risk.name}</h5>
                              <div className="flex space-x-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(risk.riskLevel)}`}>
                                  {risk.riskLevel}
                                </span>
                                <StatusBadge status={risk.status} />
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Owner:</span> {risk.owner}
                              </div>
                              <div>
                                <span className="font-medium">Residual Risk:</span> {risk.residualRisk}/25
                              </div>
                              {risk.dueDate && (
                                <div>
                                  <span className="font-medium">Due Date:</span> {risk.dueDate}
                                </div>
                              )}
                              <div>
                                <span className="font-medium">Control Effectiveness:</span> {risk.controlEffectiveness}
                              </div>
                            </div>
                            {risk.mitigationActions.length > 0 && (
                              <div className="mt-3">
                                <span className="font-medium text-sm">Mitigation Actions:</span>
                                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                                  {risk.mitigationActions.map((action, index) => (
                                    <li key={index}>{action}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(completedRisks / totalRisks) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{completedRisks} of {totalRisks} risk factors completed</span>
                <span>{Math.round((completedRisks / totalRisks) * 100)}%</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'matrix' && (
          <RiskMatrix riskFactors={allRiskFactors} />
        )}

        {activeTab === 'details' && (
          <div className="space-y-8">
            {assessmentData.categories.map((category) => (
              <RiskAssessmentForm
                key={category.id}
                category={category}
                onSave={handleCategoryUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}