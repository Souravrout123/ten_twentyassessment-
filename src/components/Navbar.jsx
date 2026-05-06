import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-6">
            <h1
              className="text-lg font-semibold text-gray-800"
              onClick={() => navigate("/dashboard")}
            >
              ticktock
            </h1>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-700 hover:text-black">
                Timesheets
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-sm text-gray-700 hover:text-black"
            >
              John Doe
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-10 w-40 bg-white border rounded-md shadow-md">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <a className="block py-2 text-sm text-gray-700">Timesheets</a>

          <div className="border-t mt-2 pt-2">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between w-full text-sm text-gray-700"
            >
              John Doe
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="mt-2 space-y-1">
                <a className="block text-sm py-1">Logout</a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
