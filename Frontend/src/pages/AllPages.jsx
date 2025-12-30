import Works from "./Works";
import Home from "./Home";
import About from "./About";
import Skills from "./Skills";
import ScrollProvider from "../components/ScrollProvider";
import Honors from "./Honors";
import Certifications from "./Certifications";
import Footer from "../components/Footer";
import Ribbons from "../components/reactBits/Ribbons";

const AllPages = () => {
  return (
    <ScrollProvider>
      <div className="relative z-10">
        <div
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: "99999" }}
        >
          <Ribbons
            baseThickness={25}
            colors={["#30E897"]}
            speedMultiplier={0.4}
            maxAge={600}
            enableFade={false}
            enableShaderEffect={true}
          />
        </div>
        <Home />
        <Works />
        <Skills />
        <Honors />
        {/* <Certifications /> */}
        <About />
        <Footer />
      </div>
    </ScrollProvider>
  );
};

export default AllPages;
