-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    primary_platform TEXT,
    primary_platform_link TEXT,
    brand_category TEXT,
    niche TEXT,
    audience_type TEXT,
    content_format TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    feedback_type TEXT CHECK (
        feedback_type IN ('like', 'reject', 'edit', 'override')
    ),
    less_of TEXT[],
    more_of TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_feedback_user
ON feedback(user_id);