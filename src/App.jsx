import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";   
import Home from "./pages/Home";    
import SearchGames from "./pages/SearchGames";
import Watchlist from "./pages/Watchlist";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchGames />} />
                <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
        </Router>
    );
};

export default App;