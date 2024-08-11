import Image from "next/image";
import Signup from "./auth/signup/page"
import Login from "./auth/login/page"
import Landing from "./landing/page"
export default function Home() {
  return (
    <main>
      <Login />
    </main>
  );
}
