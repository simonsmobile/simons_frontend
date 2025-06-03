// utils/scoring.js - Updated to use centralized config
import { FaPlay, FaLock, FaCheckCircle } from "react-icons/fa";
import SCORING_CONFIG from "../configs/scoringConfig";

// Re-export commonly used constants for backward compatibility
export const COMPETENCE_AREAS = Object.keys(
  SCORING_CONFIG.COMPETENCE_AREAS
).map((id) => ({
  id: parseInt(id),
  name: SCORING_CONFIG.COMPETENCE_AREAS[id].name,
  shortName: SCORING_CONFIG.COMPETENCE_AREAS[id].name
    .split(" ")
    .map((w) => w[0])
    .join(""),
  points: SCORING_CONFIG.COMPETENCE_AREAS[id].competences,
}));

export const GRADE_LEVELS = SCORING_CONFIG.GRADE_SYSTEM;

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

export const calculateTimeBonus = (remainingSeconds) => {
  if (remainingSeconds <= 0) return 0;
  // The document shows max 50 points for answering "instantly" - this should be per question
  return Math.round(SCORING_CONFIG.MAX_TIME_BONUS * (remainingSeconds / SCORING_CONFIG.TIME_LIMIT_SECONDS));
};

// FIXED: Calculate quiz score with proper time bonus limits
export const calculateQuizScore = (answers, questions, timeTaken = []) => {
  let totalScore = 0;
  let correctAnswers = 0;
  let timeBonus = 0;
  
  const level = questions[0]?.level === "master" ? 2 : 1;
  const basePoints = level === 1 ? 
    SCORING_CONFIG.LEVEL_1_BASE_POINTS : 
    SCORING_CONFIG.LEVEL_2_BASE_POINTS;
  
  // Calculate per-question bonuses first
  let individualTimeBonuses = [];
  
  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    const isCorrect = question.options[answerIndex] === question.answer;
    
    if (isCorrect) {
      correctAnswers++;
      totalScore += basePoints;
      
      // Calculate time bonus for this question
      if (timeTaken[questionIndex] !== undefined) {
        const questionTime = timeTaken[questionIndex];
        const remainingTime = Math.max(0, SCORING_CONFIG.TIME_LIMIT_SECONDS - questionTime);
        const questionTimeBonus = calculateTimeBonus(remainingTime);
        individualTimeBonuses.push(questionTimeBonus);
      }
    }
  });
  
  timeBonus = individualTimeBonuses.reduce((sum, bonus) => sum + bonus, 0);
  totalScore += timeBonus;
  
  // Perfect score bonus calculation
  const isPerfect = correctAnswers === questions.length;
  let perfectBonus = 0;
  
  if (isPerfect && questions.length === SCORING_CONFIG.QUESTIONS_PER_COMPETENCE) {
    // According to document: 5,000 points per level for exactly 63 correct answers
    // For individual competence (3 questions), proportional bonus:
    perfectBonus = Math.round(SCORING_CONFIG.PERFECT_RUN_BONUS / SCORING_CONFIG.TOTAL_COMPETENCES);
    totalScore += perfectBonus;
  }
  
  return {
    totalScore,
    correctAnswers,
    totalQuestions: questions.length,
    timeBonus,
    perfectBonus,
    baseScore: correctAnswers * basePoints,
    isPerfect,
    accuracy: correctAnswers / questions.length,
    level,
    individualTimeBonuses, // For debugging
    breakdown: {
      base: correctAnswers * basePoints,
      time: timeBonus,
      perfect: perfectBonus,
      total: totalScore
    }
  };
};

// Enhanced scoring calculation for main assessment (STILL OLD SYSTEM)
export const calculateScores = (gradesArray, detailedScores = null) => {
  if (!gradesArray || gradesArray.length !== GRADES_TYPE.length) {
    return {
      totalScore: 0,
      areaScores: COMPETENCE_AREAS.map((area) => ({
        ...area,
        score: 0,
        maxScore: getAreaMaxScore(area.id),
        levels: area.points.map(() => 0),
        competenceDetails: area.points.map((point) => ({
          point,
          level: 0,
          grade: "F",
          score: 0,
        })),
      })),
      competenceLevels: {},
      badges: [],
      milestones: [],
    };
  }

  let totalScore = 0;
  const areaScores = [];
  const competenceLevels = {};
  const badges = [];
  const milestones = [];

  // Calculate individual competence scores using NEW GRADE SYSTEM
  const competenceScores = GRADES_TYPE.map((gradeType, index) => {
    const grade = gradesArray[index] || "F";
    const gradeInfo = GRADE_LEVELS[grade];
    const points = gradeInfo.points;

    totalScore += points;
    competenceLevels[gradeType] = grade;

    return {
      gradeType,
      points,
      grade,
      level: gradeInfo.level,
      label: gradeInfo.label,
    };
  });

  // Calculate area scores with mixed levels
  COMPETENCE_AREAS.forEach((area) => {
    const relevantCompetences = competenceScores.filter((sc) =>
      area.points.includes(sc.gradeType)
    );

    const currentPoints = relevantCompetences.reduce(
      (sum, sc) => sum + sc.points,
      0
    );
    const maxPossiblePoints = getAreaMaxScore(area.id);

    // Calculate levels for each competence in the area
    const competenceLevels = relevantCompetences.map((comp) => comp.level);
    const competenceDetails = relevantCompetences.map((comp, index) => ({
      point: area.points[index],
      level: comp.level,
      grade: comp.grade,
      score: comp.points,
      label: comp.label,
    }));

    // Area level is the highest level achieved in any competence
    const maxLevel = Math.max(...competenceLevels, 0);

    areaScores.push({
      ...area,
      score: currentPoints,
      maxScore: maxPossiblePoints,
      level: maxLevel,
      levels: competenceLevels,
      competenceDetails,
      percentage: Math.round((currentPoints / maxPossiblePoints) * 100),
    });
  });

  // Check for badges and milestones using NEW THRESHOLDS
  const gamificationData = getGamificationDetails(totalScore);
  if (gamificationData) {
    badges.push(gamificationData);
  }

  // Add milestone achievements
  milestones.push(...getMilestones(totalScore));

  return {
    totalScore,
    areaScores,
    competenceLevels,
    badges,
    milestones,
    maxPossibleScore: SCORING_CONFIG.MAX_POSSIBLE_TOTAL,
  };
};

