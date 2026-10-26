import { Grid, Section, Stat } from '@/components/ui';
import type { Stat as VentureStat, Tone } from '@/types';

export function VentureStats({ stats, tone }: { stats: VentureStat[]; tone: Tone }) {
  return (
    <Section pt="none" pb="none">
      <Grid min={220} gap="sm" pair data-stagger="90">
        {stats.map((st) => (
          <Stat
            key={st.label}
            variant="soft"
            size="lg"
            soft={tone.soft}
            ink={tone.ink}
            count={st.n}
            suffix={st.suffix}
            value={`${st.n}${st.suffix}`}
            label={st.label}
          />
        ))}
      </Grid>
    </Section>
  );
}
