import Hero from "./section/Hero";
import Intro from "./section/Intro";
import Category from "./section/Category";
import Brands from "./section/Brands";
import ContactInfo from "./section/ContactInfo";

const Home = () => {
  return (
    <div>
      <Hero />
      <Intro />
      <Category />
      <Brands />
      <ContactInfo />
    </div>
  );
};

export default Home;