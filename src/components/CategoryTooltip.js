import React, { useState, useEffect, useRef } from "react";

const AutoCyclingTooltip = ({
  children,
  content,
  index,
  totalItems,
  isHovered,
  onHover,
  onLeave,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const elementRef = useRef(null);

  const updatePosition = () => {
    if (elementRef.current && tooltipRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      setPosition({
        top: rect.top - tooltipRect.height - 8,
        left: rect.left + rect.width / 2 - tooltipRect.width / 2,
      });
    }
  };

  useEffect(() => {
    if (showTooltip) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [showTooltip]);

  useEffect(() => {
    setShowTooltip(isHovered);
  }, [isHovered]);

  return (
    <>
      <div
        ref={elementRef}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={onLeave}
        className="relative"
      >
        {children}
      </div>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-2 py-1 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none transition-opacity duration-200"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            opacity: showTooltip ? 1 : 0,
          }}
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
        </div>
      )}
    </>
  );
};

const CategoryTooltip = ({
  categories,
  completedCategories,
  getCategoryIcon,
}) => {
  const [currentHoveredIndex, setCurrentHoveredIndex] = useState(-1);
  const [isManualHover, setIsManualHover] = useState(false);
  const [autoCycleIndex, setAutoCycleIndex] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isManualHover) {
      intervalRef.current = setInterval(() => {
        setAutoCycleIndex((prev) => (prev + 1) % categories.length);
      }, 3000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isManualHover, categories.length]);

  const handleHover = (index) => {
    setIsManualHover(true);
    setCurrentHoveredIndex(index);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleLeave = () => {
    setCurrentHoveredIndex(-1);

    timeoutRef.current = setTimeout(() => {
      setIsManualHover(false);
      setAutoCycleIndex(0);
    }, 500);
  };

  const getTooltipIndex = () => {
    if (isManualHover) {
      return currentHoveredIndex;
    }
    return autoCycleIndex;
  };

  const categoryNames = [
    "Information and data literacy",
    "Communication and collaboration",
    "Digital content creation",
    "Safety",
    "Problem solving",
  ];

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-5">
        Category Progress
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {categories.map((category, index) => {
          const isCompleted = completedCategories.includes(category.id);
          const shouldShowTooltip = getTooltipIndex() === index;

          return (
            <AutoCyclingTooltip
              key={category.id}
              content={categoryNames[index]}
              index={index}
              totalItems={categories.length}
              isHovered={shouldShowTooltip}
              onHover={handleHover}
              onLeave={handleLeave}
            >
              <div
                className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  isCompleted
                    ? "bg-amber-100 hover:bg-amber-200 border-2 border-amber-300"
                    : "bg-gray-200 hover:bg-gray-300 border-2 border-gray-300"
                } ${shouldShowTooltip ? "scale-110 shadow-lg" : ""}`}
              >
                <div
                  className={`${
                    isCompleted ? "bg-amber-600" : "bg-black"
                  } text-white p-2 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    shouldShowTooltip ? "scale-110" : ""
                  }`}
                >
                  {getCategoryIcon(category.icon)}
                </div>
              </div>
            </AutoCyclingTooltip>
          );
        })}
      </div>
      <div className="mt-2 text-sm text-gray-600 text-center">
        <span className="font-medium">{completedCategories.length}</span> of{" "}
        <span className="font-medium">{categories.length}</span> categories
        completed
      </div>
    </div>
  );
};

export default CategoryTooltip;
