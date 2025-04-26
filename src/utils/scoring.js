import { FaPlay, FaLock, FaCheckCircle } from "react-icons/fa";

export const COMPETENCE_AREAS = [
  {
    id: 1,
    name: "Information and data literacy",
    shortName: "Info Lit",
    points: ["1.1", "1.2", "1.3"],
  },
  {
    id: 2,
    name: "Communication and collaboration",
    shortName: "Comm & Collab",
    points: ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6"],
  },
  {
    id: 3,
    name: "Digital content creation",
    shortName: "Content Creation",
    points: ["3.1", "3.2", "3.3", "3.4"],
  },
  {
    id: 4,
    name: "Safety",
    shortName: "Safety",
    points: ["4.1", "4.2", "4.3", "4.4"],
  },
  {
    id: 5,
    name: "Problem solving",
    shortName: "Problem Solving",
    points: ["5.1", "5.2", "5.3", "5.4"],
  },
];

const GRADE_POINTS_MAP = {
  F: 0,
  B: 50,
  M: 100,
  C: 150,
};

const GRADES_TYPE = [
  "1.1",
  "1.2",
  "1.3",
  "2.1",
  "2.2",
  "2.3",
  "2.4",
  "2.5",
  "2.6",
  "3.1",
  "3.2",
  "3.3",
  "3.4",
  "4.1",
  "4.2",
  "4.3",
  "4.4",
  "5.1",
  "5.2",
  "5.3",
  "5.4",
];

export const calculateScores = (gradesArray) => {
  if (!gradesArray || gradesArray.length !== GRADES_TYPE.length) {
    return {
      totalScore: 0,
      areaScores: COMPETENCE_AREAS.map((area) => ({
        ...area,
        score: 0,
        maxScore: 150,
        level: 1,
      })),
      competenceLevels: {}, // to store grades ('F', 'B', 'M', 'C')
    };
  }

  let totalScore = 0;
  const areaScores = [];
  const competenceLevels = {};

  const subCompetenceScores = GRADES_TYPE.map((gradeType, index) => {
    const grade = gradesArray[index] || "F";
    const points = GRADE_POINTS_MAP[grade] || 0;
    totalScore += points;
    competenceLevels[gradeType] = grade;
    return { gradeType, points, grade };
  });

  COMPETENCE_AREAS.forEach((area) => {
    const relevantSubCompetences = subCompetenceScores.filter((sc) =>
      area.points.includes(sc.gradeType)
    );
    const currentPoints = relevantSubCompetences.reduce(
      (sum, sc) => sum + sc.points,
      0
    );
    const maxPossiblePoints =
      relevantSubCompetences.length * GRADE_POINTS_MAP["C"];
    const areaScore =
      maxPossiblePoints > 0
        ? Math.round((currentPoints / maxPossiblePoints) * 150)
        : 0;
    const areaLevel = relevantSubCompetences.some(
      (sc) => sc.grade === "M" || sc.grade === "C"
    )
      ? 2
      : 1;

    areaScores.push({
      ...area,
      score: areaScore,
      maxScore: 150,
      level: areaLevel,
    });
  });

  return { totalScore, areaScores, competenceLevels };
};

export const getGamificationDetails = (totalScore) => {
  if (totalScore >= 2000) {
    return {
      title: "You are officially a SIMOnS Advocate",
      message:
        "If you think the sky is the limit, you achieved the stratosphere when it comes to digital skills. But don’t sit back. As new technologies emerge, you better keep up to thrive. Your journey does not end here.",
      badge: "advocate",
      threshold: 2000,
    };
  } else if (totalScore >= 1500) {
    return {
      title: "You are a Savvy mentor",
      message:
        "You not only master digital skills, but you can also help others around you to troubleshoot and engage in the digital world. Proud of you.",
      badge: "mentor",
      threshold: 1500,
    };
  } else if (totalScore >= 1000) {
    return {
      title: "You are a Rising tech star",
      message:
        "Your curiosity is notorious and it whispers that you will be on top of digital skills before you even notice. Ambition is key. Keep up and level up is your moto.",
      badge: "star",
      threshold: 1000,
    };
  } else {
    return null;
  }
};

export const getSubCompetenceDetails = (point) => {
  const details = {
    1.1: {
      title:
        "Browsing, searching and filtering data, information and digital content",
      icon: "search",
    },
    1.2: {
      title: "Evaluating data, information and digital content",
      icon: "check-circle",
    },
    1.3: {
      title: "Managing data, information and digital content",
      icon: "database",
    },
    2.1: { title: "Interacting through digital technologies", icon: "users" },
    2.2: {
      title: "Sharing information and content through digital technologies",
      icon: "share-2",
    },
    2.3: {
      title: "Engaging in citizenship through digital technologies",
      icon: "flag",
    },
    2.4: {
      title: "Collaborating through digital technologies",
      icon: "briefcase",
    },
    2.5: { title: "Netiquette", icon: "message-square" },
    2.6: { title: "Managing digital identity", icon: "user-check" },
    3.1: { title: "Developing digital content", icon: "edit" },
    3.2: {
      title: "Integrating and re-elaborating digital content",
      icon: "git-merge",
    },
    3.3: { title: "Copyright and licenses", icon: "copy" },
    3.4: { title: "Programming", icon: "code" },
    4.1: { title: "Protecting devices", icon: "smartphone" },
    4.2: { title: "Protecting personal data and privacy", icon: "shield" },
    4.3: { title: "Protecting health and well-being", icon: "heart" },
    4.4: { title: "Protecting the environment", icon: "leaf" },
    5.1: { title: "Solving technical problems", icon: "tool" },
    5.2: {
      title: "Identifying needs and technological responses",
      icon: "target",
    },
    5.3: { title: "Creatively using digital technologies", icon: "cpu" },
    5.4: { title: "Identifying digital competence gaps", icon: "search" },
  };
  return details[point] || { title: "Unknown Competence", icon: "help-circle" };
};

export const getSubCompetencesForArea = (areaId) => {
  const area = COMPETENCE_AREAS.find((a) => a.id === areaId);
  if (!area) return [];
  return area.points.map((point) => ({
    point,
    ...getSubCompetenceDetails(point),
  }));
};

export const getCompetenceLevelText = (grade) => {
  switch (grade) {
    case "C":
      return "Advanced";
    case "M":
      return "Intermediate";
    case "B":
      return "Foundation";
    case "F":
    default:
      return "Not achieved";
  }
};

export const getGradeStatus = (grade, levelNumber) => {
  if (levelNumber === 1) {
    return grade === "B" || grade === "M" || grade === "C"
      ? "Completed"
      : "Play";
  } else if (levelNumber === 2) {
    if (grade === "C") return "Completed"; 
    if (grade === "M") return "Play";
    return "Locked";
  }
  return "Locked";
};

export const getIconForStatus = (status) => {
  switch (status) {
    case "Play":
      return FaPlay;
    case "Completed":
      return FaCheckCircle;
    case "Locked":
      return FaLock;
    default:
      return FaLock;
  }
};