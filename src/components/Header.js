import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import logoApp from "../assets/images/logo192.jpg";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";

const Header = (props) => {

    const navigate = useNavigate();

    const user = useSelector(state => state.user.account);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(handleLogoutRedux());
    }
    useEffect(() => {
        if (user && user.auth === false) {
            navigate("/");
            toast.success("Log out success");
        }
    }, [user])

    return (
        <>
            <Navbar expand="lg" bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link">
                                <img
                                    src={logoApp}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                                &nbsp;
                                <span>My demo app  </span>
                            </NavLink>
                        </Nav>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === "/") &&
                            <>
                                <Nav className="me-auto">
                                    <NavLink to="/" className="nav-link">Home</NavLink>
                                    <NavLink to="/users" className="nav-link">Manage User</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className="nav-link">Welcome {user.email} </span>}
                                    <NavDropdown title="Setting">
                                        {user && user.auth === true
                                            ? <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                            : <NavLink to="/login" className="dropdown-item">Login</NavLink>
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;