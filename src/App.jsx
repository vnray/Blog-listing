import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogList from "./pages/BlogList";
import { Store } from "./store/Store";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <>
      <Provider store={Store}>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
