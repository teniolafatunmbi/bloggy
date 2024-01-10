import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateArticle from "./pages/create-article";
import Layout from "./components/layout";
import NotFound from "./pages/not-found";
import { Toaster } from "./components/toaster";
import { ViewArticles } from "./pages/articles";



const routes = [
  {
    path: '/',
    element: <ViewArticles />
  },
  {
    path: '/create-article',
    element: <CreateArticle />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <BrowserRouter>
          <Layout>
            <Routes>
              {
                routes.map((route, idx) => (
                  <Route key={idx} element={route.element} path={route.path} />
                ))
              }
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
