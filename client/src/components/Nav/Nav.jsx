import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../img/logoo.png'
import {UilSetting} from '@iconscout/react-unicons'
import Home from '../../img/hom.png'
import Noti from '../../img/bell.png'
import Comment from '../../img/comment.png'
import './Nav.css'
import Search from '../Search/Search';
import {Link} from 'react-router-dom'



const Navv = () => {
  return (

    <div className='Navbar'>
  
        <img src={Logo} className="logo" />    
      <div className="navIconn">
        
                <Link to = '../home'><img src={Home} alt="" /></Link> 
               
                   <img src={Noti} alt="" />
                   <Link to="../chat">
                      <img src={Comment} alt="" />
                   </Link>
            </div>
           
           
           

        
        
     <div className="nav-right">
     <Search/>
     </div>
     </div>
  
  );
}

export default Navv