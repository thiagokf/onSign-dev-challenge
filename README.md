# OnSign TV - Dev Challenge

This repository contains my solution for the OnSign TV Frontend Developer Challenge.
The project consists of a Single Page Application (SPA) built with React and Vite that processes relational data from a recommendation API and displays it in a table.

## Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** CSS Modules (Native & Clean approach)
- **Language:** JavaScript (ES6+)

## Installation and Setup
Follow these simple steps to run the project locally

### Prerequisites
Make sure you have Node.js installed (v18 or higher recommended).

### 1. Extract and Navigate
Extract the provided .zip file to a folder of your choice. <br>
Open your terminal and navigate to the project root directory:
```bash
cd path/to/extracted/onSing-dev-challenge
```
### 2. Install Dependencies
```
npm install
```

### 3. Configure Environment Variables
1. Duplicate the .env.example file and rename it to .env:
```bash
cp .env.example .env
```
2. Open the .env file and insert the API access token:
```
VITE_ONSIGN_API_ACCESS_TOKEN=ACCESS_TOKEN
```
### 4. Run the Development Server
```
npm run dev
```

After all this, open http://localhost:5173 in your browser to view the running application.
