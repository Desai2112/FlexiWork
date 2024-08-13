import Navbar from "../../components/Freelancer/Navbar";
import Footer from "../../components/Freelancer/Footer";

const guides = [
  {
    id: 1,
    title: "Getting Started with FlexiWork",
    description: "A beginner's guide to getting started with FlexiWork.",
    answer:
      "To get started with FlexiWork, sign up for an account, set up your profile, and familiarize yourself with the dashboard where you can manage projects, track time, and collaborate with your team.",
  },
  {
    id: 2,
    title: "Advanced Features of FlexiWork",
    description: "Explore the advanced features and settings of FlexiWork.",
    answer:
      "FlexiWork offers advanced features such as customizable reports, integration with third-party tools, and automated task management. Explore the settings menu to configure these features according to your needs.",
  },
  {
    id: 3,
    title: "Troubleshooting Common Issues",
    description: "Solutions to common issues and problems faced by users.",
    answer:
      "If you encounter issues, check the troubleshooting guide in the Help section. Common problems include login issues, syncing errors, and permission settings. Contact support if you need further assistance.",
  },
  {
    id: 4,
    title: "Managing User Accounts",
    description: "How to manage and organize user accounts.",
    answer:
      "In the Admin section, you can add, remove, or update user accounts. Use roles and permissions to control access and manage user settings effectively.",
  },
  {
    id: 5,
    title: "Customizing Notifications",
    description: "Set up and customize notifications in FlexiWork.",
    answer:
      "Go to the Notifications settings to choose which alerts you want to receive and how you want them delivered. You can customize notification preferences for different types of activities.",
  },
  {
    id: 6,
    title: "Integrating Third-Party Tools",
    description: "How to integrate external tools with FlexiWork.",
    answer:
      "Navigate to the Integrations page in the settings to connect FlexiWork with third-party tools like Slack, Google Calendar, and project management apps. Follow the on-screen instructions to complete integrations.",
  },
  {
    id: 7,
    title: "Generating Reports",
    description: "Create and customize reports in FlexiWork.",
    answer:
      "Use the Reports section to generate various reports based on your data. Customize report templates and schedule automatic reports to be sent at specified intervals.",
  },
  {
    id: 8,
    title: "Using Advanced Search",
    description:
      "Utilize advanced search features to find information quickly.",
    answer:
      "The advanced search feature allows you to filter results by multiple criteria. Use keywords, dates, and categories to refine your search and locate specific information.",
  },
  {
    id: 9,
    title: "Configuring Security Settings",
    description: "Enhance security settings for your FlexiWork account.",
    answer:
      "Access the Security settings to enable two-factor authentication, set up password policies, and review account activity logs to ensure your account is secure.",
  },
  {
    id: 10,
    title: "Optimizing Performance",
    description: "Tips to improve the performance of FlexiWork.",
    answer:
      "Regularly clean up unused data, optimize your workflows, and ensure that your integrations are functioning correctly to maintain optimal performance of FlexiWork.",
  },
  // Add more guides as needed
];

const GuidesPage = () => {
    return (
      <>
        <Navbar />
        <main className="flex-grow bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Guides</h1>
            <p className="mb-12 text-gray-600 text-center">Explore our comprehensive guides to get the most out of FlexiWork. Find answers to your questions and learn about advanced features.</p>
            <ul className="space-y-6">
              {guides.map((guide) => (
                <li key={guide.id} className="bg-white border rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-2xl font-semibold text-gray-800">{guide.title}</h2>
                    <p className="text-gray-600 mt-2">{guide.description}</p>
                  </div>
                  <div className="p-6">
                    <button
                      onClick={() => document.getElementById(`answer-${guide.id}`).classList.toggle('hidden')}
                      className="text-blue-500 hover:text-blue-600 focus:outline-none"
                    >
                      {document.getElementById(`answer-${guide.id}`) && document.getElementById(`answer-${guide.id}`).classList.contains('hidden') ? 'Show Answer' : 'Hide Answer'}
                    </button>
                    <div id={`answer-${guide.id}`} className="hidden mt-4 text-gray-800">
                      <p>{guide.answer}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <Footer />
      </>
    );
  };

export default GuidesPage;
