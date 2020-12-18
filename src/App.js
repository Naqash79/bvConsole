import { Route, Routes } from "react-router-dom";
import SignUp from "./Signup";
import Login from "./Login";

const App = () => {
  return (
    <Routes>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Routes>
  );
};

export default App;
