import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./layouts/footer";
import { PublicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import Chatbot from "./components/ChatBot/Chatbot";
const App = () => {
  return (
    <Router>
      <Chatbot/>
      <Routes>
        {PublicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route?.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
