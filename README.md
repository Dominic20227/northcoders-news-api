# Northcoders News API

## Link to hosted version

https://articlesapi-jz0j.onrender.com/api/

## SUMMARY OF PROJECT

Node.js web application built using the Express.js framework. It sets up various API routes and utilizes a controller module to handle different HTTP requests/responses and a model module to query the database. Additionally, it includes error handling middleware.
This app uses a postgres database.

## HOW TO CLONE

Go to this url - "https://github.com/Dominic20227/northcoders-news-api"
Nagivate to directory you want to clone repository and type "git clone https://github.com/Dominic20227/northcoders-news-api"

## HOW TO INSTALL DEPENDENCIES

type "npm install" and this will install all dev dependencies and dependencies

## HOW TO SEED LOCAL DATABASE

create test and development databases using the command - "npm run setup-dbs"

To seed the development database run the command "npm run seed"

The test database will be seeded each time a test is run

## HOW TO RUN TESTS

Run the command npm run test

## HOW TO CREATE TO SET UP CONNECTION TO DATABASE -CREATING .ENV FILES

_assuming you have installed psql and set default password_

create 2 .env files in root of directory .env.test and .env.development

in .env.development type - PGDATABASE=nc_news
in env.test type - PGDATABASE=nc_news_test
