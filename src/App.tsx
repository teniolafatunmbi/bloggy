import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import ViewArticles from "./pages/articles";
import CreateArticle from "./pages/create-article";
import Layout from "./components/layout";
import NotFound from "./pages/not-found";


const router = createBrowserRouter([
  {
    path: '/',
    element: <ViewArticles />
  },
  {
    path: '/create-article',
    element: <CreateArticle />
  }
])

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
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route element={<CreateArticle />} path="/create-article"/>
              <Route element={<ViewArticles />} path="/"/>
              <Route element={<NotFound />} path="*"/>
            </Routes>
          </Layout>
        </BrowserRouter>
          <RouterProvider router={router}/>
      </QueryClientProvider>
    </>
  )
}

export default App
