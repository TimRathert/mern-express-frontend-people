import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <header style={{height: "300px", overflow: "hidden"}}>
        <nav className='nav'>
            <Link to="/">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    alt = "Icon"
                />
            </Link>
            <div>
                <Link to="/people" style={{textDecoration:"none"}}> People </Link>
                & 
                <Link to="/fish" style={{textDecoration:"none"}}> Fish </Link>
                </div>
        </nav>
        <img 
            style={{ width: "80%", borderRadius: "15px", overflow: "hidden"}} 
            src="https://media.istockphoto.com/photos/group-portrait-of-a-creative-business-team-standing-outdoors-three-picture-id1146473249?b=1&k=20&m=1146473249&s=612x612&w=0&h=-q1guVCuei7X3BFKwWC2bLUOX8BeIaC04pG5s_xfn_c="
            alt="Group"
        />
    </header>
  )
}

export default Header