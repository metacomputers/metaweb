import { Outlet } from "react-router-dom"


function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen">
  
  <header className="bg-black text-white p-5">
    <div className="container mx-auto flex justify-between items-center">
      <div className="logo">
        <img src="path-to-logo.png" alt="Meta Computers Logo" className="h-10" />
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#home" className="hover:text-gray-400">Home</a></li>
          <li><a href="#products" className="hover:text-gray-400">Products</a></li>
          <li><a href="#services" className="hover:text-gray-400">Services</a></li>
          <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  
  <div className="flex-grow">
    <div>
      <h5 className="text-4xl font-extrabold tracking-tight">Welcome to Meta Computers</h5>
    </div>
    <div>
      <Outlet/>
    </div>
  </div>

  
  <footer className="bg-black text-white p-5 text-center">
    <div className="container mx-auto">
      <p>&copy; 2024 Meta Computers. All rights reserved.</p>
      <p>
        <a href="#privacy" className="hover:text-gray-400">Privacy Policy</a> | 
        <a href="#terms" className="hover:text-gray-400">Terms of Use</a>
      </p>
    </div>
  </footer>
</div>

  )
}

export default AuthLayout