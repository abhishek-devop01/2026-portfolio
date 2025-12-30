import { useEffect } from "react";
import MainRoutes from "./routes/MainRoutes";
import axios from "./utils/axios";
import { useDispatch } from "react-redux";
import { currentuser, setLoading } from "./store/slices/UserSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      try {
        dispatch(setLoading(true));
        const response = await axios.get("/api/admin/me", {
          withCredentials: true,
        });
        // Fix: Pass the whole user object, not just the id
        dispatch(currentuser(response.data.user));
      } catch (error) {
        dispatch(currentuser(null));
      } finally {
        dispatch(setLoading(false));
      }
    }
    getUser();
  }, [dispatch]);

  return (
    <div className="font-[red_hat_display] relative min-h-screen w-screen bg-[#111] text-white px-5 md:px-20 overflow-x-hidden">
      <div className="circle1 fixed top-[15%] left-0 h-20 w-20 rounded-full bg-pink-400 blur-[35px] saturate-[1] opacity-40 z-0"></div>
      <div className="circle2 fixed top-[50%] right-0 h-20 w-20 rounded-full bg-teal-400 blur-[35px] saturate-[1] opacity-40 z-0"></div>
      <MainRoutes />
    </div>
  );
};

export default App;
