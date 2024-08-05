CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs(author, url, title) values ('Dan Abramov', 'js.com', 'On let vs const');
insert into blogs(author, url, title) values ('Laurenz Albe', 'psql.com', 'Gaps in sequences in PostgreSQL');