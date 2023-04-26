import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import Authentication from "../Authentication/Authentication";

function Navigation({ user, updateUser, businesses }) {
    return (
        <div className="Navigation h-100">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar user={user} updateUser={updateUser} />}>
                        <Route path="/" element={<Home businesses={businesses} />} />
                        <Route path="authentication" element={<Authentication updateUser={updateUser} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Navigation