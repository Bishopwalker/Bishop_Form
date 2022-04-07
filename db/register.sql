INSERT INTO users(
                  firstname,email,password
)VALUES($1,$2,$3);
select * from users where email=$2;