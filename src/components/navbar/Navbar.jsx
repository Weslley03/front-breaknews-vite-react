import logo from '../../images/logomarcawf.png'
import './Navbar.css'

export default function Navbar() {
    return (
        <>
        <nav>
            <div className="input-search-space">
                <i className="bi bi-search"></i>
                <input type="text" placeholder='pesquise por um título'/>
            </div>  

            <img src={logo} alt="logo break news"></img>
        
            <button>entrar</button>
        </nav>
        </>
    )
}