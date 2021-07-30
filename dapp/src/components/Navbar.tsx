import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  address: string;
}

const CustomNavbar = ({ address }: Props) => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Brand link</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Item>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/price-consumer">
              Price Consumer
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/vrf">
              VRF Consumer
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/api-consumer">
              API Consumer
            </Link>
          </Nav.Item>
          <Nav.Item></Nav.Item>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>{address}</Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default CustomNavbar;
