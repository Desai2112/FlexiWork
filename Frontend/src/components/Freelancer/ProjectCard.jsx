const ProjectCard = () => {
    // Demo data
    const demoProject = {
      title: 'Website Design',
      description: 'Design a modern and responsive website for a small business.',
      client: 'Acme Inc.',
      budget: '$3,000 - $5,000',
      status: 'Open',
      link: '#',
    };
  
    const statusClasses = {
      Open: 'bg-green-100 text-green-600',
      'In Progress': 'bg-yellow-100 text-yellow-600',
      Completed: 'bg-red-100 text-red-600',
    };
  
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            {demoProject.title}
          </h3>
          <p className="text-sm text-muted-foreground">{demoProject.description}</p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-muted-foreground">{demoProject.client}</div>
            <div className="text-muted-foreground">{demoProject.budget}</div>
          </div>
          <div className="flex justify-between items-center">
            <div
              className={`px-2 py-1 rounded-md text-sm font-medium ${statusClasses[demoProject.status]}`}
            >
              {demoProject.status}
            </div>
            <a className="text-primary hover:underline" href={demoProject.link} rel="ugc">
              View Project
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProjectCard;