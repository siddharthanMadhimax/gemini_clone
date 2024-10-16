import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";
import { v4 as uuidv4 } from 'uuid';

export var Context = createContext();

var ContextProvider = (props) => {
    var [input, setInput] = useState("");
    var [recentPrompt, setRecentPrompt] = useState("");
    var [previousPrompt, setPreviousPrompt] = useState([]);
    var [showResult, setShowresult] = useState(false);
    var [loading, setLoading] = useState(false);
    var [resultDAta, setResultData] = useState("");

    useEffect(() => {
        fetch("http://localhost:3500/questions")
            .then((response) => response.json())
            .then((data) => {
                // Ensure data includes IDs and handle the case where IDs might be missing
                setPreviousPrompt(data.map(item => ({
                    id: item.id || uuidv4(), // Use existing ID or generate a new one
                    question: item.question,
                    answer: item.answer
                })));
            });
    }, []);

    var saveToDb = async (question, answer) => {
        const newEntry = { id: uuidv4(), question, answer };
        await fetch("http://localhost:3500/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        });
    };

    var deplayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    var newChat = () => {
        setLoading(false);
        setShowresult(false);
    };

    var onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowresult(true);
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            const newEntry = { id: uuidv4(), question: input }; // Generate UUID for new entry
            setPreviousPrompt((prev) => [...prev, newEntry]); // Save question with UUID
            setRecentPrompt(input);
            response = await run(input);
        }

        const parsedResponse = response.replace(/(?:\*\*(.*?)\*\*)/g, "<b>$1</b>").replace(/\*/g, "<br>");
        const words = parsedResponse.split(" ");

        words.forEach((word, i) => deplayPara(i, word + " "));
        
        saveToDb(recentPrompt || input, response);

        setLoading(false);
        setInput("");
    };

    var deleteFromDb = async (id) => {
        try {
            const response = await fetch(`http://localhost:3500/questions/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete: ${response.statusText}`);
            }
    
            console.log('Deletion successful');
            // Remove the deleted item from state immediately
            setPreviousPrompt((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };
    
    var contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultDAta,
        input,
        setInput,
        newChat,
        deleteFromDb,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
