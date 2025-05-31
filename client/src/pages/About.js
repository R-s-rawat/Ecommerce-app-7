import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="container mt-0 py-3">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/about.jpeg"
              alt="aboutus"
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="bg-dark p-2 text-white text-center mb-4">
              ABOUT US
            </h1>
            <p className="text-justify mt-2">
              Our company specializes in providing a seamless and convenient
              online shopping experience. We offer a wide variety of products,
              ensuring there's something for everyone. Our commitment to
              customer satisfaction is at the heart of everything we do, from
              our easy-to-navigate website to our reliable delivery and support.
              We strive to create a user-friendly platform where shoppers can
              find what they need quickly and securely, all while enjoying a
              personalized and positive online experience.
            </p>
            <p className="text-justify mt-2">
              With a focus on innovation, we constantly evolve to meet the
              changing needs of the digital marketplace. Our dedicated team
              works tirelessly to enhance your shopping journey, integrating the
              latest technology and best practices.
            </p>
            <p className="text-justify mt-2">
              We believe in building long-term relationships with our customers
              by offering value, trust, and an uncompromised level of service.
              Whether you're a first-time visitor or a regular buyer, we're here
              to make every purchase smooth and satisfying.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
