import React from 'react'
import './home.css';
import NotesList from '../RecipeList/index';
import LoginForm from '../Login/LoginForm';


 const HomePage=()=> {
    const user=localStorage.getItem("user")
    // console.log(user);
    return(
        <div>
        {user ?<NotesList queryString=""/>:<LoginForm/>}
        </div>
    )
}
export default HomePage;