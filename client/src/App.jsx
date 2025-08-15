import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { NPOContent } from "./components/NPOContent";
import { VolunteerContent } from "./components/volunteerTable";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<NPOContent />}
                />
                <Route
                    path="/volunteers"
                    element={<VolunteerContent />}
                />
            </Routes>
        </Router>
    );
};

export default App;
