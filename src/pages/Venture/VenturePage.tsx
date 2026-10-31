import type { CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import { CtaBanner } from '@/components/ui';
import { ROUTES } from '@/config/routes';
import { usePageMeta } from '@/hooks/usePageMeta';
import { isVentureId, VENTURE_LIST, VENTURES } from '@/content/ventures';
import type { Venture } from '@/types';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';
import {
  MoreVentures,
  VentureCapabilities,
  VentureCaseStudy,
  VentureHero,
  VentureProcess,
  VentureStats
} from './sections';

export function VenturePage() {
  const { id } = useParams();
  if (!isVentureId(id)) return <NotFoundPage />;
  // Keyed so switching ventures remounts and replays the motion.
  return <VentureView key={id} v={VENTURES[id]} />;
}

/** One template for every venture: each section is driven by that venture's data in content/ventures.ts. */
function VentureView({ v }: { v: Venture }) {
  usePageMeta({ title: v.name, description: v.tagline });
  const toneVars = { '--accent': v.tone.accent } as CSSProperties;

  return (
    <div style={toneVars}>
      <VentureHero v={v} />
      {v.stats && <VentureStats stats={v.stats} tone={v.tone} />}
      <VentureCapabilities title={v.featTitle} features={v.features} tone={v.tone} />
      {v.steps && <VentureProcess steps={v.steps} />}
      {v.caseStudy && <VentureCaseStudy study={v.caseStudy} />}
      <CtaBanner
        pt="sm"
        title={`Speak with the ${v.name} team`}
        cta="Send an enquiry"
        to={ROUTES.enquire({ venture: v.id })}
      />
      <MoreVentures ventures={VENTURE_LIST.filter((o) => o.id !== v.id)} />
    </div>
  );
}
