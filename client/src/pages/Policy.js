import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container mt-0 py-3">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="bg-dark p-2 text-white text-center mb-4">
              PRIVACY POLICY
            </h1>
            <p style={{ fontWeight: "bolder" }}>
              Our Commitment to Your Privacy
              <span style={{ display: "block", fontWeight: "100" }}>
                We understand the importance of safeguarding your personal
                information. This policy outlines how we collect, use, and
                protect the data you share with us when you visit and make
                purchases on our website.
              </span>
            </p>
            <p style={{ fontWeight: "bolder" }}>
              Information We Gather From You
              <span style={{ display: "block", fontWeight: "100" }}>
                When you interact with our site, we collect certain information
                to facilitate your transactions and improve your experience.
              </span>
            </p>
            <p style={{ fontWeight: "bolder" }}>
              How We Utilize Your Information
              <span style={{ display: "block", fontWeight: "100" }}>
                The information we collect serves several purposes: processing
                your orders, managing your account, delivering products, and
                providing customer support.
              </span>
            </p>
            <p style={{ fontWeight: "bolder" }}>
              Sharing and Disclosure of Your Data
              <span style={{ display: "block", fontWeight: "100" }}>
                We respect your privacy and do not sell your personal
                information to third parties.{" "}
              </span>
            </p>
            <p style={{ fontWeight: "bolder" }}>
              Your Control Over Your Information
              <span style={{ display: "block", fontWeight: "100" }}>
                You have rights regarding your personal data. You can access,
                review, update, or correct your account information at any time
                by logging into your profile.
              </span>
            </p>
            <p style={{ fontWeight: "bolder" }}>
              Data Security Measures
              <span style={{ display: "block", fontWeight: "100" }}>
                We employ robust security measures to protect your personal
                information from unauthorized access, alteration, disclosure, or
                destruction.{" "}
              </span>
            </p>
            <p style={{ fontWeight: "bolder" }}>
              Updates to This Policy
              <span style={{ display: "block", fontWeight: "100" }}>
                Our privacy practices may evolve as our services grow and new
                regulations emerge. We reserve the right to update this Privacy
                Policy periodically to reflect changes in our data handling
                practices or legal requirements.{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
