import { Helmet } from "react-helmet-async";
import Hero from "./section/Hero";
import Intro from "./section/Intro";
import Category from "./section/Category";
import Brands from "./section/Brands";
import ContactInfo from "./section/ContactInfo";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | ALAMOUDI GROUP</title>
        <meta name="description" content="Welcome to ALAMOUDI GROUP. We are a leading supplier of high-quality building and finishing materials." />
      </Helmet>
      <Hero />
      <Intro />
      <Category />
      <Brands />
      <ContactInfo />
    </div>
  );
};

export default Home;