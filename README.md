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

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your IGDB API credentials:
   ```properties
   VITE_CLIENT_ID=your_client_id
   VITE_CLIENT_SECRET=your_client_secret
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

6. **Preview the Production Build**:
   ```bash
   npm run preview
   ```

---

## **Usage**

- **Home Page**: Displays a list of most rated games. Use the dropdown to filter games by platform.
- **Search Page**: Allows users to search for games by entering a query. Displays search results with detailed game information.
- **Watchlist Page**: Displays the user's watchlist. Users can add or remove games from their watchlist.
- **Game Detail Page**: Displays detailed information about a selected game, including genres, description, storyline, screenshots, and videos.

---

## **API Details**

- **IGDB API**: The application uses the IGDB API to fetch game data. Ensure you have a valid client ID and client secret from IGDB.

---

## **Deployment**

1. **Netlify**:
   - Connect your GitHub repository to Netlify.
   - Set up build settings:
     - Build Command: `npm run build`
     - Publish Directory: `dist`
   - Add environment variables in Netlify settings:
     - `VITE_CLIENT_ID`
     - `VITE_CLIENT_SECRET`
   - Deploy the site.

2. **Other Hosting Services**:
   - Follow similar steps to deploy the application on other hosting services like Vercel, AWS, etc.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Contact**

For any inquiries or feedback, please contact [keennathan@icloud.com].