INSERT INTO users (id, username, email, password) VALUES
(1, 'alice', 'alice@example.com', 'pass123'),
(2, 'bob', 'bob@example.com', 'pass456');


INSERT INTO notes (id, user_id, heading, notes, isFavorite) VALUES
(1, 1, 'Groceries', 'Buy milk and eggs', false),
(2, 1, 'Workout', 'Morning run and gym', true),
(3, 2, 'Books to read', 'Sapiens, Atomic Habits', false);

INSERT INTO note_images (note_id, image_data, file_type) VALUES
(1, 'base64-image-data-1', 'image/png'),
(2, 'base64-image-data-2', 'image/jpeg');