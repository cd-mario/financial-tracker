const Navbar = () => {
  return (
    <nav className="flex items-center justify-start">
      <div className="group relative inline-flex flex-col items-center">
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md border border-white bg-transparent p-2 text-current transition-colors hover:bg-white/15"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar;
