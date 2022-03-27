CREATE TABLE IF NOT EXISTS users (
  id integer(11) PRIMARY KEY NOT NULL,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
    person_age integer(11) NOT,
  hobbies varchar(255) NOT NULL,
  created_at datetime NOT NULL,
)