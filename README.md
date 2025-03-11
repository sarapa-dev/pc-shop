<h1 align="center">PC Shop</h1> 

## Website features:
- User authentication & authorization with password hashing
- Product management (admin only)
- Pagination & filtering for products (included in the URL)
- React Query for advanced data fetching and caching
- Conditionally rendered UI based on logged in user
- Global state management using Zustand
- Form validation both on frontend and backend
- Responsive design

## Technologies and Tools Used on the backend:

- Express with TypeScript
- Prisma (ORM)
- JSON Web Token (JWT)
- Bcrypt

## Technologies and Tools Used on the frontend:

- React with TypeScript
- React Router
- Zustand
- Nuqs
- React hook form and zod
- TailwindCSS and shadcn/ui


## Installation and Running:

1. Clone the repository: 
  ```sh
  git clone git@github.com:sarapa-dev/pc-shop.git
  ```
2. Navigate to the project directory: 
  ```sh
  cd project-name
  ```
3. Install the dependencies for both backend and frontend:
 ```sh
   cd backend
   npm install

   cd frontend
   npm install
 ```
4. Open `HeidiSQL` (or `MySQL Workbench`) and load the SQL dump located in the `backend/sql_dumps` folder.
5. Create a `.env` file in the root of the backend folder and configure it as follows:
 ```sh
   DATABASE_URL="mysql://username:password@localhost:3306/pc_shop"
   PORT = 5000
   JWT_SECRET = 'your_secret'
 ```
6. Start the development server first for backend than for frontend:
 ```sh
   npm run dev
 ```
7. Open your browser and navigate to:
 ```sh
   http://localhost:5173
 ```

## Website desktop preview:
🖱️ Click on any preview to open it in full-screen mode. <br />
❗ Please note that loading these previews may take some time.

### For unauthenticated users
![Image](https://github.com/user-attachments/assets/64a42d41-8b14-4f1e-b4d4-d67c6f16344a)
### For authenticated users with role customer
![Image](https://github.com/user-attachments/assets/c7246077-b978-49cf-a0df-1ddbd3b566ad)
### For authenticated users with role admin
![Image](https://github.com/user-attachments/assets/637af479-f0a0-4cae-b1d4-c8535b5eca3f)


## Website mobile preview:
🖱️ Click on mobile preview to open it in full-screen mode. <br />
❗ Please note that loading these previews may take some time. <br /><br />
![Image](https://github.com/user-attachments/assets/c1a7f8cc-9ee8-4070-b341-76eb0fa44c6b)
