
import { Outlet } from "react-router-dom";
import Sidenav from "./sidenav";
import Nav from "./topnav";
import style from './styles.module.css';
const Home=()=>{


    return(
        <div>
        <div className="topnav">
                <Nav/>
        </div>
        <div>
            <div className="sidenav" style={{float:"left"}}>
                <Sidenav/>
            </div>
            <div className="todo" style={{float:"left"}}>
                    <Outlet></Outlet>
            </div>
        </div>
        </div>
        
    )
}

export default Home;