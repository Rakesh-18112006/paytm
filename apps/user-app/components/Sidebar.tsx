import React from 'react';
import { 
  FiHome, 
  FiCompass, 
  FiAward, 
  FiSend, 
  FiDollarSign,
  FiSettings 
} from 'react-icons/fi';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  // Updated sidebar options with React Icons
  const menuItems = [
    { icon: <FiHome size={20} />, label: 'Home', href: '/home' },
    { icon: <FiCompass size={20} />, label: 'Explore', href: '/explore' },
    { icon: <FiAward size={20} />, label: 'Rewards', href: '/rewards' },
    { icon: <FiSend size={20} />, label: 'Transfer', href: '/transfer' },
    { icon: <FiDollarSign size={20} />, label: 'Transactions', href: '/transactions' },
    { icon: <FiDollarSign size={20} />, label: 'P2P Transfer', href: '/p2ptransfer' },
    { icon: <FiSettings size={20} />, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen fixed left-0 top-0 bg-gray-200 border-r border-sky-200">
        {/* Sidebar header */}
        <div className="flex items-center justify-center h-16 border-b border-sky-200">
          <h1 className="text-xl font-semibold text-sky-800">Finance App</h1>
        </div>
        
        {/* Sidebar content */}
        <div className="flex-grow overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center p-3 rounded-lg text-sky-800 hover:bg-sky-200 transition-colors duration-200"
                  >
                    <span className="mr-3 text-sky-600">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Sidebar footer */}
        <div className="p-4 border-t border-sky-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-sky-300 flex items-center justify-center text-sky-800 font-semibold">
              AU
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-sky-800">Admin User</p>
              <p className="text-xs text-sky-600">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay - only shown when sidebar is open on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default Sidebar;