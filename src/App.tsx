
import './App.css';
import LoginForm from './components/login';
import SignupForm from './components/signup-form';
import { Route,Routes } from 'react-router-dom';
import Home from './components/home';
import TodoForm from './components/todoform';
import AllItems from './components/alltodos';
import PrivateRoute from './routing/routing-guard';
import Profile from './components/profile';
import ForgotPassword from './components/forgot-password';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm/>} ></Route>
        <Route path='/signup' element={<SignupForm/>}></Route>
        <Route path='/forgot' element={<ForgotPassword/>} ></Route>
        <Route path='/home' element={<PrivateRoute component={<Home/>}/>}>
                <Route path='addtodo' element={<TodoForm/>}></Route>
                <Route path='alltodos' element={<AllItems/>}></Route>
                <Route path='profile' element={<Profile/>} ></Route>
        </Route>
      </Routes> 
    </div>
  );
}

export default App;
