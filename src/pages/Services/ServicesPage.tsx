import { AppLink } from '@/components/ui/AppLink';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { Icon } from '@/components/ui/Icon';
import { SectionIndex } from '@/components/ui/SectionIndex';
import { Tile } from '@/components/ui/Tile';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/data/routes';
import { CONSULTING_SERVICES, SERVICE_PILLARS } from '@/data/services';
import s from './ServicesPage.module.css';

export function ServicesPage() {
  useDocumentTitle('Services — WalletEdge Global');
  return (
    <>
      {/* Hero */}
      <section data-screen-label="Services hero" className={s.hero}>
        <div className={`container ${s.heroInner}`}>
          <span data-reveal="fade" className="eyebrow">
            Our services
          </span>
          <h1 data-reveal="up" className={`display-1 ${s.heroTitle}`}>
            Five practices, run by specialists, backed by one group.
          </h1>
          <div data-stagger="60" className={s.pillars}>
            {SERVICE_PILLARS.map((p) => (
              <AppLink key={p.anchor} to={p.anchor} className={s.pillar}>
                <Tile icon={p.icon} size={32} radius={999} iconSize={18} bg={p.tone.soft} ink={p.tone.ink} />
                {p.title}
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — IT & BPO */}
      <section id="it-bpo" data-screen-label="IT & BPO" className={s.itSection}>
        <div data-reveal="up" className={s.itPanel}>
          <div className={s.panelHead}>
            <div className={s.panelHeadCopy}>
              <SectionIndex no="01" label="IT & BPO" />
              <h2 className={s.h2}>AI platforms for insurance and healthcare.</h2>
            </div>
            <p className={s.panelLead}>
              Our technology companies build and operate digital platforms that remove manual work from regulated industries.
            </p>
          </div>
          <div className={s.twoUp}>
            <AppLink to={ROUTES.venture('insureliv')} className={s.platform}>
              <div className={s.cardTop}>
                <Tile icon="shield_with_heart" size={52} radius={16} iconSize={26} bg="#03643B" ink="#fff" />
                <Icon name="arrow_outward" size={24} />
              </div>
              <h3 className={s.cardTitle}>InsureLiv</h3>
              <p className={s.cardText}>
                An AI-powered insurance operating system built by WhiteBlue FinTech for brokerages. It automates the entire broker workflow
                — lead capture, multi-insurer quoting, document verification and renewals — boosting productivity while cutting turnaround
                and cost.
              </p>
            </AppLink>
            <AppLink to={ROUTES.venture('arogyaplus')} className={`${s.platform} ${s.platformWarm}`}>
              <div className={s.cardTop}>
                <Tile icon="biotech" size={52} radius={16} iconSize={26} bg="#CF5512" ink="#fff" />
                <Icon name="arrow_outward" size={24} />
              </div>
              <h3 className={s.cardTitle}>ArogyaPlus</h3>
              <p className={s.cardText}>
                A Dubai-based health technology platform powered by Wallet Edge Technologies — at-home and in-clinic medical services,
                health packages, lab test bookings with home sample collection, and professional nursing care.
              </p>
            </AppLink>
          </div>
        </div>
      </section>

      {/* 02 — Financial · 03 — Real estate */}
      <section id="financial" data-screen-label="Financial" className={s.finSection}>
        <div className={`container ${s.twoUp}`}>
          <div data-reveal="up" className={s.finPanel}>
            <div className={s.finGlow} />
            <SectionIndex no="02" label="FINANCIAL SERVICES" className={`${s.rel} ${s.indexLight}`} ruleClassName={s.ruleLight} />
            <h2 className={`${s.h2sm} ${s.rel}`}>Insurance recovery agent services.</h2>
            <p className={`${s.finText} ${s.rel}`}>
              Professional financial recovery and asset retrieval — faster turnaround through data-driven processes and transparent
              communication with every stakeholder.
            </p>
            <div className={`${s.finChips} ${s.rel}`}>
              <span className={s.finChip}>
                <Icon name="apartment" size={19} color="#F0A06A" />
                EMAAR
              </span>
              <span className={s.finChip}>
                <Icon name="verified_user" size={19} color="#F0A06A" />
                LIVA Insurance
              </span>
              <AppLink to={ROUTES.venture('recovery')} className={s.finLink}>
                Recovery Services
                <Icon name="arrow_forward" size={18} />
              </AppLink>
            </div>
          </div>

          <div id="real-estate" data-reveal="up" data-delay="120" className={s.rePanel}>
            <SectionIndex no="03" label="REAL ESTATE" />
            <h2 className={s.h2sm}>Building homes in Coimbatore.</h2>
            <p className={s.reText}>
              Jointly developing an apartment project in partnership with Seyyone Ventures — experienced in the real estate sector for more
              than two decades in Coimbatore.
            </p>
            <div className={s.reStats}>
              <div className="stat">
                <span data-count="20" data-suffix="+" className="stat__value">
                  20+
                </span>
                <span className="stat__label">Years of partner experience</span>
              </div>
              <div className="stat">
                <Icon name="location_city" size={36} color="#03643B" />
                <span className="stat__label">Apartment project, Coimbatore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Consulting */}
      <section id="consulting" data-screen-label="Consulting" className={s.consultSection}>
        <div className={`container ${s.consultInner}`}>
          <div className={s.panelHead}>
            <div className={s.panelHeadCopy}>
              <SectionIndex data-reveal="fade" no="04" label="CONSULTING SERVICES" />
              <h2 data-reveal="up" className={s.h2}>
                From company setup to steady growth.
              </h2>
            </div>
            <p data-reveal="up" className={s.panelLead}>
              Practical advisory for founders and enterprises entering or scaling in the UAE.
            </p>
          </div>
          <div data-stagger="70" className={s.consultGrid}>
            {CONSULTING_SERVICES.map((c) => (
              <div key={c.title} data-spot="1" className={s.consultCard}>
                <Tile icon={c.icon} size={48} radius={14} iconSize={24} bg="#F6F4EE" ink="#CF5512" />
                <span className={s.consultText}>
                  <span className={s.consultTitle}>{c.title}</span>
                  <span className={s.consultDesc}>{c.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Healthcare */}
      <section id="healthcare" data-screen-label="Healthcare" className={s.healthSection}>
        <div data-reveal="up" className={s.healthPanel}>
          <div className={s.panelHead}>
            <div className={s.panelHeadCopy}>
              <SectionIndex no="05" label="HEALTHCARE SERVICES" className={s.indexHealth} ruleClassName={s.ruleHealth} />
              <h2 className={s.h2}>Major stakes in DHA-licensed healthcare.</h2>
            </div>
            <p className={s.healthLead}>WalletEdge Global owns major stakes in the following Dubai Health Authority licensed companies.</p>
          </div>
          <div className={s.twoUp}>
            <AppLink to={ROUTES.venture('carehub')} className={s.healthCard}>
              <div className={s.cardTop}>
                <Tile icon="home_health" size={52} radius={16} iconSize={26} bg="#03643B" ink="#fff" />
                <span className={s.healthMeta}>carehubuae.com</span>
              </div>
              <h3 className={s.healthTitle}>CareHub Healthcare LLC</h3>
              <p className={s.cardText}>
                A premier DHA-licensed home healthcare provider in Dubai — 24/7 private nursing, elderly assistance, post-operative recovery,
                wound care, IV infusions, physiotherapy and digital phlebotomy.
              </p>
              <span className={s.healthMore}>
                View company
                <Icon name="arrow_forward" size={18} />
              </span>
            </AppLink>
            <AppLink to={ROUTES.venture('globalcure')} className={s.healthCard}>
              <div className={s.cardTop}>
                <Tile icon="medication" size={52} radius={16} iconSize={26} bg="#CF5512" ink="#fff" />
                <span className={s.healthMeta}>+971 50 515 2391</span>
              </div>
              <h3 className={s.healthTitle}>Global Cure RX Pharmacy LLC</h3>
              <p className={s.cardText}>
                A community pharmacy in Dubai dispensing high-value prescriptions with insurance tie-ups — plus OTC medicines, supplements,
                medication counselling and repeat dispensing. Walk-ins welcome.
              </p>
              <span className={s.healthMore}>
                View company
                <Icon name="arrow_forward" size={18} />
              </span>
            </AppLink>
          </div>
        </div>
      </section>

      <CtaBanner title="Not sure which practice fits? We’ll route you to the right team." cta="Contact us" to={ROUTES.contact} />
    </>
  );
}
