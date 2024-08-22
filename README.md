# Password Manager
## MERN App

This is a Password Manager application built using the MERN stack (MongoDB, Express.js, React, Node.js). The project is divided into two main parts: the `backend` and the `frontend`.

## Project Structure

```
my-project/
├── backend/
│   ├── node_modules/
│   ├── config.js
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
└── frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    └── vite.config.js
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- npm

### Installation

1. **Clone the repo**
    ```sh
    git clone https://github.com/tejaschaudhari192/Password-Manager.git
    ```

2. **Install NPM packages for backend**
    ```sh
    cd backend
    npm install
    ```

3. **Install NPM packages for frontend**
    ```sh
    cd ../frontend
    npm install
    ```

### Usage

1. **Run the backend server**

    Configure your MongoDB Atlas connection in `backend/config.js`.

    ```sh
    cd backend
    npm start
    ```

    The backend server will start on `http://localhost:3000`.

2. **Run the frontend server**

    ```sh
    cd frontend
    npm run dev
    ```

    The frontend server will start on `http://localhost:5173`.

### Configuration

- **backend/config.js**: Configure your MongoDB Atlas connection and other backend settings here.
- **frontend/vite.config.js**: Configure your Vite build settings here.

### API Endpoints

The backend API endpoints are prefixed with `/api`. Here are some example endpoints:

- `GET /api/hello`: Returns a welcome message.

### Built With

- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request