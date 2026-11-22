 
# NotesApp

## Project Overview

NotesApp is a mobile application developed using React Native and TypeScript. The application allows users to create, manage, organise and search their personal notes.

Users can register an account, log in, manage their profiles and perform different operations on their notes. The application uses AsyncStorage to store user information and notes locally on the device.

The main purpose of this project is to develop a simple and user-friendly note-taking application while practising mobile application development, authentication, data storage and CRUD operations.

## Project Objectives

The objectives of this project are to:

- Develop a functional mobile note-taking application.
- Allow users to register and log in securely within the application.
- Implement protected routing to restrict access to certain screens.
- Allow users to create, view, update and delete notes.
- Organise notes into different categories.
- Implement a search feature to find notes easily.
- Allow users to sort notes according to their creation dates.
- Use local storage to save user information and notes.

## Features

### 1. User Authentication

The application provides user authentication features that allow users to:

- Register using a username, email address and password.
- Log in using their registered email and password.
- Log out of their accounts.
- Maintain their login session using AsyncStorage.

### 2. Protected Routing

The application uses protected routing to control access to screens.

- Users who are not logged in are redirected to the Login screen.
- Logged-in users cannot access the Login or Register screens.
- Only authenticated users can access the main application features.

### 3. Profile Management

Users can manage their account information through the Profile screen.

They can:
- View their username and email address.
- Update their username.
- Change their email address.
- Change their password.

### 4. Notes Management (CRUD Operations)

The application supports CRUD operations, which include:

- **Create:** Users can add new notes.
- **Read:** Users can view their saved notes.
- **Update:** Users can edit existing notes.
- **Delete:** Users can remove notes they no longer need.

Each note contains information such as:
- Title (optional).
- Note content.
- Category.
- Date added.
- Date edited.

### 5. Categories

Users can organise their notes into three categories:

- Work
- Study
- Personal

Each category has its own page where users can view notes belonging to that category.

### 6. Search Notes

The application includes a search feature that allows users to find notes by entering keywords.

The search checks the note titles and content to help users find information quickly.

### 7. Sort Notes

Users can organise their notes according to their creation dates.

The available sorting options are:
- Newest First – displays the most recently added notes first.
- Oldest First – displays the earliest added notes first.

## Technologies Used

The following technologies and tools were used to develop this application:
React Native
TypeScript 
Expo
Expo Router

## Project initiation used commands

## Running the application
npx expo start

## Github link
https://github.com/khethiwengema04-gif/NotesApp.git
