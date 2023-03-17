-- Active: 1673528596262@@127.0.0.1@3306
CREATE DATABASE portfolio
    DEFAULT CHARACTER SET = 'utf8mb4';
   USE portfolio;
   CREATE TABLE
    `projects` (
        `id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY ,
        `name` VARCHAR (150) NOT NULL,
        `image_id` INT NOT NULL,
        `content` LONGTEXT NOT NULL,
        `tools` VARCHAR (300) NOT NULL,
        `link` VARCHAR (300) NOT NULL,
        `packages` VARCHAR (300),
        `github` VARCHAR (300) NOT NULL
    );

    INSERT INTO `projects` (
        `id`,
        `name`,
        `image_id`,
        `content`,
        `tools`,
        `link`,
        `packages`,
        `github`
    ) VALUES (    
    1,
    "The Wild Journal",
    1,
    "First project I have ever worked in as a web developer. It was essentially an exercise to showcase the recently learned skills, with a focus on basic HTML and CSS.",
    "HTML, CSS",
    "https://isaschlothauer.github.io/wildbunch/",
    NULL,
    "https://github.com/isaschlothauer/wildbunch"        
    ), (     
    2,
    "Musique",
    2,
    "A music website from music lovers to music lovers. Relies on the Spotify API implementation for data fetching, such as the top charts and world music info.",
    "HTML, CSS, Vite",
    "https://musique.wcs-student-projects.d-a-pfeiffer.info/",
    "Howler, Router-Dom, Dotenv, Axios",
    "https://github.com/WildCodeSchool/2022-09-JS-RemoteEN-Project-2-Team-1"
    ), (     
    3,
    "Skyhub",
    3,
    "A job search website for airline related posts. It has a full implementation of a backend service, including a database and a user authentication management.",
    "HTML, CSS, NextJs, SQL, Express",
    "#",
    "Typescript, Tailwind, Turbo, Axios, JWT-code, Argon2",
    "https://github.com/SkyHub-aero/skyhub.aero"
    );

    CREATE TABLE `images` (
        `id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
`src` VARCHAR(300) NOT NULL
    );

    INSERT INTO `images` (
        `id`,
        `src`
    ) VALUES (
        1,
        "/images/projects/wildjournal.jpg"
    ), (
        2,
        "/images/projects/musique.jpg"
    ), (
        3,
        "/images/projects/skyhub.jpg"
    );

    CREATE TABLE `contact` (
        `id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        `first_name` VARCHAR(100) NOT NULL,
        `last_name` VARCHAR (100) NOT NULL,
        `email` VARCHAR (150) NOT NULL,
        `message` LONGTEXT NOT NULL,
        `time_submitted` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );


    CREATE TABLE `tools` (
        `id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        `name` VARCHAR(150) NOT NULL,
        `image_id` INT NOT NULL
    );

    CREATE TABLE `packages` (
        `id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        `name` VARCHAR(150) NOT NULL,
        `image_id` INT NOT NULL
    );

    CREATE TABLE `users` (
        `id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        `username` VARCHAR (150) NOT NULL,
        `email` VARCHAR (200) NOT NULL,
        `hashedPassword` VARCHAR (255) NOT NULL
    );

     CREATE TABLE `playground` (
        `id` BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        `playground_id` INT NOT NULL,
        `name` VARCHAR (150) NOT NULL,
        `content` VARCHAR (1000) NOT NULL,
        `tools` VARCHAR (500) NOT NULL,
        `link` VARCHAR (1000) NOT NULL
    );

    INSERT INTO playground (playground_id, name, content, tools, link) 
    VALUES (1, "Database fetch", "A modelized fullstack application, with a restfull API implementation (backend-frontend sinergy).", "Express.js, React.js, SQL", "#"), 
    (2, "SocketIO dummy", "SocketIo implementation, for a website with real-time chat online between two users.", "Express.js, Vite.js, SocketIO", "#"), 
    (3, "Hackathon AWS", "Hackathon under the AWS challenge, to create a car rental service website with user login.", "Express.js, SQL, NextJs", "#"), 
    (4, "Checkpoint 3", "One of the several tests I did while studying. It involves manipulating the frontend with backend post requets", "Express.js, React.js, Typescript", "#"), 
    (5, "CV Portfolio", "The repo for this very-same website, where I employed most of what I liked the most to learn.", "Express.js, NextJs, jsonwebtoken", "#"), 
    (6, "Musique redo", "The redo of Musique's project, to continue from the point our group finished with improved content", "Vite.js, Typescrip, API", "#");

USE portfolio;
    SELECT * FROM images;
    SELECT i.src AS source FROM images AS i INNER JOIN projects AS p ON i.id=p.image_id WHERE p.name="musique";
    SELECT i.src AS source, p.name AS name FROM images AS i INNER JOIN projects AS p ON i.project_id=p.id WHERE p.name="wildjournal";
SELECT i.src AS source FROM images AS i INNER JOIN projects AS p ON i.project_id=p.id WHERE p.name="wildjournal" AND i.image_id=1;

SELECT name, project_id FROM projects WHERE name = "test1";

