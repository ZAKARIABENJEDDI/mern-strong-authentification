import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        
        <div className="space-x-4">
            <>
              <Link
                to="/login"
                className="text-white hover:bg-blue-500 px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:bg-blue-500 px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
