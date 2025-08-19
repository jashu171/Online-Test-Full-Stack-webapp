# React + Flask Authentication System

A complete authentication system with React frontend and Flask backend, featuring user registration, login, and dashboard functionality.

## Project Structure

```
├── src/                    # React frontend
│   ├── components/         # React components
│   │   ├── AuthPage.js    # Login/Register page
│   │   ├── Dashboard.js   # User dashboard
│   │   └── *.css         # Component styles
│   ├── context/           # React context
│   │   └── AuthContext.js # Authentication context
│   ├── services/          # API services
│   │   └── api.js        # API service class
│   ├── utils/            # Utility functions
│   │   └── auth.js       # Auth utilities
│   └── App.js            # Main app component
├── backend/              # Flask backend
│   ├── app.py           # Main Flask application
│   ├── requirements.txt # Python dependencies
│   ├── run.py          # Server startup script
│   └── .env            # Environment variables
└── package.json        # React dependencies
```

## Features

### Frontend (React)
- Modern React with hooks and context
- Responsive authentication UI
- Form validation and error handling
- JWT token management
- Protected routes
- User dashboard with profile information

### Backend (Flask)
- RESTful API with JWT authentication
- User registration and login
- Password hashing with Werkzeug
- SQLite database (configurable)
- CORS enabled
- Input validation and error handling
- Token blacklisting for secure logout

## Quick Start

### 1. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
python run.py
```

The backend will run at `http://localhost:5000`

### 2. Setup Frontend

```bash
# Navigate to project root
cd ..

# Install React dependencies
npm install

# Start the React development server
npm start
```

The frontend will run at `http://localhost:3000`

## Usage

1. **Register a new account:**
   - Open `http://localhost:3000`
   - Click "Sign Up" 
   - Fill in your name, email, and password
   - Password must contain uppercase, lowercase, and numbers

2. **Login:**
   - Use your registered email and password
   - Click "Sign In"

3. **Dashboard:**
   - After successful login, you'll see the dashboard
   - View your profile information
   - Use the logout button to sign out

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Health Check
- `GET /api/health` - Server status

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-super-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=sqlite:///auth.db
FLASK_ENV=development
FLASK_DEBUG=True
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Security Features

- Password hashing with Werkzeug
- JWT token-based authentication
- Token blacklisting on logout
- Input validation and sanitization
- CORS protection
- SQL injection prevention with SQLAlchemy

## Development Notes

- The frontend uses a proxy to the backend in development
- SQLite database is created automatically
- Tokens expire after 24 hours
- All API responses follow a consistent format

## Production Deployment

1. **Backend:**
   - Use a production WSGI server (Gunicorn)
   - Configure PostgreSQL or MySQL database
   - Set secure environment variables
   - Enable HTTPS
   - Implement rate limiting

2. **Frontend:**
   - Build the React app: `npm run build`
   - Serve static files with nginx or similar
   - Update API URL for production backend

## Troubleshooting

### Common Issues

1. **CORS errors:** Ensure the backend is running and CORS is configured
2. **Database errors:** Check if the database file has proper permissions
3. **Token errors:** Verify JWT secret keys match between requests
4. **Port conflicts:** Ensure ports 3000 and 5000 are available

### Testing the API

```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "Password123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Password123"}'
```

## License

This project is open source and available under the MIT License.