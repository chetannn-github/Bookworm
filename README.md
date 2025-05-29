# BookWorm  🐛 🐛

BookWorm is a mobile application built with React Native and Expo for book enthusiasts to explore and recommend books. The app features a seamless infinite scrolling home page and a secure backend powered by Node.js, Express.js, and MongoDB.

## Features

- **Infinite Scrolling Home Page**: Browse through an endless list of book recommendations.   
- **User Authentication**: Secure token-based authentication using JWT.  
- **Backend**: Built with Node.js, Express.js, and MongoDB for robust data management.  
- **Frontend**: Developed with React Native and Expo for a smooth and responsive user experience.  



## Screenshots
<p align="center">
    <img src="https://github.com/chetannn-github/Bookworm/blob/main/mobile/assets/preview/home.png" width="30%" />
    <img src="https://github.com/chetannn-github/Bookworm/blob/main/mobile/assets/preview/login.png" width="30%" />
    <img src="https://github.com/chetannn-github/Bookworm/blob/main/mobile/assets/preview/profile.png" width="30%" />
    <img src="https://github.com/chetannn-github/Bookworm/blob/main/mobile/assets/preview/create.png" width="30%" />
    
</p>


## Tech Stack

### Frontend
- React Native
- Expo

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)

## Installation

### Prerequisites
- Node.js installed
- MongoDB running locally or on a cloud service
- Expo CLI installed globally

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/chetannn-github/Bookworm.git
    cd BookWorm
    ```

2. Install dependencies for the backend:
    ```bash
    cd server
    npm install
    ```

3. Set up environment variables for the backend:
    - Create a `.env` file in the `backend` directory.
    - Add the following:
      ```
        PORT=5000
        MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
        JWT_SECRET=<your_jwt_secret>
        CLOUDINARY_CLOUD_NAME=<your_cloud_name>
        CLOUDINARY_API_KEY=<your_api_key>
        CLOUDINARY_API_SECRET=<your_api_secret>
      ```

4. Start the backend server:
    ```bash
    npm start
    ```

5. Install dependencies for the frontend:
    ```bash
    cd ../mobile
    npm install
    ```

6. Start the Expo development server:
    ```bash
    npm start
    ```

7. Scan the QR code with the Expo Go app on your mobile device to run the app.



Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.
