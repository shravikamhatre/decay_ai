const FeedbackModel = require("../models/feedback.model");

/**
 * Store feedback and trigger model retuning
 */
const submitFeedback = async (feedbackData) => {
  const feedback = await FeedbackModel.createFeedback(feedbackData);

  // 🔁 Hook for GenAI retraining / weight adjustment
  triggerModelUpdate(feedback);

  return feedback;
};

/**
 * Placeholder: connects feedback → GenAI
 */
const triggerModelUpdate = (feedback) => {
  /*
    Example later:
    - Update user preference vector
    - Adjust tonality weights
    - Regenerate content calendar
  */
  console.log("Triggering model update with feedback:", feedback.id);
};

module.exports = {
  submitFeedback,
};
