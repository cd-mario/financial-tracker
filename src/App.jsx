import { useCallback, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])

  return (
    <>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onMenuClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  )
}

export default App
