# GAAP Audit Risk Assessment Dashboard

A comprehensive web application for managing and visualizing risk assessments for your first annual GAAP audit. This dashboard focuses on five critical areas: Revenue Recognition, Materiality, COGS Allocation, Segregation of Duties, and Supervision & Review.

## Features

### 📊 Overview Dashboard
- **Summary Cards**: Quick view of total risks, critical/high risks, and progress metrics
- **Risk Categories**: Interactive cards showing each of the 5 GAAP focus areas
- **Progress Tracking**: Visual progress bar showing completion status
- **Expandable Details**: Click on categories to view detailed risk factors

### 🎯 Risk Matrix Visualization
- **Interactive Risk Matrix**: 5x5 grid plotting likelihood vs impact
- **Color-coded Risk Levels**: Visual representation of risk severity
- **Risk Distribution**: See how risks are distributed across the matrix
- **Hover Details**: Quick access to risk information

### ✏️ Detailed Assessment Forms
- **Editable Risk Factors**: Update risk details, scores, and mitigation actions
- **Real-time Calculations**: Automatic inherent and residual risk calculations
- **Status Tracking**: Monitor progress from "Not Started" to "Completed"
- **Owner Assignment**: Track responsibility for each risk factor

## Risk Categories Covered

### 1. Revenue Recognition
- Premature revenue recognition risks
- Complex contract terms interpretation
- Revenue cut-off procedures

### 2. Materiality
- Materiality threshold determination
- Qualitative materiality factors
- Industry benchmarking

### 3. COGS Allocation
- Cost allocation methodology risks
- Inventory valuation accuracy
- Variance analysis procedures

### 4. Segregation of Duties
- Financial reporting process controls
- System access management
- Approval hierarchy implementation

### 5. Supervision and Review
- Management oversight adequacy
- Technical expertise requirements
- Review documentation standards

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd risk_assessment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Option 3: Manual Deploy
1. Build the project: `npm run build`
2. Upload the `.next` folder to Vercel

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── RiskOverviewDashboard.tsx    # Main dashboard component
│   ├── RiskMatrix.tsx               # Risk matrix visualization
│   └── RiskAssessmentForm.tsx       # Detailed assessment forms
├── data/
│   └── gaap-audit-data.ts          # Sample risk assessment data
└── types/
    └── risk-assessment.ts          # TypeScript type definitions
```

## Risk Scoring Methodology

### Inherent Risk Calculation
```
Inherent Risk = Likelihood (1-5) × Impact (1-5)
```

### Residual Risk Calculation
```
Residual Risk = Inherent Risk × Control Effectiveness Factor

Control Effectiveness Factors:
- Ineffective: 0.9 (10% reduction)
- Partially Effective: 0.7 (30% reduction)
- Effective: 0.4 (60% reduction)
- Highly Effective: 0.2 (80% reduction)
```

### Risk Level Classification
- **Critical**: 20-25 points
- **High**: 15-19 points
- **Medium**: 10-14 points
- **Low-Medium**: 6-9 points
- **Low**: 1-5 points

## Customization

### Adding New Risk Categories
1. Update `GAAP_RISK_CATEGORIES` in `src/types/risk-assessment.ts`
2. Add new category data in `src/data/gaap-audit-data.ts`
3. The dashboard will automatically include the new category

### Modifying Risk Factors
Edit the risk factor arrays in `src/data/gaap-audit-data.ts` to:
- Add new risk factors
- Update descriptions and mitigation actions
- Adjust risk scores and ownership

### Styling Changes
The application uses Tailwind CSS. Modify component classes or extend the Tailwind configuration in `tailwind.config.js`.

## Data Persistence

Currently, the application uses in-memory state management. For production use, consider integrating:
- Database storage (PostgreSQL, MongoDB)
- API endpoints for CRUD operations
- User authentication and authorization
- Audit trail logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Note**: This application contains sample data for demonstration purposes. Replace with your actual risk assessment data before production use.