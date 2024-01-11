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
  return (
    <>
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
    </>
  )
}

export default App
