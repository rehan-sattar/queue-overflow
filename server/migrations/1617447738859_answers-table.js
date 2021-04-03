/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
        CREATE TABLE answers(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            question_id INTEGER REFERENCES questions(id),
            contents VARCHAR(2000) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

exports.down = pgm => {
  pgm.sql(`
        DROP TABLE answers;
    `);
};
