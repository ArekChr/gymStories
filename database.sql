CREATE DATABASE GymNotebook

USE GymNotebook

CREATE TABLE Users  (
 Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
 Username nvarchar(100) NOT NULL,
 Email nvarchar(100) NOT NULL,
 Role nvarchar(10)  NULL,
 Password nvarchar(200) NOT NULL,
 Salt nvarchar(200) NOT NULL,
 CreateAt datetime NOT NULL
)

SELECT * FROM Users;

