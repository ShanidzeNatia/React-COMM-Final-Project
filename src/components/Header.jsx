import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

export const Header = () => {
    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        localStorage.removeItem("users");
        navigate('/login');
    }

    return (
        <>
            <div className="header-part">
                <Container>
                    <div className="header">
                        <div className="logo">
                            <Link to='/'>
                                <img src="https://rails-assets-us.bookshop.org/ds/images/logo.041f4577edde0efff6b67907832d4c3dfd52407b.svg" />
                            </Link>
                        </div>
                        <div className="main-menu">
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/favourites'>Favourites</Link></li>
                            </ul>
                        </div>
                        <div className="auth-block">
                            <div className="user"><i>{ userName }</i></div>
                            <Link onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Header;