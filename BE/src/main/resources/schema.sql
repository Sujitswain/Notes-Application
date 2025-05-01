CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    otp_code VARCHAR(255),
    otp_expiry DATETIME,
    CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE notes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    heading VARCHAR(255),
    notes TEXT,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE note_image (
    id VARCHAR(255) NOT NULL,
    base64 LONGTEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    note_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
);


-- INSERT INTO users (id, username, email, password) VALUES
-- (1, 'alice', 'alice@example.com', 'pass123'),
-- (2, 'bob', 'bob@example.com', 'pass456');
--
--
-- INSERT INTO notes (id, user_id, heading, notes, is_favorite, created_at, updated_at) VALUES
-- (1, 1, 'Groceries', 'Buy milk and eggs', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (2, 1, 'Workout', 'Morning run and gym', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (3, 2, 'Books to read', 'Sapiens, Atomic Habits', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
--
--
--
-- INSERT INTO note_images (note_id, image_data, file_type) VALUES
-- (1, 'base64-image-data-1', 'image/png'),
-- (2, 'base64-image-data-2', 'image/jpeg');