from fastapi import Depends, HTTPException, status
from typing import Dict, Any

# Placeholder for authentication
# This will be replaced with proper JWT authentication in a production environment
def get_current_user() -> Dict[str, Any]:
    """
    Simulates retrieving the current authenticated user.
    In a real application, this would validate the JWT token and return user details.

    Returns:
        Dict[str, Any]: Mock user data with ID and email
    """
    # For development/testing, return a mock user
    return {
        "id": "mock-user-123",
        "email": "user@example.com",
        "name": "Test User",
        "role": "researcher"
    }