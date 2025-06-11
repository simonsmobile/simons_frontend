export const SCORING_CONFIG = {
  VERSION: "2.0",

  LEVEL_1_BASE_POINTS: 100,
  LEVEL_2_BASE_POINTS: 150,

  TIME_LIMIT_SECONDS: 78,
  MAX_TIME_BONUS: 50,

  QUESTIONS_PER_COMPETENCE: 3,
  TOTAL_COMPETENCES: 21,

  AREA_COMPLETION_BONUS: {
    1: 900,
    2: 1800,
    3: 1200,
    4: 1200,
    5: 1200,
  },

  LEVEL_COMPLETION_BONUS: 2000,
  PERFECT_RUN_BONUS: 5000,

  MAX_POSSIBLE_TOTAL: 48650,
  MAX_POSSIBLE_PER_COMPETENCE: 150,

  GAMIFICATION_THRESHOLDS: {
    RISING_STAR: 15000,
    ADVANCED_ACHIEVER: 30000,
    ELITE_PERFORMER: 45000,
  },

  GRADE_SYSTEM: {
    F: {
      level: 0,
      points: 0,
      label: "Not attempted",
      description: "No competence demonstrated",
    },
    B: {
      level: 1,
      points: 50,
      label: "Level 1",
      description: "Foundation level competence",
    },
    M: {
      level: 1,
      points: 100,
      label: "Level 1",
      description: "Solid foundation level mastery",
    },
    C: {
      level: 2,
      points: 150,
      label: "Level 2",
      description: "Advanced level competence",
    },
  },

  COMPETENCE_AREAS: {
    1: {
      name: "Information and data literacy",
      competences: ["1.1", "1.2", "1.3"],
      description:
        "Browsing, searching, filtering, evaluating and managing data",
    },
    2: {
      name: "Communication and collaboration",
      competences: ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6"],
      description:
        "Interacting, sharing, collaborating through digital technologies",
    },
    3: {
      name: "Digital content creation",
      competences: ["3.1", "3.2", "3.3", "3.4"],
      description: "Developing, integrating and re-elaborating digital content",
    },
    4: {
      name: "Safety",
      competences: ["4.1", "4.2", "4.3", "4.4"],
      description:
        "Protecting devices, personal data, health and the environment",
    },
    5: {
      name: "Problem solving",
      competences: ["5.1", "5.2", "5.3", "5.4"],
      description: "Solving technical problems and identifying needs",
    },
  },

  FEEDBACK_MESSAGES: {
    LEVEL_COMPLETION: {
      1: {
        title: "Digital Skills Foundation",
        message:
          "Congratulations on completing Level 1 with all correct answers! You've built a strong foundation in digital competencies. Advance to Level 2 to develop advanced, career-ready expertise.",
      },
      2: {
        title: "Digital Skills Master",
        message:
          "Outstanding achievement completing Level 2 with all correct answers! Your advanced mastery positions you as a digital leader ready for academic, internship, and career challenges.",
      },
    },

    AREA_COMPLETION: {
      1: {
        1: "Great job completing Information and Data Literacy! You've shown strong skills in finding and evaluating reliable information.",
        2: "Excellent work mastering Communication and Collaboration! Your ability to use digital tools for teamwork is outstanding.",
        3: "Well done completing Digital Content Creation! You've demonstrated creativity in designing presentations and media.",
        4: "Fantastic achievement mastering Safety! Your understanding of cybersecurity is a vital skill for staying safe online.",
        5: "Superb work completing Problem Solving! Your logical reasoning and ability to tackle tech challenges show strong thinking.",
      },
      2: {
        1: "Outstanding job mastering advanced Information and Data Literacy! Your skills in analysing complex data demonstrate high expertise.",
        2: "Remarkable achievement in advanced Communication and Collaboration! You're positioned as a leader in group settings.",
        3: "Excellent work mastering advanced Digital Content Creation! Your ability to create complex media showcases creativity and technical skill.",
        4: "Superb job mastering advanced Safety! Your cybersecurity skills position you as a digital protector for professional environments.",
        5: "Incredible achievement mastering advanced Problem Solving! Your logical thinking marks you as a digital innovator.",
      },
    },

    MILESTONES: {
      15000: {
        title: "Digital Skills Rising Star",
        message:
          "Great job reaching 15,000 points! You've made strong progress building a solid foundation for academic and professional success.",
      },
      30000: {
        title: "Digital Skills Advanced Achiever",
        message:
          "Excellent work hitting 30,000 points! Your advanced proficiency demonstrates readiness for complex academic tasks and internships.",
      },
      45000: {
        title: "Digital Skills Elite Performer",
        message:
          "Incredible achievement reaching 45,000 points, near the maximum score! Your near-perfect mastery positions you as a digital innovator.",
      },
      0: {
        title: "Digital Skills Progress",
        message: "Keep it up!",
      }
    },
  },

  CALCULATION_HELPERS: {
    calculateTimeBonus: (remainingSeconds) => {
      if (remainingSeconds <= 0) return 0;
      return Math.round(
        SCORING_CONFIG.MAX_TIME_BONUS *
          (remainingSeconds / SCORING_CONFIG.TIME_LIMIT_SECONDS)
      );
    },

    getQuizOutcome: (correctAnswers, totalQuestions) => {
      const accuracy = correctAnswers / totalQuestions;
      if (accuracy === 1) return "perfect";
      if (accuracy >= 0.8) return "excellent";
      if (accuracy >= 0.6) return "good";
      if (accuracy >= 0.4) return "needs_improvement";
      return "needs_study";
    },

    getGradeFromPerformance: (correctAnswers, totalQuestions, level) => {
      const accuracy = correctAnswers / totalQuestions;

      if (accuracy === 1) {
        return level === 1 ? "M" : "C";
      } else if (accuracy >= 0.8) {
        return level === 1 ? "B" : "M";
      } else {
        return "F";
      }
    },
  },
};

export const {
  LEVEL_1_BASE_POINTS,
  LEVEL_2_BASE_POINTS,
  TIME_LIMIT_SECONDS,
  MAX_TIME_BONUS,
  GAMIFICATION_THRESHOLDS,
  GRADE_SYSTEM,
  COMPETENCE_AREAS,
} = SCORING_CONFIG;

export default SCORING_CONFIG;
