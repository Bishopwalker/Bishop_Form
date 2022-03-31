UPDATE users SET firstname = $2, lastname = $3, person_age = $4, hobbies = $5
WHERE id = $1;
SELECT * FROM users WHERE id = $1;