import  { useState } from "react";
import { FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import Navbar from "../../components/Client/Navbar";

const CompanyProfilePage = () => {
  // State for company details
  const companyDetails={
    name: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    address: "123 Tech Avenue, Innovation City",
    contactNumber: "+1 234 567 8900",
    website: "https://www.techsolutions.com",
    description: "Leading provider of innovative tech solutions.",
    logoUrl: "https://example.com/logo.png",
    yearEstablished: "2010",
    industry: "Technology",
    numberOfEmployees: "500+",
    keyProducts: "Software Development, Cloud Solutions",
    ceo: "Jane Doe",
    certifications: "ISO 9001, CMMI Level 3",
    missionStatement: "To deliver cutting-edge technology solutions that drive innovation.",
    socialMedia: {
      linkedin: "https://www.linkedin.com/company/techsolutions",
      twitter: "https://twitter.com/techsolutions",
      facebook: "https://www.facebook.com/techsolutions",
    },
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 flex flex-col items-center p-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Section with Image */}
          <div className="w-full md:w-1/3 bg-blue-100 p-6 flex items-center justify-center">
            <img
              src={companyDetails.logoUrl}
              alt={`${companyDetails.name} Logo`}
              className="w-64 h-64 rounded-full object-cover shadow-xl"
            />
          </div>

          {/* Right Section with Details */}
          <div className="w-full md:w-2/3 p-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-gray-800">{companyDetails.name}</h1>
                <p className="text-lg text-gray-600 mt-2">{companyDetails.description}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="text-blue-500 mr-3 text-xl" />
                <span>{companyDetails.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaPhone className="text-blue-500 mr-3 text-xl" />
                <span>{companyDetails.contactNumber}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="text-blue-500 mr-3 text-xl" />
                <span>{companyDetails.address}</span>
              </div>
              {companyDetails.website && (
                <div className="flex items-center text-gray-600">
                  <FaGlobe className="text-blue-500 mr-3 text-xl" />
                  <a
                    href={companyDetails.website}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {companyDetails.website}
                  </a>
                </div>
              )}
              {companyDetails.socialMedia.linkedin && (
                <div className="flex items-center text-gray-600">
                  <FaLinkedin className="text-blue-500 mr-3 text-xl" />
                  <a
                    href={companyDetails.socialMedia.linkedin}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
              {companyDetails.socialMedia.twitter && (
                <div className="flex items-center text-gray-600">
                  <FaTwitter className="text-blue-500 mr-3 text-xl" />
                  <a
                    href={companyDetails.socialMedia.twitter}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </div>
              )}
              {companyDetails.socialMedia.facebook && (
                <div className="flex items-center text-gray-600">
                  <FaFacebook className="text-blue-500 mr-3 text-xl" />
                  <a
                    href={companyDetails.socialMedia.facebook}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-3">Year Established:</span>
                <span>{companyDetails.yearEstablished}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-3">Industry:</span>
                <span>{companyDetails.industry}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-3">Number of Employees:</span>
                <span>{companyDetails.numberOfEmployees}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-3">Key Products:</span>
                <span>{companyDetails.keyProducts}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-3">CEO:</span>
                <span>{companyDetails.ceo}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-3">Certifications:</span>
                <span>{companyDetails.certifications}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-semibold mr-3">Mission Statement:</span>
                <p>{companyDetails.missionStatement}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfilePage;
