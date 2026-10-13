import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/Home/HomePage';
import { ServicesPage } from '@/pages/Services/ServicesPage';
import { CompaniesPage } from '@/pages/Companies/CompaniesPage';
import { TeamPage } from '@/pages/Team/TeamPage';
import { ContactPage } from '@/pages/Contact/ContactPage';
import { VenturePage } from '@/pages/Venture/VenturePage';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="ventures/:id" element={<VenturePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
