import React, { useState, useEffect } from "react";

const SideBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [screenDimensions, setScreenDimensions] = useState({
    width: 0,
    height: 0
  });

  const tabs = [
    "Personal details",
    "OPD records", 
    "Hospitalization",
    "Currently medication",
    "Lifestyles",
    "Immunization",
    "Surgical history"
  ];

  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dynamic styles based on screen dimensions
  const getDynamicStyles = () => {
    const { width, height } = screenDimensions;
    
    if (width === 0 || height === 0) return {};
    
    // Font size calculations
    const headerFontSize = Math.max(width * 0.015, 14);
    const tabFontSize = Math.max(width * 0.01, 11);
    const contentFontSize = Math.max(width * 0.012, 12);
    
    // Padding calculations
    const headerPadding = Math.max(width * 0.01, 8);
    const tabPaddingX = Math.max(width * 0.005, 4);
    const tabPaddingY = Math.max(height * 0.01, 8);
    const contentPadding = Math.max(width * 0.02, 16);
    
    return {
      headerFontSize,
      tabFontSize,
      contentFontSize,
      headerPadding,
      tabPaddingX,
      tabPaddingY,
      contentPadding
    };
  };

  const styles = getDynamicStyles();

  return (
    <div className="w-screen h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div 
        className="w-full bg-blue-500 flex items-center justify-center"
        style={{
          height: '8vh',
          padding: `${styles.headerPadding || 8}px`
        }}
      >
        <h1 
          className="font-semibold text-white text-center leading-tight"
          style={{ fontSize: `${styles.headerFontSize || 16}px` }}
        >
          Patient checkup management system - Base Hospital - Avissawella
        </h1>
      </div>

      {/* Navigation Tabs */}
      <div className="w-full" style={{ height: '7vh' }}>
        <div className="flex h-full">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                text-white bg-blue-400 border border-black cursor-pointer 
                transition-colors duration-200 flex items-center justify-center
                hover:bg-blue-600 active:bg-blue-300
                ${activeTab === index ? 'bg-blue-600' : ''}
              `}
              style={{
                width: `${100 / tabs.length}%`,
                fontSize: `${styles.tabFontSize || 12}px`,
                paddingLeft: `${styles.tabPaddingX || 4}px`,
                paddingRight: `${styles.tabPaddingX || 4}px`,
                paddingTop: `${styles.tabPaddingY || 8}px`,
                paddingBottom: `${styles.tabPaddingY || 8}px`
              }}
            >
              <span className="text-center leading-tight">
                {tab}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div 
        className="flex-1 flex items-center justify-center bg-white"
        style={{ 
          height: '85vh',
          padding: `${styles.contentPadding || 16}px`
        }}
      >
        <div className="text-center text-gray-600">
          <h2 
            className="font-semibold mb-4 text-gray-700"
            style={{ fontSize: `${styles.contentFontSize || 18}px` }}
          >
            {tabs[activeTab]}
          </h2>
          <p style={{ fontSize: `${styles.tabFontSize || 14}px` }}>
            Content for {tabs[activeTab]} will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;