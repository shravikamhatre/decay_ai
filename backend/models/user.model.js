const db = require("../db");

/**
 * Create a new user after personalization form
 */
const createUser = async ({
  email,
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
      primary_platform,
      primary_platform_link,
      brand_category,
      niche,
      audience_type,
      content_format
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;

  const values = [
    email,
    primary_platform,
    primary_platform_link,
    brand_category,
    niche,
    audience_type,
    content_format,
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

/**
 * Get user by email (Google auth compatible)
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

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
