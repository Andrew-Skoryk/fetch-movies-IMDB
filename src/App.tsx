import { MainSection } from './components/MainSection';
import { PageNavigation } from './components/PageNavigation';

export const App = () => {

  return (
    <div className="app-content">
      <PageNavigation />

      <MainSection />
    </div>
  );
};
