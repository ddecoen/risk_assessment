export interface RiskFactor {
  id: string;
  name: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  likelihood: number; // 1-5 scale
  impact: number; // 1-5 scale
  inherentRisk: number; // calculated from likelihood * impact
  controlEffectiveness: 'Ineffective' | 'Partially Effective' | 'Effective' | 'Highly Effective';
  residualRisk: number; // calculated after controls
  mitigationActions: string[];
  owner: string;
  dueDate?: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
}

export interface RiskCategory {
  id: string;
  name: string;
  description: string;
  riskFactors: RiskFactor[];
  overallRiskRating: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface RiskAssessment {
  id: string;
  title: string;
  description: string;
  auditYear: number;
  categories: RiskCategory[];
  createdDate: string;
  lastUpdated: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Final';
  approver?: string;
  approvalDate?: string;
}

export const GAAP_RISK_CATEGORIES = {
  REVENUE_RECOGNITION: 'revenue-recognition',
  MATERIALITY: 'materiality',
  COGS_ALLOCATION: 'cogs-allocation',
  SEGREGATION_OF_DUTIES: 'segregation-of-duties',
  SUPERVISION_AND_REVIEW: 'supervision-and-review'
} as const;

export type GaapRiskCategory = typeof GAAP_RISK_CATEGORIES[keyof typeof GAAP_RISK_CATEGORIES];