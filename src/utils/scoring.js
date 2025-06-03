import { FaPlay, FaLock, FaCheckCircle } from "react-icons/fa";
import SCORING_CONFIG from "../configs/scoringConfig";
import env from "../configs/env";

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
  return Math.round(
    SCORING_CONFIG.MAX_TIME_BONUS *
      (remainingSeconds / SCORING_CONFIG.TIME_LIMIT_SECONDS)
  );
};

export const calculateQuizScore = (answers, questions, timeTaken = []) => {
  let totalScore = 0;
  let correctAnswers = 0;
  let timeBonus = 0;

  const level = questions[0]?.level === "master" ? 2 : 1;
  const basePoints =
    level === 1
      ? SCORING_CONFIG.LEVEL_1_BASE_POINTS
      : SCORING_CONFIG.LEVEL_2_BASE_POINTS;

  let individualTimeBonuses = [];

  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    const isCorrect = question.options[answerIndex] === question.answer;

    if (isCorrect) {
      correctAnswers++;
      totalScore += basePoints;

      if (timeTaken[questionIndex] !== undefined) {
        const questionTime = timeTaken[questionIndex];
        const remainingTime = Math.max(
          0,
          SCORING_CONFIG.TIME_LIMIT_SECONDS - questionTime
        );
        const questionTimeBonus = calculateTimeBonus(remainingTime);
        individualTimeBonuses.push(questionTimeBonus);
      }
    }
  });

  timeBonus = individualTimeBonuses.reduce((sum, bonus) => sum + bonus, 0);
  totalScore += timeBonus;

  const isPerfect = correctAnswers === questions.length;
  let perfectBonus = 0;

  if (
    isPerfect &&
    questions.length === SCORING_CONFIG.QUESTIONS_PER_COMPETENCE
  ) {
    perfectBonus = Math.round(
      SCORING_CONFIG.PERFECT_RUN_BONUS / SCORING_CONFIG.TOTAL_COMPETENCES
    );
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
    individualTimeBonuses,
    breakdown: {
      base: correctAnswers * basePoints,
      time: timeBonus,
      perfect: perfectBonus,
      total: totalScore,
    },
  };
};

export const getQuizScoresFromBackend = async () => {
  try {
    const response = await fetch(
      `${env.SERVER_URL}/auth/student/${localStorage.getItem(
        "username"
      )}/new_tests`
    );
    if (response.ok) {
      const data = await response.json();
      const lastTest = data.lastTest;
      if (lastTest && lastTest.totalScore) {
        return {
          totalScore: lastTest.totalScore,
          baseScore: lastTest.baseScore || 0,
          timeBonus: lastTest.timeBonus || 0,
          perfectBonus: lastTest.perfectBonus || 0,
          accuracy: lastTest.accuracy || 0,
        };
      }
    }
  } catch (error) {
    console.error("Error fetching quiz scores:", error);
  }
  return {};
};

export const submitQuizResult = async (quizData) => {
  try {
    const response = await fetch(
      `${env.SERVER_URL}/auth/student/${localStorage.getItem(
        "username"
      )}/new_tests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error("Failed to submit quiz result");
    }
  } catch (error) {
    console.error("Error submitting quiz result:", error);
    throw error;
  }
};

export const calculateScores = (gradesArray, backendData = null) => {
  if (!gradesArray || gradesArray.length !== GRADES_TYPE.length) {
    return {
      totalScore: 0,
      areaScores: COMPETENCE_AREAS.map((area) => ({
        ...area,
        score: 0,
        maxScore: getAreaMaxScore(area.id),
        competenceDetails: area.points.map((point) => ({
          point,
          level: 0,
          grade: "F",
          score: 0,
          quizProgress: { level1: false, level2: false },
        })),
      })),
      competenceLevels: {},
      badges: [],
      milestones: [],
    };
  }

  // Use backend data if available
  const totalScore = backendData?.totalScore || 0;
  const competenceScores = backendData?.competenceScores || {};
  const completedLevels = backendData?.completedLevels || {};

  const areaScores = [];
  const competenceLevels = {};
  const badges = [];
  const milestones = [];

  COMPETENCE_AREAS.forEach((area) => {
    let areaScore = 0;
    const competenceDetails = area.points.map((point, index) => {
      const grade =
        gradesArray[GRADES_TYPE.findIndex((g) => g === point)] || "F";
      const compData = competenceScores[point] || {
        level1: 0,
        level2: 0,
        totalScore: 0,
      };
      const levelData = completedLevels[point] || {
        level1: false,
        level2: false,
      };

      areaScore += compData.totalScore;
      competenceLevels[point] = grade;

      return {
        point,
        level: GRADE_LEVELS[grade]?.level || 0,
        grade,
        score: compData.totalScore,
        label: GRADE_LEVELS[grade]?.label || "Not achieved",
        quizProgress: levelData,
      };
    });

    areaScores.push({
      ...area,
      score: areaScore,
      maxScore: getAreaMaxScore(area.id),
      competenceDetails,
      percentage: Math.round((areaScore / getAreaMaxScore(area.id)) * 100),
    });
  });

  const gamificationData = getGamificationDetails(totalScore);
  if (gamificationData) {
    badges.push(gamificationData);
  }

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

const getAreaMaxScore = (areaId) => {
  const area = COMPETENCE_AREAS.find((a) => a.id === areaId);
  if (!area) return 0;
  return area.points.length * 300;
};

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
  };
};

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

export const generateQuizFeedback = (quizResult, competenceArea, level) => {
  const { correctAnswers, totalQuestions, accuracy, totalScore } = quizResult;
  const failed = correctAnswers < totalQuestions;

  if (!failed) {
    return {
      status: "success",
      title: level === 1 ? "Way to go!" : "Excellent work!",
      message: `Perfect score! You earned +${totalScore} points`,
    };
  }

  const incorrect = totalQuestions - correctAnswers;
  let title = "Try again...";

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
  };
};

export const getGradeStatus = (grade, levelNumber) => {
  const gradeInfo = GRADE_LEVELS[grade] || GRADE_LEVELS.F;

  if (levelNumber === 1) {
    return gradeInfo.level >= 1 ? "Play" : "Play";
  } else if (levelNumber === 2) {
    if (gradeInfo.level >= 2) return "Play";
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

export const getProgressPercentage = (competenceDetails) => {
  if (!competenceDetails || competenceDetails.length === 0) return 0;

  const totalPossible = competenceDetails.length * 2;
  let completed = 0;

  competenceDetails.forEach((comp) => {
    if (comp.quizProgress?.level1) completed += 1;
    if (comp.quizProgress?.level2) completed += 1;
  });

  return Math.round((completed / totalPossible) * 100);
};
