# grupp-5
Due to deleting our first repository Khalids commits are not shown. Khalid completed the first commit in original repository. 

This is the schedule we were working on to divide tasks with deadlines. Everyone completed their task and we worked as a team to fix bugs. All endpoints work but we did not complete the final implementation of phase 5.

Group Assignment Schedule (2025-01-15 to 2025-01-30)

Phase 1: Initial Setup
2025-01-15 (Day 1)
Task: Set up the server environment.
Assigned to: Person 1(Khalid)
Details: Create the base server, configure the environment, and install all dependencies.

Phase 2: Authentication
2025-01-16 (Day 2)
Task: Implement /auth/register and /auth/token endpoints.
Assigned to: Person 2 (Andreas)
Details: Build the authentication endpoints, including password hashing and JWT token generation.

Phase 3: User Management
2025-01-17 (Day 3)
Task: Build /users and /users/{userId} GET endpoints.
Assigned to: Person 3 (Ivan)
Details: Fetch user lists and specific user details for authenticated users.
2025-01-19 (Day 4) 
Task: Implement DELETE /users/{userId} endpoint.
Assigned to: Person 4(Melody)
Details: Add functionality to delete a specific user (admin-only).
2025-01-20 (Day 5)
Task: Implement PUT /users endpoint.
Assigned to: Person 5 (Fuad)


Details: Add functionality to update user details like name or email.
2025-01-21 (Day 6)
Task: Implement POST /invite/{userId} endpoint.
Assigned to: Person 6 (Hodman)
Details: Allow invitations to add users to a conversation.

Phase 4: Messaging System
2025-01-22 (Day 7)
Task: Build /conversations GET endpoint.
Assigned to: Person 7 (Amanda)
Details: Fetch all conversation IDs for authenticated users.
2025-01-23 (Day 8)
Task: Build /messages GET and POST endpoints.
Assigned to: Person 8 (Sebastian)
Details: Fetch messages and allow the creation of new messages.
2025-01-24 (Day 9) 
Task: Build DELETE /messages/{msgID} endpoint.
Assigned to: Person 9(Ali)
Details: Add functionality to delete messages by their ID.

Phase 5: Security Features (We will see about the dates)
2025-01-27 (Day 10)
Task: Implement SSL with a self-signed certificate and CSRF token handling.
Assigned to: Person 1 (lead) + Person 4 (support)
Details: Set up HTTPS and secure POST/PUT requests with CSRF tokens.
2025-01-28 (Day 11)
Task: Add security headers (CSP and X-Content-Type-Options).
Assigned to: Person 2 (lead) + Person 5 (support)
Details: Implement rudimentary security headers to enhance web app security.

Phase 6: Finalization
2025-01-29 (Day 12)
Task: Implement /env GET endpoint and finalize all endpoints.
Assigned to: Person 3 (lead) + Person 6 (support)
Details: Fetch environment variables and prepare the system configuration endpoint.
2025-01-30 (Day 13)
Task: Final testing, debugging, and integration.
Assigned to: Entire group
Details: Collaborate to test all endpoints, debug, and refine the application for submission.

Task Assignment Summary (By Person)
Here’s a recap of the workload per person to ensure fairness:
Person 1: Server setup (Day 1) + SSL/CSRF (Day 10, lead).
Person 2: Auth endpoints (Day 2) + security headers (Day 11, lead).
Person 3: User GET endpoints (Day 3) + /env GET endpoint (Day 12, lead).
Person 4: User DELETE endpoint (Day 4) + SSL/CSRF (Day 10, support).
Person 5: User PUT endpoint (Day 5) + security headers (Day 11, support).
Person 6: Invitations (Day 6) + /env GET endpoint (Day 12, support).
Person 7: Conversations (Day 7).
Person 8: Messages GET/POST (Day 8).
Person 9: Messages DELETE (Day 9).
