#!/usr/bin/env python3
import os
from dotenv import load_dotenv
from app import app, db

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    # Create database tables
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")

    # Run the application
    print("Starting Flask server...")
    print("Backend running at: http://localhost:5001")
    print("API endpoints available at: http://localhost:5001/api/")

    app.run(
        debug=os.environ.get("FLASK_DEBUG", "True").lower() == "true",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5001)),
    )
