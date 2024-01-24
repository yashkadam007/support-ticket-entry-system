import React from "react";
import Link from "next/link";


const Navbar = () => {
    return(
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            
            <a className="btn btn-ghost text-xl">Support Ticket Entry System</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/support-agents">Support Agents</Link></li>
              <li><Link href="/support-tickets">Support Tickets</Link></li>
            </ul>
          </div>
        </div>
    )
}

export default Navbar