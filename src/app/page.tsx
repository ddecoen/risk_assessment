import RiskOverviewDashboard from '@/components/RiskOverviewDashboard';
import { gaapAuditAssessment } from '@/data/gaap-audit-data';

export default function Home() {
  return (
    <main>
      <RiskOverviewDashboard assessment={gaapAuditAssessment} />
    </main>
  );
}