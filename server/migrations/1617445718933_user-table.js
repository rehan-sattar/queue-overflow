/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(40) NOT NULL,
            bio VARCHAR(1000),
            profile_photo VARCHAR(1000),
            location VARCHAR(100),
            twitter_handle VARCHAR(100),
            github_handle VARCHAR(100),
            website VARCHAR(100),
            create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

exports.down = pgm => {
  pgm.sql(`
        DROP TABLE users;
    `);
};
