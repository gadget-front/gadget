import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import { Header } from './components/Header';
import { Category } from './components/Category';
import './components/Common.css';

function App() {
  return (
    <div className='main-container'>
      <SideBar/>
      <Header/>
      <Category/>
    </div>
  );
}

export default App;
