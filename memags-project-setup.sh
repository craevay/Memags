# Create a project directory
mkdir memags-ecommerce
cd memags-ecommerce

# Create frontend React app
npx create-react-app client

# Create backend directory
mkdir server
cd server

# Initialize backend package.json
npm init -y

# Install backend dependencies
npm install express mongoose dotenv cors jsonwebtoken bcryptjs multer stripe nodemailer

# Install development dependencies
npm install --save-dev nodemon

# Create basic folder structure for backend
mkdir controllers models routes middleware config uploads

# Go back to project root
cd ..

# Install frontend dependencies (in the client folder)
cd client
npm install axios react-router-dom redux react-redux redux-thunk styled-components react-toastify jwt-decode
