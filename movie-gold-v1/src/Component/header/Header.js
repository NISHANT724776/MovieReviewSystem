
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
// // import Button from "react-bootstrap/Button";
// // import Container from "react-bootstrap/Container"
// // import Nav from "react-bootstrap/Nav";
// // import Navbar from "react-bootstrap/Navbar";
// // import {NavLink} from "react-router-dom";
// // import './movieheader.css'


// // const Header = () => {
// //     const [searchinput, setSearchinput] = useState([]);
// //     const getMovieData = () => {
        
// //     }
// //     const Onsearchinput = event => {
// //         setSearchinput(event.target.value);


// //     }

// //     return (
// //         <Navbar bg="dark" variant="dark" expand="lg">
// //             <Container fluid >

// //             <Navbar.Brand href="/" style={{"color":'gold'}}>
// //                 <FontAwesomeIcon icon ={faVideoSlash}
// //                 />Gold
// //             </Navbar.Brand>
// //             <Navbar.Toggle aria-controls="navbarScroll" />
// //             <Navbar.Collapse id="navbarScroll" >
// //                 <Nav
// //                         className="me-auto my-2 my-lg-0"
// //                         style={{maxHeight: '120px'}}
// //                         navbarScroll
// //                 >
// //                 <NavLink className ="nav-link" to="/">Home</NavLink>
// //                 <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>      
// //                 </Nav>
// //                 <div className="search-container">
// //                     <input type="search" value={searchinput} onChange={Onsearchinput} placeholder="Enter Movie Name "/>
// //                     <Button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></Button>
                    
// //                 </div>
// //                 <Button variant="outline-info" className="me-2">Login</Button>
// //                 <Button variant="outline-info">Register</Button>

// //             </Navbar.Collapse>
// //         </Container>
// //     </Navbar>
// //   )
// // }

// // export default Header
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faVideoSlash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { NavLink } from "react-router-dom";
// import './movieheader.css';
// import axios from 'axios';

// const Header = ({ onSearch }) => {
//     const [searchInput, setSearchInput] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     const handleSearchInput = async (event) => {
//         const searchQuery = event.target.value;
//         setSearchInput(searchQuery);
//         if (searchQuery.length > 2) {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/v1/movies/title/${searchQuery}`);
//                 const movies = response.data;
//                 setSearchResults(movies ? [movies] : []); // Handle a single movie or an array of movies
//             } catch (error) {
//                 console.error('Error searching for movie:', error);
//             }
//         } else {
//             setSearchResults([]);
//         }
//     };
//     const handleSearchSubmit = (event) => {
//         event.preventDefault();
//         // if (searchInput) {
//         //     onSearch(searchResults);
//         // }
//         if (searchResults.length > 0) {
//             console.log(searchResults); // Process or display the search results
//             // You can also add logic to redirect to a results page or display the results here
//         }
//     };
    
   

//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Container fluid>
//                 <Navbar.Brand href="/" style={{ color: 'gold' }}>
//                     <FontAwesomeIcon icon={faVideoSlash} />Gold
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="navbarScroll">
//                     <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '120px' }} navbarScroll>
//                         <NavLink className="nav-link" to="/">Home</NavLink>
//                         <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
//                     </Nav>
//                     <div className="search-container">
//                         <input
//                             type="search"
//                             value={searchInput}
//                             onChange={handleSearchInput}
//                             placeholder="Enter Movie Name"
//                         />
//                         <Button onClick={handleSearchSubmit}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
//                     </div>
//                     <Button variant="outline-info" className="me-2">Login</Button>
//                     <Button variant="outline-info">Register</Button>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default Header;


import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import './movieheader.css';
import axios from 'axios';
import { click } from "@testing-library/user-event/dist/click";

const Header = ({ onSearch, setAuthenticated }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearchInput = (event) => {
        const searchQuery = event.target.value;
        setSearchInput(searchQuery);
    };

    
    // const handleSearchSubmit = async (event) => {
    //     event.preventDefault();
    
    //     if (searchInput.length > 2) {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/api/v1/movies/title/${searchInput}`);
    //             const movies = response.data;
    //             onSearch(movies ? [movies] : []); // Pass the filtered results to the parent component
    //         } catch (error) {
    //             console.error('Error searching for movie:', error);
    //         }
    //     }
    // };
    const handleSearchSubmit = async (event) => {
        event.preventDefault();
       
        if (searchInput.length > 2) {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/movies/title/${searchInput}`); 
                const movies = response.data;
                onSearch(movies); // Pass the search results to parent
            } catch (error) {
                console.error('Error searching for movies:', error);
            }
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setAuthenticated(false);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{ color: 'gold' }}>
                    <FontAwesomeIcon icon={faVideoSlash} />Gold
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '120px' }} navbarScroll>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
                    </Nav>
                    <form className="search-container" onSubmit={handleSearchSubmit}>
                        <input
                            type="search"
                            value={searchInput}
                            onChange={handleSearchInput}
                            placeholder="Enter Movie Name"
                        />
                    <Button type="submit" ><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                    </form>
                    <Button variant="outline-info" className="me-2">Login</Button>
                    <Button variant="outline-info">Register</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
