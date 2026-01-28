import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, AnimationProvider, ProblemProvider } from './context';
import { HomePage, ProblemPage, AboutPage } from './pages';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimationProvider>
          <ProblemProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/problem/:problemId" element={<ProblemPage />} />
            </Routes>
          </ProblemProvider>
        </AnimationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
