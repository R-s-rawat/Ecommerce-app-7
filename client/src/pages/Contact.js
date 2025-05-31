import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="container mt-0 py-3">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="Contact Us"
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="bg-dark p-2 text-white text-center mb-4">
              CONTACT US
            </h1>
            <p className="text-justify mt-2 mb-3">
              Any query or information about products? Feel free to call us
              anytime. We're available 24x7 to assist you.
            </p>
            <p className="mb-2">
              <BiMailSend /> :{" "}
              <a href="mailto:help@ecommerceapp.com">help@ecommerceapp.com</a>
            </p>
            <p className="mb-2">
              <BiPhoneCall /> : <a href="tel:0123456789">012-3456789</a>
            </p>
            <p className="mb-4">
              <BiSupport /> : <a href="tel:180000000000">1800-0000-0000</a>{" "}
              (toll free)
            </p>
            <h4 className="mb-2">Commitment to quality</h4>
            <p className="text-justify mb-4">
              We're here to help! Whether you have a question about a product,
              need assistance with an order, or just want to provide feedback,
              our team is ready. We pride ourselves on offering prompt and
              friendly support to ensure your experience with us is always
              smooth and satisfactory. Don't hesitate to get in touch through
              any of the methods listed above; your inquiries are important to
              us, and we're committed to providing the answers and solutions you
              need around the clock.
            </p>
            <h4 className="mb-2">We assure best checks</h4>
            <p className="text-justify mb-4">
              Beyond direct support, we genuinely value your thoughts and
              suggestions. Your insights are incredibly helpful as we
              continuously strive to improve our product selection and refine
              our services to better meet your needs. We invite you to connect
              with us, share your experiences, and become a part of our growing
              community. We're always eager to hear from you and look forward to
              building a strong relationship with every customer.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
