const db = require("../db");

/**
 * Insert user feedback
 * Triggers model retuning downstream
 */
const createFeedback = async ({ user_id, feedback_type, less_of, more_of }) => {
  const query = `
    INSERT INTO feedback (
      user_id,
      feedback_type,
      less_of,
      more_of
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `;

  const values = [user_id, feedback_type, less_of, more_of];

  const { rows } = await db.query(query, values);
  return rows[0];
};

/**
 * Fetch recent feedback for a user
 * Used for adaptive calendar regeneration
 */
const getFeedbackByUser = async (user_id, limit = 20) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM feedback
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2;
    `,
    [user_id, limit],
  );
  return rows;
};

module.exports = {
  createFeedback,
  getFeedbackByUser,
};
const db = require("../db");

/**
 * Insert user feedback
 * Triggers model retuning downstream
 */
const createFeedback = async ({ user_id, feedback_type, less_of, more_of }) => {
  const query = `
    INSERT INTO feedback (
      user_id,
      feedback_type,
      less_of,
      more_of
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `;

  const values = [user_id, feedback_type, less_of, more_of];

  const { rows } = await db.query(query, values);
  return rows[0];
};

/**
 * Fetch recent feedback for a user
 * Used for adaptive calendar regeneration
 */
const getFeedbackByUser = async (user_id, limit = 20) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM feedback
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2;
    `,
    [user_id, limit],
  );
  return rows;
};

module.exports = {
  createFeedback,
  getFeedbackByUser,
};
