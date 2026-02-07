const db = require("../db");

/**
 * Create a new user
 */
const createUser = async ({
  email,
  password_hash,
  first_name,
  last_name,
  primary_goal,
  primary_platform,
  primary_platform_link,
  brand_category,
  niche,
  audience_type,
  content_format,
}) => {
  const query = `
    INSERT INTO users (
      email,
      password_hash,
      first_name,
      last_name,
      primary_goal,
      primary_platform,
      primary_platform_link,
      brand_category,
      niche,
      audience_type,
      content_format
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *;
  `;

  const values = [
    email,
    password_hash || null,
    first_name || null,
    last_name || null,
    primary_goal || null,
    primary_platform || null,
    primary_platform_link || null,
    brand_category || null,
    niche || null,
    audience_type || null,
    content_format || null,
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

/**
 * Get user by ID
 */
const getUserById = async (id) => {
  const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

/**
 * Update user preferences (onboarding data)
 */
const updateUserPreferences = async (email, { brand_category, niche, content_format }) => {
  const query = `
    UPDATE users
    SET 
      brand_category = COALESCE($2, brand_category),
      niche = COALESCE($3, niche),
      content_format = COALESCE($4, content_format),
      updated_at = CURRENT_TIMESTAMP
    WHERE email = $1
    RETURNING *;
  `;

  const values = [email, brand_category, niche, content_format];
  const { rows } = await db.query(query, values);
  return rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserPreferences,
};
