import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_employees():
    response = client.get("/employees/?limit=10")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    # Since we seeded 550 records, it should return 10
    assert len(response.json()) == 10

def test_create_and_delete_employee():
    test_employee = {
        "first_name": "API",
        "last_name": "Tester",
        "email": "api.tester.unique123@example.com",
        "department": "Engineering",
        "role": "QA Engineer",
        "salary": 75000.0,
        "is_active": True,
        "hire_date": "2024-01-01"
    }
    
    # 1. Create
    response = client.post("/employees/", json=test_employee)
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["email"] == test_employee["email"]
    emp_id = data["id"]
    
    # 2. Read Single
    response = client.get(f"/employees/{emp_id}")
    assert response.status_code == 200
    assert response.json()["first_name"] == "API"
    
    # 3. Update
    update_data = {"salary": 80000.0}
    response = client.put(f"/employees/{emp_id}", json=update_data)
    assert response.status_code == 200
    assert response.json()["salary"] == 80000.0
    
    # 4. Delete
    response = client.delete(f"/employees/{emp_id}")
    assert response.status_code == 200
    
    # Verify Deletion
    response = client.get(f"/employees/{emp_id}")
    assert response.status_code == 404
