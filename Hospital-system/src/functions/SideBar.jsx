import React, { useState, useEffect } from "react";

const SideBar = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 });

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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDynamicStyles = () => {
    const { width, height } = screenDimensions;
    if (width === 0 || height === 0) return {};

    return {
      headerFontSize: Math.max(width * 0.015, 14),
      tabFontSize: Math.max(width * 0.01, 11),
      contentFontSize: Math.max(width * 0.012, 12),
      headerPadding: Math.max(width * 0.01, 8),
      tabPaddingX: Math.max(width * 0.005, 4),
      tabPaddingY: Math.max(height * 0.01, 8),
      contentPadding: Math.max(width * 0.02, 16)
    };
  };

  const styles = getDynamicStyles();

  return (
    <div className="w-screen h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="w-full bg-blue-500 flex items-center justify-center"
        style={{ height: '8vh', padding: `${styles.headerPadding || 8}px` }}
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
              className={`text-white bg-blue-400 border border-black cursor-pointer
                transition-colors duration-200 flex items-center justify-center
                hover:bg-blue-600 ${activeTab === index ? 'bg-blue-600' : ''}`}
              style={{
                width: `${100 / tabs.length}%`,
                fontSize: `${styles.tabFontSize || 12}px`,
                paddingLeft: `${styles.tabPaddingX || 4}px`,
                paddingRight: `${styles.tabPaddingX || 4}px`,
                paddingTop: `${styles.tabPaddingY || 8}px`,
                paddingBottom: `${styles.tabPaddingY || 8}px`
              }}
            >
              <span className="text-center leading-tight">{tab}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div
        className="flex-1 overflow-y-auto bg-white"
        style={{ padding: `${styles.contentPadding || 16}px` }}
      >
        {children}
      </div>
    </div>
  );
};

export default SideBar;
