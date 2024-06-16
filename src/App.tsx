import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Write from "./components/write"; 
import Read from "./components/Read";
import UpdateRead from "./components/UpdateRead";
import UpdateWrite from "./components/UpdateWrite";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Write />} />
          <Route path="/write" element={<Write />} />
          <Route path="/Read" element={<Read />} />
          <Route path="/UpdateRead" element={<UpdateRead />} />
          <Route path="/UpdateWrite/:firebseId" element={<UpdateWrite />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
