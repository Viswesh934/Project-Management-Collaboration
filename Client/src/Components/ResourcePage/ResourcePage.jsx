// App.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DocsSummarizer from './DocsSummarizer';
import NewsFeed from './NewsFeed';
import CareerAdvice from './CareerAdvice';
import SampleProjectTemplates from './SampleProjectTemplates';

const ResourcesPage = () => {
  const [selectedSection, setSelectedSection] = useState('docs');

  const renderSection = () => {
    switch (selectedSection) {
      case 'news':
        return <NewsFeed/>;
      case 'careeradvice':
        return <CareerAdvice />;
      case 'templates':
        return <SampleProjectTemplates />;
      default:
        return <DocsSummarizer />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setSelectedSection} selected={selectedSection} />
      {renderSection()}
    </div>
  );
};

export default ResourcesPage;
