import { AppLink, Icon, Section, SectionHeader } from '@/components/ui';
import { companyLogo } from '@/content/assets';
import { COUNTRY_LABELS, GROUP_COMPANIES } from '@/content/companies';
import { SERVICES, serviceHref } from '@/content/services';
import s from './OurCompanies.module.css';

/** 02 — The group's seven companies, as listed in the content document, each with its role and country. */
export function OurCompanies() {
  return (
    <Section id="companies" data-screen-label="Companies" pt="none">
      <SectionHeader
        kicker="02 — Our companies"
        title="The WalletEdge Global group of companies"
        layout="split"
        lead="Seven companies across the UAE and India: two parent companies and the companies that deliver each of our services."
      />

      <table className={s.table}>
        <thead>
          <tr>
            <th scope="col">Company</th>
            <th scope="col">Role</th>
            <th scope="col" className={s.countryHead}>
              Country
            </th>
          </tr>
        </thead>
        <tbody>
          {GROUP_COMPANIES.map((c) => {
            const service = SERVICES.find((x) => x.id === c.service);
            return (
              <tr key={c.name}>
                <th scope="row" className={s.company}>
                  <span className={s.companyCell}>
                    <span className={s.logo}>
                      {companyLogo(c) ? <img src={companyLogo(c)} alt="" /> : <Icon name="corporate_fare" size={22} />}
                    </span>
                    <span>
                      <span className={s.name}>{c.name}</span>
                      {c.note && <span className={s.note}>{c.note}</span>}
                    </span>
                  </span>
                </th>
                <td className={s.role}>
                  {service ? (
                    <AppLink to={serviceHref(service.id)} className={s.serviceLink}>
                      <span className={s.dot} style={{ background: service.tone.accent }} aria-hidden="true" />
                      {service.title}
                      <Icon name="arrow_outward" size={16} className={s.arrow} />
                    </AppLink>
                  ) : (
                    <span className={s.parent}>Parent company</span>
                  )}
                </td>
                <td className={s.country}>{COUNTRY_LABELS[c.country]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
}
