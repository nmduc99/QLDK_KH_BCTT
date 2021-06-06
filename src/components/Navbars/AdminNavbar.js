
import React  from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
function Header() {

    function Logout() {
        sessionStorage.removeItem('authen')
        window.location.href = '/';
    }


  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            
          </Nav>
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
              >
                <span className="no-icon" onClick={Logout}>Log out</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
