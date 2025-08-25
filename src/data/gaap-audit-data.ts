import { RiskAssessment, RiskCategory, RiskFactor, GAAP_RISK_CATEGORIES } from '@/types/risk-assessment';

const revenueRecognitionRisks: RiskFactor[] = [
  {
    id: 'rr-001',
    name: 'Premature Revenue Recognition',
    description: 'Risk of recognizing revenue before delivery of goods or completion of services',
    riskLevel: 'High',
    likelihood: 4,
    impact: 5,
    inherentRisk: 20,
    controlEffectiveness: 'Effective',
    residualRisk: 8,
    mitigationActions: [
      'Implement automated revenue recognition controls',
      'Monthly revenue cut-off testing',
      'Quarterly management review of revenue transactions'
    ],
    owner: 'Revenue Accounting Manager',
    dueDate: '2024-12-31',
    status: 'In Progress'
  },
  {
    id: 'rr-002',
    name: 'Complex Contract Terms',
    description: 'Risk of misinterpreting complex contract terms affecting revenue timing',
    riskLevel: 'Medium',
    likelihood: 3,
    impact: 4,
    inherentRisk: 12,
    controlEffectiveness: 'Partially Effective',
    residualRisk: 8,
    mitigationActions: [
      'Legal review of complex contracts',
      'Revenue recognition training for accounting staff',
      'Implementation of contract management system'
    ],
    owner: 'Controller',
    dueDate: '2024-11-30',
    status: 'Not Started'
  }
];

const materialityRisks: RiskFactor[] = [
  {
    id: 'mat-001',
    name: 'Inappropriate Materiality Thresholds',
    description: 'Risk of setting materiality thresholds too high, missing significant misstatements',
    riskLevel: 'Medium',
    likelihood: 3,
    impact: 4,
    inherentRisk: 12,
    controlEffectiveness: 'Effective',
    residualRisk: 5,
    mitigationActions: [
      'Annual review of materiality calculations',
      'Benchmark against industry standards',
      'Document materiality rationale'
    ],
    owner: 'External Auditor',
    dueDate: '2024-10-15',
    status: 'Completed'
  },
  {
    id: 'mat-002',
    name: 'Qualitative Materiality Factors',
    description: 'Risk of not considering qualitative factors that could make smaller amounts material',
    riskLevel: 'Medium',
    likelihood: 2,
    impact: 3,
    inherentRisk: 6,
    controlEffectiveness: 'Partially Effective',
    residualRisk: 4,
    mitigationActions: [
      'Develop qualitative materiality checklist',
      'Training on qualitative factors',
      'Regular management discussions'
    ],
    owner: 'CFO',
    status: 'In Progress'
  }
];

const cogsAllocationRisks: RiskFactor[] = [
  {
    id: 'cogs-001',
    name: 'Incorrect Cost Allocation Methods',
    description: 'Risk of using inappropriate methods for allocating indirect costs to COGS',
    riskLevel: 'High',
    likelihood: 4,
    impact: 4,
    inherentRisk: 16,
    controlEffectiveness: 'Partially Effective',
    residualRisk: 11,
    mitigationActions: [
      'Review and update cost allocation policies',
      'Implement activity-based costing where appropriate',
      'Monthly variance analysis'
    ],
    owner: 'Cost Accounting Manager',
    dueDate: '2024-12-15',
    status: 'Not Started'
  },
  {
    id: 'cogs-002',
    name: 'Inventory Valuation Errors',
    description: 'Risk of errors in inventory valuation affecting COGS calculations',
    riskLevel: 'Medium',
    likelihood: 3,
    impact: 3,
    inherentRisk: 9,
    controlEffectiveness: 'Effective',
    residualRisk: 4,
    mitigationActions: [
      'Quarterly inventory counts',
      'Automated inventory valuation controls',
      'Regular review of inventory reserves'
    ],
    owner: 'Inventory Manager',
    status: 'Completed'
  }
];

