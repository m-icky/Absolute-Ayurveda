import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import Intro from "../components/Intro";
import About from "../components/About";
import Doctors from "../components/Doctors";
import Facilities from "../components/Facilities";
import Team from "../components/Team";
import Courses from "../components/Courses";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Intro />
      <About />
      <Doctors />
      <Facilities />
      <Team />
      <Courses />
      <Contact />
      <Footer />
    </>
  );
}
