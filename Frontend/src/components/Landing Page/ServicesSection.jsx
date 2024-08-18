import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faPalette, faBullhorn, faMobileAlt, faDatabase, faHandshake } from '@fortawesome/free-solid-svg-icons';

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of services to elevate your business and help you thrive in the digital landscape.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon icon={faLaptopCode} className="text-blue-500 text-4xl mb-6" />
            <h3 className="text-xl font-semibold mb-3">Web Development</h3>
            <p className="text-gray-600 mb-4">
              Bring your digital vision to life with our expert web developers. We create responsive, high-performance websites tailored to your needs.
            </p>
            <p className="text-gray-500 text-sm">
              Technologies: React, Angular, Vue, Node.js, and more.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon icon={faPalette} className="text-blue-500 text-4xl mb-6" />
            <h3 className="text-xl font-semibold mb-3">Graphic Design</h3>
            <p className="text-gray-600 mb-4">
              Elevate your brand with stunning visual designs. From logos to promotional materials, our designs will make your brand stand out.
            </p>
            <p className="text-gray-500 text-sm">
              Services: Logo Design, Branding, Print Materials, and more.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon icon={faBullhorn} className="text-blue-500 text-4xl mb-6" />
            <h3 className="text-xl font-semibold mb-3">Digital Marketing</h3>
            <p className="text-gray-600 mb-4">
              Reach your target audience with our digital marketing expertise. We use the latest strategies to enhance your online presence and drive results.
            </p>
            <p className="text-gray-500 text-sm">
              Strategies: SEO, PPC, Social Media Marketing, and more.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon icon={faMobileAlt} className="text-blue-500 text-4xl mb-6" />
            <h3 className="text-xl font-semibold mb-3">Mobile App Development</h3>
            <p className="text-gray-600 mb-4">
              Develop high-quality mobile applications that deliver a seamless user experience across various platforms.
            </p>
            <p className="text-gray-500 text-sm">
              Platforms: iOS, Android, Cross-platform.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon icon={faDatabase} className="text-blue-500 text-4xl mb-6" />
            <h3 className="text-xl font-semibold mb-3">Database Management</h3>
            <p className="text-gray-600 mb-4">
              Ensure your data is managed efficiently with our database management services. We provide secure, scalable, and optimized solutions.
            </p>
            <p className="text-gray-500 text-sm">
              Technologies: SQL, NoSQL, Cloud Databases.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FontAwesomeIcon icon={faHandshake} className="text-blue-500 text-4xl mb-6" />
            <h3 className="text-xl font-semibold mb-3">Consulting & Strategy</h3>
            <p className="text-gray-600 mb-4">
              Get expert advice and strategies tailored to your business goals. Our consultants work with you to develop effective solutions.
            </p>
            <p className="text-gray-500 text-sm">
              Services: Business Strategy, Technology Consulting, Process Optimization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
