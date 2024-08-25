import Navbar from '../../components/Client/Navbar';
import HomeCard from '../../components/Client/HomeCard';

const HomePage = () => {
  const myProjects = [
    { label: 'Website Redesign', value: 'In Progress', valueClass: 'text-sm text-gray-500' },
    { label: 'Mobile App Development', value: 'In Progress', valueClass: 'text-sm text-gray-500' },
    { label: 'Branding and Marketing', value: 'Completed', valueClass: 'text-sm text-gray-500' },
  ];

  const upcomingProjects = [
    { label: 'E-commerce Website', value: 'Due in 2 weeks', valueClass: 'text-sm text-gray-500' },
    { label: 'Social Media Management', value: 'Due in 1 month', valueClass: 'text-sm text-gray-500' },
    { label: 'SEO Optimization', value: 'Due in 3 months', valueClass: 'text-sm text-gray-500' },
  ];

  const bidsOnProjects = [
    { label: 'E-commerce Website', value: '$10,000 - 5 Bids', valueClass: 'font-semibold' },
    { label: 'Social Media Management', value: '$7,500 - 3 Bids', valueClass: 'font-semibold' },
    { label: 'SEO Optimization', value: '$5,000 - 4 Bids', valueClass: 'font-semibold' },
  ];

  const activitySummary = [
    { label: 'Projects Completed', value: '12', valueClass: 'font-semibold' },
    { label: 'Invoices Sent', value: '24', valueClass: 'font-semibold' },
    { label: 'Messages Sent', value: '87', valueClass: 'font-semibold' },
  ];

  const recentInvoices = [
    { label: 'Website Redesign', value: '$2,500', valueClass: 'font-semibold' },
    { label: 'Mobile App Development', value: '$3,000', valueClass: 'font-semibold' },
    { label: 'Branding and Marketing', value: '$1,800', valueClass: 'font-semibold' },
  ];

  const upcomingDeadlines = [
    { label: 'Website Redesign Deadline', value: 'Aug 30, 2024', valueClass: 'text-sm text-red-500' },
    { label: 'Mobile App Launch', value: 'Sep 15, 2024', valueClass: 'text-sm text-red-500' },
    { label: 'SEO Optimization Report', value: 'Oct 1, 2024', valueClass: 'text-sm text-red-500' },
  ];
  

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-between items-center my-6 mx-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            + Add New Project
          </button>
        </div>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8">
          <HomeCard 
            title="My Projects" 
            items={myProjects} 
            linkText="View All Projects" 
            linkHref="/client/project/working"
          />
          <HomeCard 
            title="Upcoming Projects" 
            items={upcomingProjects} 
            linkText="View All Upcoming Projects" 
            linkHref="/client/project"
          />
          <HomeCard 
            title="Bids on Upcoming Projects" 
            items={bidsOnProjects} 
            linkText="View All Bids" 
            linkHref="/client/bids"
          />
          <HomeCard 
            title="Activity Summary" 
            items={activitySummary} 
            linkText="View All Activity" 
            linkHref="/client/stat"
          />
          <HomeCard 
            title="Recent Invoices" 
            items={recentInvoices} 
            linkText="View All Invoices" 
            linkHref="/client/invoice"
          />
          <HomeCard 
            title="Upcoming Deadlines" 
            items={upcomingDeadlines} 
            linkText="View All Projects" 
            linkHref="/client/project/deadlines"
          />
        </main>
      </div>
    </>
  );
};

export default HomePage;
