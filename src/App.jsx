import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import Chatbot from "./components/ChatBot/Chatbot";
import { AvatarProvider } from "./context/AvatarContext";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AdminRoute from "./routes/AdminRoute";
import { useLocation } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <AvatarProvider>
      {window.location.pathname.startsWith("/Admin") ? null : <Chatbot />}
      <Routes>
        {PublicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.component;
          const element = route.path.startsWith("/Admin")
              ? (
                  <AdminRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </AdminRoute>
                )
              : (
                  <Layout>
                    <Page />
                  </Layout>
                );

            return <Route key={route.path} path={route.path} element={element} />;
          // return (
          //   <Route
          //     key={index}
          //     path={route?.path}
          //     element={
          //       <Layout>
          //         <Page />
          //       </Layout>
          //     }
          //   />
          // );
        })}
      </Routes>
      </AvatarProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Router>
  );
};

export default App;
