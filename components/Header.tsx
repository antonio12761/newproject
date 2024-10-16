import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex justify-end items-center p-4 bg-gray-100 dark:bg-gray-800">
      <div className="flex space-x-4 mr-4">
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Registrati
        </Link>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
