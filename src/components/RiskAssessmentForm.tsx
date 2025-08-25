'use client';

import { RiskFactor, RiskCategory } from '@/types/risk-assessment';
import { useState } from 'react';

interface RiskAssessmentFormProps {
  category: RiskCategory;
  onSave: (updatedCategory: RiskCategory) => void;
}

export default function RiskAssessmentForm({ category, onSave }: RiskAssessmentFormProps) {
  const [editingRisk, setEditingRisk] = useState<RiskFactor | null>(null);
  const [formData, setFormData] = useState<Partial<RiskFactor>>({});

  const handleEdit = (risk: RiskFactor) => {
    setEditingRisk(risk);
    setFormData(risk);
  };

  const handleSave = () => {
    if (!editingRisk || !formData) return;

    const updatedRiskFactors = category.riskFactors.map(rf => 
      rf.id === editingRisk.id ? { ...rf, ...formData } : rf
    );

    const updatedCategory = {
      ...category,
      riskFactors: updatedRiskFactors
    };

    onSave(updatedCategory);
    setEditingRisk(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingRisk(null);
    setFormData({});
  };

  const updateFormData = (field: keyof RiskFactor, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.name} - Risk Assessment</h2>
      <p className="text-gray-600 mb-6">{category.description}</p>

      <div className="space-y-6">
        {category.riskFactors.map((risk) => (
          <div key={risk.id} className="border border-gray-200 rounded-lg p-6">
            {editingRisk?.id === risk.id ? (
              // Edit Form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Likelihood (1-5)</label>
                    <select
                      value={formData.likelihood || 1}
                      onChange={(e) => updateFormData('likelihood', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Impact (1-5)</label>
                    <select
                      value={formData.impact || 1}
                      onChange={(e) => updateFormData('impact', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Control Effectiveness</label>
                    <select
                      value={formData.controlEffectiveness || 'Ineffective'}
                      onChange={(e) => updateFormData('controlEffectiveness', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Ineffective">Ineffective</option>
                      <option value="Partially Effective">Partially Effective</option>
                      <option value="Effective">Effective</option>
                      <option value="Highly Effective">Highly Effective</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status || 'Not Started'}
                      onChange={(e) => updateFormData('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
                    <input
                      type="text"
                      value={formData.owner || ''}
                      onChange={(e) => updateFormData('owner', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={formData.dueDate || ''}
                      onChange={(e) => updateFormData('dueDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mitigation Actions</label>
                  <textarea
                    value={formData.mitigationActions?.join('\n') || ''}
                    onChange={(e) => updateFormData('mitigationActions', e.target.value.split('\n').filter(action => action.trim()))}
                    rows={4}
                    placeholder="Enter each mitigation action on a new line"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display View
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{risk.name}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      risk.riskLevel === 'Critical' ? 'bg-red-600 text-white' :
                      risk.riskLevel === 'High' ? 'bg-red-400 text-white' :
                      risk.riskLevel === 'Medium' ? 'bg-yellow-400 text-black' :
                      'bg-green-400 text-black'
                    }`}>
                      {risk.riskLevel}
                    </span>
                    <button
                      onClick={() => handleEdit(risk)}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{risk.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm font-medium text-gray-700">Likelihood</div>
                    <div className="text-lg font-bold text-gray-900">{risk.likelihood}/5</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm font-medium text-gray-700">Impact</div>
                    <div className="text-lg font-bold text-gray-900">{risk.impact}/5</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm font-medium text-gray-700">Residual Risk</div>
                    <div className="text-lg font-bold text-gray-900">{risk.residualRisk}/25</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Owner:</span> {risk.owner}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      risk.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      risk.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      risk.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {risk.status}
                    </span>
                  </div>
                  {risk.dueDate && (
                    <div>
                      <span className="font-medium text-gray-700">Due Date:</span> {risk.dueDate}
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">Control Effectiveness:</span> {risk.controlEffectiveness}
                  </div>
                </div>

                {risk.mitigationActions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Mitigation Actions:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {risk.mitigationActions.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}