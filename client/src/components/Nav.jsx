import { Link } from "react-router-dom";
const Navbar = ({ user = undefined }) => {
  return (
    <header>
      <nav className="container mx-auto">
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li> {user ? user.name : <Link to="login">Login</Link>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
