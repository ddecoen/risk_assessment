'use client';

import { RiskFactor } from '@/types/risk-assessment';

interface RiskMatrixProps {
  riskFactors: RiskFactor[];
}

export default function RiskMatrix({ riskFactors }: RiskMatrixProps) {
  const matrixSize = 5;
  const matrix = Array(matrixSize).fill(null).map(() => Array(matrixSize).fill([]));

  // Populate matrix with risk factors
  riskFactors.forEach(risk => {
    const impactIndex = risk.impact - 1;
    const likelihoodIndex = risk.likelihood - 1;
    if (impactIndex >= 0 && impactIndex < matrixSize && likelihoodIndex >= 0 && likelihoodIndex < matrixSize) {
      matrix[impactIndex][likelihoodIndex] = [...matrix[impactIndex][likelihoodIndex], risk];
    }
  });

  const getCellColor = (impact: number, likelihood: number) => {
    const score = (impact + 1) * (likelihood + 1);
    if (score >= 20) return 'bg-red-600';
    if (score >= 15) return 'bg-red-400';
    if (score >= 10) return 'bg-yellow-400';
    if (score >= 6) return 'bg-yellow-200';
    return 'bg-green-200';
  };

  const getTextColor = (impact: number, likelihood: number) => {
    const score = (impact + 1) * (likelihood + 1);
    return score >= 15 ? 'text-white' : 'text-black';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Risk Matrix</h3>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Impact Label */}
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <div className="transform -rotate-90 text-sm font-medium text-gray-700 whitespace-nowrap">
                Impact →
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-5 gap-1">
                {[5, 4, 3, 2, 1].map(level => (
                  <div key={level} className="h-8 flex items-center justify-center text-xs font-medium text-gray-600">
                    {level}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="flex">
            <div className="w-16">
              {/* Likelihood labels */}
              {[5, 4, 3, 2, 1].map(level => (
                <div key={level} className="h-20 flex items-center justify-center text-xs font-medium text-gray-600">
                  {level}
                </div>
              ))}
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-5 gap-1">
                {[4, 3, 2, 1, 0].map(impactIndex => 
                  [0, 1, 2, 3, 4].map(likelihoodIndex => {
                    const risks = matrix[impactIndex][likelihoodIndex];
                    return (
                      <div
                        key={`${impactIndex}-${likelihoodIndex}`}
                        className={`h-20 border border-gray-300 ${getCellColor(impactIndex, likelihoodIndex)} ${getTextColor(impactIndex, likelihoodIndex)} p-1 flex flex-col justify-center items-center text-xs`}
                      >
                        {risks.length > 0 && (
                          <>
                            <div className="font-bold mb-1">{risks.length}</div>
                            <div className="text-center leading-tight">
                              {risks.slice(0, 2).map((risk: RiskFactor, idx: number) => (
                                <div key={idx} className="truncate w-full" title={risk.name}>
                                  {risk.name.substring(0, 8)}...
                                </div>
                              ))}
                              {risks.length > 2 && <div>+{risks.length - 2}</div>}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Likelihood Label */}
          <div className="flex justify-center mt-4">
            <div className="text-sm font-medium text-gray-700">← Likelihood</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-600 rounded mr-2"></div>
          <span>Critical (20-25)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
          <span>High (15-19)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
          <span>Medium (10-14)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-200 rounded mr-2"></div>
          <span>Low-Medium (6-9)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-200 rounded mr-2"></div>
          <span>Low (1-5)</span>
        </div>
      </div>
    </div>
  );
}