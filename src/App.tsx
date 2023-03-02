import { MainSection } from './components/MainSection';
import { PageNavigation } from './components/PageNavigation';
import './App.scss';

export const App = () => {

  return (
    <div className="app">
      <PageNavigation />

      <MainSection />
    </div>
  );
};
