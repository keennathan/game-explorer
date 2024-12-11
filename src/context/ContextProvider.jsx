import React from "react";
import { GameProvider } from "./GameContext";

const ContextProvider = ({ children }) => {
    return (
        <GameProvider>
            {children}
        </GameProvider>
    );
};

export default ContextProvider;