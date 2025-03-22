import '../App.css';
import CategoryFilter from '../components/CategoryFilter';
import Fingerprint from '../Fingerprint';
import PrivacyPolicy from '../PrivacyPolicy';
import ProjectList from '../components/ProjectList';
import CookieConsent from 'react-cookie-consent';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-4">
        <WelcomeBand />
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories} // Pass which categories are selected to this component
              setSelectedCategories={setSelectedCategories} // Passes the function to set these categories
            />
          </div>
          <div className="col-md-9">
            <ProjectList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Fingerprint />
    </>
  );
}

export default ProjectsPage;
