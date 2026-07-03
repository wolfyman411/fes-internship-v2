import Features from "./home/features";
import Landing from "./home/landing";
import Numbers from "./home/numbers";
import Reviews from "./home/reviews";
import Navbar from "./home/components/Navbar";
import Footer from "./home/components/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Landing/>
    <Features/>
    <Reviews/>
    <Numbers/>
    <Footer/>
    </>
  );
}
