import { MainSection } from './components/MainSection';
import { PageNavigation } from './components/PageNavigation';

export const App = () => {

  return (
    <div>
      <PageNavigation />

      <div className="block">
        <MainSection />
      </div>
    </div>
  );
};
