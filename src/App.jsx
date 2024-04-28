import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ErrorBoundary from "./components/ErrorBoundary";
import { useState, lazy, Suspense } from "react";
import Loader from "./components/Loader";
import AdoptedPetContext from "./contexts/adoptedPetContext";

const SearchParams = lazy(() => import("./pages/SearchParams"));
const Details = lazy(() => import("./pages/Details"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      casheTime: Infinity,
    },
  },
});

function App() {
  const adoptedPet = useState(null);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div className="loader-container">
                  <Loader />
                </div>
              }
            >
              <header>
                <Link to="/">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
