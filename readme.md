# 📘 Scalable Social Application – Technical Documentation

## 1. Application Overview

**Application Name:** SocialSphere

**Purpose:**
A public, scalable social content platform where users can register, create posts, like/comment, follow other users, and consume a personalized feed. The system is designed with scalability, performance, and security in mind so it can support real-world public traffic.

**Target Users:**

* General public
* Content creators
* Students & developers (as a portfolio-grade project)

---

## 2. High-Level Architecture

```
Client (React.js)
      ↓ HTTP / HTTPS
API Gateway / Load Balancer
      ↓
Backend Services (Node.js + Express)
      ↓
Database (MongoDB)
      ↓
Cache & Rate Limit Store (Redis)
```

### Architecture Style

* **Client–Server Architecture**
* **RESTful APIs**
* Horizontally scalable backend

---

## 3. Tech Stack

### Frontend

* React.js (Next)
* Tailwind CSS
<!-- * React Query / TanStack Query  //working -->
* Framer Motion

### Backend

* Node.js
* Express.js
* JWT Authentication
* Resend (For Email verification)
* Bcrypt (password hashing)

### Database & Storage

* MongoDB (primary data store)
* Redis (caching + rate limiting)
* Cloudinary (in use) / AWS S3 (image storage)

### DevOps & Deployment

* Vercel (frontend)
* Render / Fly.io (backend)
* MongoDB Atlas
* Redis Cloud
* Nginx (reverse proxy)

---

## 4. Core Features

### Authentication

* User registration
* Login with JWT
* verify useing resend
* Refresh tokens
* Protected routes

### User System

* Profile creation
<!-- * Follow / unfollow users //under development -->
* Public profile pages

### Post System

* Create, edit, delete posts
* Like & (comment added soon ) on posts
* Infinite scrolling feed

### Performance & Security

* Rate limiting (Redis-based)
* Input validation
* Caching for feeds
* API pagination

---

## 5. Database Design

### User Schema

* id
* username (unique)
* email (unique)
* passwordHash
* bio
<!-- * followers[] //(under development) -->
<!-- * following[] //(under development) -->
* createdAt

### Post Schema

* id
* authorId
* content
* images[]
* likes[]
<!-- * commentsCount //(under development) -->
* createdAt

### Comment Schema //(under development)

* id
* postId
* authorId
* text
* createdAt

---

## 6. API Design

### Auth Routes

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/verify-code
* GET /api/auth/forget

### User Routes

* GET /api/users/:id
* GET /api/user
* POST /api/user/update
* POST /api/users/follow  //(under development)

### Post Routes

* POST /api/posts  //(under development)
* GET /api/posts/feed  //(under development)
* POST /api/posts/:id/like  //(under development)
* POST /api/posts/:id/comment  //(under development)

---

## 7. Rate Limiting (Scalable)

### Why Rate Limiting?

* Prevent abuse & DDoS
* Protect login endpoints
* Maintain server stability

### Implementation

* Redis-based global counters
* Shared across all backend instances

### Limits Example

// change the req limit and time limit soon 

| Route      | Limit      |
| ---------- | ---------- | 
| Login      | 15 req/min |      
| Register   | 15 req/min |
| Posts Feed | 15 req/min |

---

## 8. Caching Strategy

### Redis Usage

* Cache public feeds
* Cache user profiles
* Reduce database load

### Cache Invalidation

* On new post creation
* On follow/unfollow actions

---

## 9. Security Measures

* Password hashing with bcrypt
* JWT-based auth
* Rate limiting
* CORS protection
* Input sanitization

---

## 10. Scalability Strategy

### Horizontal Scaling

* Multiple backend instances
* Stateless APIs

### Database Scaling

* Indexed queries
* Read replicas
* Sharding (future)

### CDN

* Static assets served via CDN

---

## 11. Deployment Flow

1. Frontend deployed on Vercel
2. Backend deployed on Render/Fly.io
3. MongoDB Atlas connected
4. Redis Cloud enabled
5. Environment variables configured

---

## 12. Monitoring & Logging

* Request logs
* Error tracking
* Redis & DB metrics

---

## 13. Future Enhancements

* Real-time chat (WebSockets)
* Notifications service
* AI-based recommendations
* Mobile app (React Native)

---

## 14. Conclusion

This application demonstrates a **production-ready, scalable full-stack system** suitable for public usage. It showcases real-world backend architecture, frontend integration, performance optimization, and security best practices.

---

📌 **This document can be used as:**

* Project documentation
* Portfolio explanation
* College submission
* Interview discussion material
