import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const statusColors = {
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
  'Completed': 'bg-green-100 text-green-800 border-green-200',
  'Delayed': 'bg-red-100 text-red-800 border-red-200',
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full"
      onClick={() => onClick(project.id)}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={project.thumbnail} 
          alt={project.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[project.status] || 'bg-gray-100 text-gray-800'}`}>
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 font-mono">{project.id}</p>
        
        <div className="mt-auto space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2 text-gray-400" />
            <span className="truncate">{project.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-100">
          <button className="w-full text-center text-sm font-medium text-primary-600 hover:text-primary-700">
            Fill Daily Report &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
