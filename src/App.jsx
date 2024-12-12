import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";   
import Home from "./pages/Home";    
import SearchGames from "./pages/SearchGames";
import Watchlist from "./pages/Watchlist";
import GameDetail from "./pages/GameDetail";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchGames />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/game/:id" element={<GameDetail />} />
            </Routes>
        </Router>
    );
};

export default App;