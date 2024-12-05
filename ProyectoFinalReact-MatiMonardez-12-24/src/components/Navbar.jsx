import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../imagenes/logoelemento.jpg'
import CartWidget from './CartWidget'
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'
function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="warning" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            {' '}
            <Link className="link" to={'/'}>
              {' '}
              <img src={logo} alt="logo" style={{ width: 100, height: 100 }} />
            </Link>{' '}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown title="Secciones" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  {' '}
                  <Link className="link" to={'/'}>
                    Inicio
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  {' '}
                  <Link className="link" to={'/categoria/Living'}>
                    Living
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link className="link" to={'/categoria/Dormitorio'}>
                    Dormitorio
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link className="link" to={'/categoria/Cocina'}>
                    {' '}
                    Cocina
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link className="link" to={'/categoria/Oficina'}>
                    Oficina
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link className="link" to={'/Contacto'}>
                    Contacto{' '}
                  </Link>{' '}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <CartWidget />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default ColorSchemesExample
