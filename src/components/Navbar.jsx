import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/UserSlice";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const userStore = useSelector((state) => state.user);
  const login = userStore.login;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/landingPage");
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <nav className="navbar bg-base-100 rounded-box gap-4 shadow">
      <div className="navbar-start items-center">
        <a
          className="link text-base-content/90 link-neutral text-xl font-semibold no-underline"
          href="#"
        >
          Dream Jobs
        </a>
      </div>
      <div className="navbar-end flex items-center gap-4">
        <label className="input-group hidden max-w-56 rounded-full md:flex">
          <span className="input-group-text">
            <span className="icon-[tabler--search] text-base-content/80 size-5" />
          </span>
          <input
            type="search"
            className="input grow rounded-e-full"
            placeholder="Search"
          />
        </label>
        <div className="dropdown relative inline-flex">
          <button
            id="dropdown-avatar"
            type="button"
            className="dropdown-toggle flex items-center"
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <div className="avatar">
              <div className="size-9.5 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                  alt="avatar 1"
                />
              </div>
            </div>
          </button>
          <ul
            className={`dropdown-menu ${
              isDropdownOpen ? "block" : "hidden"
            } min-w-60`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-avatar"
          >
            {!login && (
              <>
                <DropdownItem
                  to="/login"
                  icon="icon-[tabler--receipt-rupee]"
                  label="Login"
                />
                <DropdownItem
                  to="/signup"
                  icon="icon-[tabler--help-triangle]"
                  label="Signup"
                />
              </>
            )}
            {login && (
              <li className="dropdown-footer gap-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-soft btn-block"
                >
                  <span className="icon-[tabler--logout]" />
                  Sign out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const DropdownItem = ({ to, icon, label }) => (
  <li>
    <Link className="dropdown-item" to={to}>
      <span className={icon} />
      {label}
    </Link>
  </li>
);

export default Navbar;
