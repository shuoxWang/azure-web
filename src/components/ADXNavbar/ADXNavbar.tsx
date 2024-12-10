import { Navbar, Nav, Button } from "react-bootstrap"
import "../ADXNavbar/ADXNavbar.css"

interface NavbarProps {
    toggleSidebar: () => void;
}
const ADXNavbar: React.FC<NavbarProps> = ({toggleSidebar}) => {
    return (
        <Navbar className="navbar navbar-expand">
            <button className="button-custom" type="button" onClick={toggleSidebar}><span className="navbar-toggler-icon custom"></span></button>
            <span className="navbar-brand">Azure Data Explorer</span>
        </Navbar>
    );
}

export default ADXNavbar;