// Get maximum possible score for an area
const getAreaMaxScore = (areaId) => {
  const area = COMPETENCE_AREAS.find((a) => a.id === areaId);
  if (!area) return 0;

  // Each competence can achieve maximum points based on new system
  return area.points.length * SCORING_CONFIG.MAX_POSSIBLE_PER_COMPETENCE;
};

// Updated gamification thresholds
export const getGamificationDetails = (totalScore) => {
  const thresholds = SCORING_CONFIG.GAMIFICATION_THRESHOLDS;
  const messages = SCORING_CONFIG.FEEDBACK_MESSAGES.MILESTONES;

  if (totalScore >= thresholds.ELITE_PERFORMER) {
    return {
      ...messages[thresholds.ELITE_PERFORMER],
      badge: "advocate",
      threshold: thresholds.ELITE_PERFORMER,
    };
  } else if (totalScore >= thresholds.ADVANCED_ACHIEVER) {
    return {
      ...messages[thresholds.ADVANCED_ACHIEVER],
      badge: "mentor",
      threshold: thresholds.ADVANCED_ACHIEVER,
    };
  } else if (totalScore >= thresholds.RISING_STAR) {
    return {
      ...messages[thresholds.RISING_STAR],
      badge: "star",
      threshold: thresholds.RISING_STAR,
    };
  }
  return {
      ...messages[0],
      badge: "simons",
      threshold: totalScore,
    };;
};

// Get milestone achievements
export const getMilestones = (totalScore) => {
  const milestones = [];
  const thresholds = SCORING_CONFIG.GAMIFICATION_THRESHOLDS;

  if (totalScore >= thresholds.ELITE_PERFORMER) {
    milestones.push({
      points: thresholds.ELITE_PERFORMER,
      title: "Elite Performer",
      description: "Near-perfect mastery achieved!",
    });
  }

  if (totalScore >= thresholds.ADVANCED_ACHIEVER) {
    milestones.push({
      points: thresholds.ADVANCED_ACHIEVER,
      title: "Advanced Achiever",
      description: "Advanced proficiency demonstrated!",
    });
  }

  if (totalScore >= thresholds.RISING_STAR) {
    milestones.push({
      points: thresholds.RISING_STAR,
      title: "Rising Star",
      description: "Strong foundation established!",
    });
  }

  return milestones;
};

// Generate detailed feedback for quiz failures using NEW FEEDBACK SYSTEM
export const generateQuizFeedback = (quizResult, competenceArea, level) => {
  const { correctAnswers, totalQuestions, accuracy, totalScore } = quizResult;
  const failed = correctAnswers < totalQuestions;

  if (!failed) {
    return {
      status: "success",
      title: level === 1 ? "Way to go!" : "Excellent work!",
      message: `Perfect score! You earned +${totalScore} points`,
      // suggestions: [],
    };
  }

  const incorrect = totalQuestions - correctAnswers;
  let title = "Try again...";
  // let suggestions = [];

  // if (accuracy >= 0.67) {
  //   title = "Almost there...";
  //   suggestions = SCORING_CONFIG.IMPROVEMENT_SUGGESTIONS.MEDIUM_ACCURACY;
  // } else {
  //   suggestions = SCORING_CONFIG.IMPROVEMENT_SUGGESTIONS.LOW_ACCURACY;
  // }

  return {
    status: "failure",
    title,
    message: `Correct answers ${correctAnswers}/${totalQuestions}`,
    details: {
      correct: correctAnswers,
      incorrect,
      total: totalQuestions,
      pointsEarned: totalScore,
      pointsLost:
        incorrect *
        (level === 1
          ? SCORING_CONFIG.LEVEL_1_BASE_POINTS
          : SCORING_CONFIG.LEVEL_2_BASE_POINTS),
    },
    // suggestions,
  };
};

// Rest of the functions remain the same but now use config values
export const getGradeStatus = (grade, levelNumber) => {
  const gradeInfo = GRADE_LEVELS[grade] || GRADE_LEVELS.F;

  if (levelNumber === 1) {
    return gradeInfo.level >= 1 ? "Completed" : "Play";
  } else if (levelNumber === 2) {
    if (gradeInfo.level >= 2) return "Completed";
    if (gradeInfo.level >= 1) return "Play";
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
  return GRADE_LEVELS[grade]?.label || "Not achieved";
};

export const translateLevelTerminology = (level) => {
  if (typeof level === "string") {
    const lowerLevel = level.toLowerCase();
    if (
      lowerLevel === "basic" ||
      lowerLevel === "foundation" ||
      lowerLevel === "intermediate"
    ) {
      return "Level 1";
    }
    if (
      lowerLevel === "master" ||
      lowerLevel === "advanced" ||
      lowerLevel === "highly specialized"
    ) {
      return "Level 2";
    }
  }
  return level;
};
