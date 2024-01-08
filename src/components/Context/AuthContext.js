import axios from "axios";
import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [noteId, setNoteId] = useState([]);
    const [login, setLogin] = useState([]);
    const [user, setUser] = useState([]);
    const [userlist, setUserList] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [listItemsLo, setListItemsLo] = useState([]);
    const [notes, setNotes] = useState([]);
    const [QueryString, setQueryString] = useState("");
    const [deletenote, setDeleteNotes] = useState("");
    const [data, setData] = useState([]);
    const [recipeDetails, recipeDetailsSet] = useState([]);


    const loginPage = async (data) => {
        try {
            const response = await axios.post("http://localhost:4000/user/login", data);
            console.log(response.data.status);
            if (response.data.status) {
                setLogin(response.data.data)
                localStorage.setItem("authToken", response.data.data.token);
                localStorage.setItem("user", JSON.stringify({ userDetials: response.data.data }));
                navigate("recipe-list");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const signupPage = async (data) => {
        try {
            const response = await axios.post("http://localhost:4000/user/sign-up", data);
            if (response.data.status) {
                setUser(response.data)
                toast.success(response.data.messages)

                localStorage.setItem("authToken", response.data.data.token);
                localStorage.setItem("user", JSON.stringify({ userDetials: response.data.data }));
                navigate("/save-recipe")

            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const recipeList = async (data) => {
        try {
            const response = await axios.get("http://localhost:4000/recipe/list", data);
            console.log("%%%%%%%%%%%%", response);
            if (response.data.status) {
                setListItems(response.data.data)
                // navigate("/recipe-list")
            } else {
                toast.error(response.data.messages)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const recipeListLocal = async (data) => {
        try {
            console.log("%%%%%%%%%%%%", data);
            const response = await axios.post("http://localhost:4000/recipe/get-list", data);
            if (response.data.status) {
                setListItemsLo(response.data.data)
                // navigate("/recipe-list")
            } else {
                toast.error(response.data.messages)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const recipePDP = async (data) => {
        try {
            console.log("%%%%%%%%%%%%", data);

            const response = await axios.get("http://localhost:4000/recipe/recipe-details", data);
            if (response.data.status) {
                recipeDetailsSet(response.data.data)
                // navigate("/recipe-list")
            } else {
                toast.error(response.data.messages)
            }
        } catch (error) {
            console.log(error);
        }
    }
    // const debounce = (func) => {
    //     let timer;
    //     return function () {
    //         if (timer) clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             timer = null;
    //             func();
    //         }, 800);
    //     }
    // }

    // const debouncedIssueSearch = useCallback(debounce(listItems.length == 0 ? recipeListLocal() : recipeList()), [])
    return (
        <AuthContext.Provider value={{recipeDetails, recipeDetailsSet, loginPage,recipePDP, signupPage, listItems, listItemsLo, recipeListLocal, recipeList, setQueryString, QueryString, noteId, setNoteId, data }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth }