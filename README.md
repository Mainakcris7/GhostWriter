# GhostWriter: Post Seamlessly and Anonymously 👻

![logo](https://ghostwriter-mainak.onrender.com/assets/logo-BFXdFRoi.png)

**GhostWriter** is a platform designed for sharing anonymous posts and confessions, providing users with the opportunity to express their thoughts, feelings, and experiences freely, without revealing their identity. Users can submit posts under specific categories, offering a space to share and discover content without fear of judgment. Additionally, users can assign an `identifier` (hidden) to their posts, making it easy to search for and revisit them later to see how others have responded, using `stars ⭐`.

### Live Demo
You can access the live application here: [GhostWriter](https://ghostwriter-mainak.onrender.com/)

---

## Features
- **Anonymous Posting**: Users can create posts under various categories such as *Confession*, *Advice*, *Funny*, etc., without requiring any login or personal identification.
- **Post Search**: Search functionality to find posts by keywords.
- **Like System**: Users can `star ⭐` their favorite posts.

---


## Technologies Used
- **Backend**: Spring Boot
- **Frontend**: React.js
- **Database**: MongoDB
- **Deployment**: Render

---

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clonehttps://github.com/Mainakcris7/GhostWriter.git
   ```
2. **Backend setup**:
 - Navigate to `backend` directory.
 - Build the project using `Maven`.
 ```bash
 ./mvnw clean package
```
- Run the application
```bash
java -jar target/app.jar
```
OR
- Directly `build` the `docker image` and `run`
```bash
docker build -t ghostwriter-backend .
docker run -d -p 8080:8080 ghostwriter-backend
```
2. **Frontend setup**:
 - Navigate to `frontend\ghostwriter` directory.
 - Install all the dependencies.
 ```bash
 npm install
```
- Run the app.
```bash
npm run dev
```


## Contact
For any further queries or suggestions, please drop a mail 📩 at mainakcr72002@gmail.com. 



