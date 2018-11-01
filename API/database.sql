CREATE DATABASE GymNotebook

USE [GymNotebook]

CREATE TABLE [Users] (
	[Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	[Username] nvarchar(100) NOT NULL,
	[EmaiL] nvarchar(100) NOT NULL,
	[Role] nvarchar(10)  NULL,
	[Password] nvarchar(200) NOT NULL,
	[Salt] nvarchar(200) NOT NULL,
	[CreateAt] datetime NOT NULL)
SELECT * FROM [Users];

CREATE TABLE [Trainings] (
	[Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	[UserId] UNIQUEIDENTIFIER NOT NULL,
	[Name] nvarchar(100) NOT NULL,
	[Description] nvarchar(100) NOT NULL,
	[Difficulty] NVARCHAR(100) NOT NULL)
SELECT * FROM [Trainings];

CREATE TABLE [Routines] (
	[Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	[TrainingId] UNIQUEIDENTIFIER NOT NULL,
	[Name] VARCHAR(100) NOT NULL)
SELECT * FROM [Routines];

CREATE TABLE [Exercises] (
	[Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	[RoutineId] UNIQUEIDENTIFIER NOT NULL,
	[Name] VARCHAR(100) NOT NULL,
	[Description] VARCHAR(100) NOT NULL,
	[MusclePart] VARCHAR(100) NOT NULL)
SELECT * FROM [Exercises]

CREATE TABLE [Results] (
	[Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	[ExerciseId] UNIQUEIDENTIFIER NOT NULL,
	[NumberSeries] INT NOT NULL,
	[Repetitions] INT NOT NULL,
	[Weight] FLOAT NOT NULL,
	[Comments] NVARCHAR(250) NULL,
	[CreatedAt] DATETIME NOT NULL)
SELECT * FROM [Results]

CREATE TABLE [Progress] (
	[Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	[Weight] FLOAT NULL,
	[Biceps] FLOAT NULL,
	[Chest] FLOAT NULL,
	[Thigh] FLOAT NULL,
	[Calf] FLOAT NULL,
	[Waist] FLOAT NULL,
	[Shoulders] FLOAT NULL,
	[Neck] FLOAT NULL,
	[CreatedAt] DATETIME NOT NULL)
SELECT * FROM [Progress]

CREATE TABLE [Friends] (
	[Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
	[UserId] UNIQUEIDENTIFIER NOT NULL,
	[FriendId] UNIQUEIDENTIFIER NOT NULL,
	[FriendStatus] INT NULL,
	[DateAdded] DATETIME NOT NULL)
SELECT * FROM [Friends]