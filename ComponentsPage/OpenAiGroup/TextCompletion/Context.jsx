import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

export const AppContext = React.createContext();

export const TextCompletionProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({ prompt: "" });

  const [dataArray, setDataArray] = useState([]);
  const [test, setTest] = useState("Test");
  const [isGeneratingText, setIsGeneratingText] = useState(false);

  useLayoutEffect(() => {
    let textsArray = JSON.parse(localStorage.getItem("textCompletionArray"));

    if (textsArray) {
      setDataArray(textsArray);
    }
    return () => {};
  }, []);
  const handleItemDelete = async (id) => {
    let cachedData = dataArray;

    let finalData = cachedData.filter((item) => id !== item.createdAt);

    await localStorage.setItem(
      "textCompletionArray",
      JSON.stringify(finalData)
    );

    setDataArray(finalData);
  };
  return (
    <AppContext.Provider
      value={{
        test,
        setTest,
        dataArray,
        setDataArray,
        isGeneratingText,
        setIsGeneratingText,
        formData,
        setFormData,
        inputRef,
        handleItemDelete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useTextCompletionContext = () => {
  return useContext(AppContext);
};