const segregationRisks: RiskFactor[] = [
  {
    id: 'sod-001',
    name: 'Inadequate Segregation in Financial Reporting',
    description: 'Risk of same person initiating, recording, and approving transactions',
    riskLevel: 'Critical',
    likelihood: 5,
    impact: 5,
    inherentRisk: 25,
    controlEffectiveness: 'Partially Effective',
    residualRisk: 18,
    mitigationActions: [
      'Implement role-based access controls',
      'Establish approval hierarchies',
      'Regular access rights review',
      'Compensating detective controls'
    ],
    owner: 'IT Security Manager',
    dueDate: '2024-09-30',
    status: 'In Progress'
  },
  {
    id: 'sod-002',
    name: 'System Access Controls',
    description: 'Risk of inappropriate system access allowing override of controls',
    riskLevel: 'High',
    likelihood: 3,
    impact: 4,
    inherentRisk: 12,
    controlEffectiveness: 'Effective',
    residualRisk: 5,
    mitigationActions: [
      'Quarterly access reviews',
      'Automated monitoring of privileged access',
      'Multi-factor authentication implementation'
    ],
    owner: 'IT Director',
    status: 'Completed'
  }
];

const supervisionRisks: RiskFactor[] = [
  {
    id: 'sup-001',
    name: 'Inadequate Management Review',
    description: 'Risk of insufficient management oversight of financial reporting processes',
    riskLevel: 'Medium',
    likelihood: 3,
    impact: 4,
    inherentRisk: 12,
    controlEffectiveness: 'Effective',
    residualRisk: 5,
    mitigationActions: [
      'Formalize management review procedures',
      'Document review evidence',
      'Establish review calendars and deadlines'
    ],
    owner: 'CFO',
    dueDate: '2024-11-15',
    status: 'In Progress'
  },
  {
    id: 'sup-002',
    name: 'Lack of Technical Expertise',
    description: 'Risk of insufficient technical accounting knowledge in review processes',
    riskLevel: 'Medium',
    likelihood: 2,
    impact: 4,
    inherentRisk: 8,
    controlEffectiveness: 'Partially Effective',
    residualRisk: 6,
    mitigationActions: [
      'Provide technical accounting training',
      'Engage external technical consultants',
      'Establish technical accounting resource library'
    ],
    owner: 'Controller',
    status: 'Not Started'
  }
];

const riskCategories: RiskCategory[] = [
  {
    id: GAAP_RISK_CATEGORIES.REVENUE_RECOGNITION,
    name: 'Revenue Recognition',
    description: 'Risks related to proper timing and measurement of revenue recognition under GAAP',
    riskFactors: revenueRecognitionRisks,
    overallRiskRating: 'High'
  },
  {
    id: GAAP_RISK_CATEGORIES.MATERIALITY,
    name: 'Materiality',
    description: 'Risks related to appropriate determination and application of materiality thresholds',
    riskFactors: materialityRisks,
    overallRiskRating: 'Medium'
  },
  {
    id: GAAP_RISK_CATEGORIES.COGS_ALLOCATION,
    name: 'COGS Allocation',
    description: 'Risks related to proper allocation and calculation of cost of goods sold',
    riskFactors: cogsAllocationRisks,
    overallRiskRating: 'Medium'
  },
  {
    id: GAAP_RISK_CATEGORIES.SEGREGATION_OF_DUTIES,
    name: 'Segregation of Duties',
    description: 'Risks related to inadequate segregation of duties in financial processes',
    riskFactors: segregationRisks,
    overallRiskRating: 'Critical'
  },
  {
    id: GAAP_RISK_CATEGORIES.SUPERVISION_AND_REVIEW,
    name: 'Supervision and Review',
    description: 'Risks related to inadequate supervision and review of financial reporting processes',
    riskFactors: supervisionRisks,
    overallRiskRating: 'Medium'
  }
];

export const gaapAuditAssessment: RiskAssessment = {
  id: 'gaap-audit-2024',
  title: 'First Annual GAAP Audit Risk Assessment',
  description: 'Comprehensive risk assessment for our first annual audit focusing on key GAAP compliance areas',
  auditYear: 2024,
  categories: riskCategories,
  createdDate: '2024-08-01',
  lastUpdated: new Date().toISOString().split('T')[0],
  status: 'In Review'
};