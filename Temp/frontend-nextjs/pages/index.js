import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SessionService from "../services/Session";
import WelcomeContainer from "../components/Welcome";

const Home = () => {
  // const { data: session, status } = SessionService();
  // const router = useRouter();
  // // const userInfo = useSelector((state: any = {}) => state.users.items);
  // useEffect(() => {
  //     if (!session && router.route !== "/login") {
  //         router.push("/login");
  //     } else {
  //         router.push("/user-management");
  //     }
  // }, [session, router]);

  return (
    <div>
      <WelcomeContainer />
    </div>
  );
};

export default Home;
