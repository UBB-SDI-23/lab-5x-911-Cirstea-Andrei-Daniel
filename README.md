# Lab 5x assignment

To make things easier with deployments, you will be using this repository for a while. Check this link weekly for new requirements: https://github.com/UBB-SDI-23/Lab-5x-assignments/blob/main/README.md 

Commit and push everything to this repository.

Car Dealership

Steps for installation:
- Clone the github repository
- Navigate to the repository
- Compile the java project using maven (for example mvn install)
- Obtain a web domain for the server (for example from godaddy.com) and replace its value in the ServerSettings file in the frontend
- Obtain an SSL certificate and place it inside the path specified in the docker-compose.yml file
- Using docker-compose create the docker containers (for example docker-compose build and docker-compose up)
- Now the application should be running!

Teck stack:
- Backend - Java Spring because it is a popular framework for building enterprise-level Java applications. It provides seamless integration with various other frameworks and technologies, including ORM (Hibernate, JPA), database access (JDBC, Spring Data), messaging (Spring Integration, JMS), and web services (Spring Web Services, RESTful APIs). Also, Spring has a vast and active community of developers and enthusiasts. This community support provides access to extensive documentation, tutorials, forums, and libraries, making it easier to learn and resolve issues.
- Frontend - React with Material UI as a component framework. React follows a component-based architecture, where UIs are broken down into reusable and independent components. This modular approach promotes code reusability, maintainability, and scalability. It uses JSX (JavaScript XML) syntax, which allows developers to write HTML-like code within JavaScript. JSX enhances code readability and makes it easier to understand and visualize the structure of UI components. Also, it can be easily integrated with other JavaScript libraries and frameworks. It can be used alongside libraries like Redux for state management, React Router for routing, and Axios for handling HTTP requests. Material UI offers a wide range of pre-built and ready-to-use components, such as buttons, forms, navigation elements, dialogs, and more. These components are highly customizable, responsive, and designed to work well together, saving development time and effort. MUI follows the Material Design guidelines, which provide a visually appealing and consistent design language. By using Material-UI, you can create UIs that are familiar to users and offer a modern and polished look and feel.
- Database - PostgreSQL since it is a powerful open-source relational database management system (RDBMS) known for its robustness, reliability, and advanced features. It has a reputation for being highly reliable and stable. It has a proven track record in production environments and is known for its data integrity and durability. PostgreSQL is available for multiple operating systems, including Linux, Windows, macOS, and various Unix-like systems. This cross-platform compatibility allows developers to deploy and run PostgreSQL on their preferred operating system and makes transitioning to other platforms easier. Also, PostgreSQL adheres to SQL standards and provides a high level of compatibility with other database systems. It supports most SQL features and is compliant with ANSI SQL standards, making it easier to migrate applications from other databases to PostgreSQL, if need be.
- Containarization - Docker in order to  encapsulate the application and its dependencies, including the operating system, libraries, and runtime environment, into a single package. The container can be run on any system that supports Docker, making applications highly portable and eliminating compatibility issues across different environments.
- Proxy server - nginx because it can handle SSL/TLS encryption and decryption, offloading the SSL/TLS processing from application servers, it is designed to handle a large number of concurrent connections and high traffic loads efficiently and has built-in support for WebSockets and HTTP/2, enabling real-time communication and efficient data transfer between clients and servers.