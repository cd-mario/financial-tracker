import { useEffect, useRef } from "react";

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocusedElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    sidebarRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = sidebarRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements?.length) {
        event.preventDefault();
        sidebarRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-white/6 transition-opacity duration-300 motion-reduce:transition-none ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden="true"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      />
      <aside
        id="app-sidebar"
        ref={sidebarRef}
        role="dialog"
        aria-modal={isOpen}
        aria-labelledby="sidebar-title"
        aria-hidden={!isOpen}
        inert={!isOpen}
        tabIndex={-1}
        className={`fixed left-0 top-0 z-50 flex h-screen w-[230px] flex-col border-r rounded-r-2xl border-white/50 bg-[#010409] p-4 text-white outline-none transition-transform duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <h2 id="sidebar-title" className="text-lg font-medium">
            Menu
          </h2>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-current transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
