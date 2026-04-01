# WeCare Project - Frontend

## Current Features
- **Admin Dashboard:** Statistics & Engagement charts.
- **Volunteer Management:** Search, Activate/Deactivate/Delete volunteers.
- **Organization Management:** Approve/Reject registration requests.
- **Signup:** Full organization registration with file upload support.

## Backend Requirements (API Endpoints)
The frontend is already connected to the following endpoints on `http://localhost:3000`:

- `POST /auth/signup` (Expects FormData for org details + file)
- `GET /admin/organizations`
- `PUT /admin/organizations/:id/approve`
- `PUT /admin/organizations/:id/reject`
- `GET /admin/volunteers`
