// import logo from './logo.svg';
import {  Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import RecipeList from './components/RecipeList/index.jsx';
import RecipeDetails from './components/RecipeList/pdp.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Signup/SignupPage';
import HomePage from './components/Home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/recipe-details/:id" element={<RecipeDetails/>} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/recipe-list' element={<RecipeList queryString=""/>}></Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} pauseOnHover={false}
      />
    </>
  )
}

export default App;
