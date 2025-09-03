# JobConnect

This project is a full-stack job board application with a Spring Boot backend and a React frontend.

## Docker Setup

To run the entire application using Docker, follow these steps:

1.  **Create a `.env` file in the root directory.** This file will contain the environment variables for the database.

    ```
    MYSQL_ROOT_PASSWORD=your_root_password
    MYSQL_DATABASE=jobconnect
    ```

2.  **Create a `.env` file in the `jobconnect-backend` directory.** This file will contain the environment variables for the Spring Boot application.

    ```
    SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/jobconnect?useSSL=false
    SPRING_DATASOURCE_USERNAME=root
    SPRING_DATASOURCE_PASSWORD=your_root_password
    SPRING_JPA_HIBERNATE_DDL_AUTO=update
    JWT_SECRET=your_jwt_secret
    ```

3.  **Create a `.env` file in the `jobconnect-frontend` directory.** This file will contain the environment variables for the React application.

    ```
    VITE_API_BASE_URL=http://localhost:8080
    ```

4.  **Build and run the application.**

    ```
    docker-compose up --build
    ```

The application will be available at `http://localhost:3000`.
