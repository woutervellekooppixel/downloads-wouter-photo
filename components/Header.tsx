const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <a
          href="https://wouter.photo"
          className="text-xl font-bold tracking-tight"
          target="_blank"
          rel="noopener noreferrer"
        >
          WOUTER.PHOTO
        </a>
        <nav className="hidden md:flex space-x-6 text-sm">
          <a
            href="https://wouter.photo/concerts"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Concerts
          </a>
          <a
            href="https://wouter.photo/events"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Events
          </a>
          <a
            href="https://wouter.photo/miscellaneous"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Misc
          </a>
          <a
            href="https://wouter.photo/about"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            About
          </a>
          <a
            href="https://www.instagram.com/woutervellekoop.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;