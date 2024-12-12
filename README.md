# Game Explorer - A Personalised Game Recommendation App

## **Table of Contents**
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [API Details](#api-details)
7. [Deployment](#deployment)

---

## **Overview**
Game Explorer is a web application that helps users discover games tailored to their preferences. Powered by the IGDB API, it allows users to search for games by genre, platform, and ratings, and view detailed information including trailers, screenshots, and reviews.

---

## **Features**
- Search games by **genre**, **platform**, and **release year**.
- Display **trending** and **top-rated** games.
- View detailed game info such as description, media, and developer details.
- Responsive design for seamless browsing on desktop and mobile.
- Save games to your **watchlist**.

---

## **Tech Stack**
- **Frontend**: React, React Router
- **State Management**: React Context API
- **Styling**: Bootstrap
- **API**: IGDB API
- **Deployment**: Netlify

---

## **Setup and Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/game-explorer.git
   cd game-explorer
   ```  

2. **Install Dependencies:**  
    ```bash
    npm install
    ```   

3. **Configure Environment Variables:**  
    - Create a `.env` file in the project root and add:  
    ```bash
    VITE_CLIENT_ID=your_client_id
    VITE_CLIENT_SECRET=your_access_token  
    ```  

4. **Start the Development Server:**  
    ```bash
    npm run dev
    ```  

---

## Usage  

1. 
2. 
3.  

---

## API Details 
The app uses the `IGDB API` to fetch game data. Endpoints utilised include:

<!--WIP - /games for game details.
- /genres for fetching available genres.
- /platforms for fetching platforms. -->  

### API Authorisation  
This app uses a `VITE_CLIENT_ID` and `VITE_CLIENT_SECRET` from IGDB. Follow their documentation to obtain credentials.  
 
---  

## Deployment  

The app is deployed on Netlify:
- Live Demo: Game Explorer  

To deploy yourself:
1. Push your code to GitHub.
2. Connect your GitHub repository to Netlify.
3. Add environment variables for `VITE_CLIENT_ID` and `VITE_CLIENT_SECRET` in Netlify settings.
4. Deploy the site.  

---