import { NavLink } from "react-router-dom"
// import '../index.css'

// import '../App.css'

const Navbar = () => {
  return (
    <div className="flex flex-row gap-[100px] ml-[520px] mb-4 mt-4">
      <NavLink
      to="/">
        Home  
    </NavLink>
    <NavLink
    to="/pastes">
       Pastes
    </NavLink>
    </div>
  )
}

export default Navbar
