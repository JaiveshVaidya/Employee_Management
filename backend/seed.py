from database import SessionLocal, engine
import models
from faker import Faker
import random

def seed_database():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if we already have records
    if db.query(models.Employee).count() > 0:
        print("Database already seeded.")
        return

    fake = Faker()
    departments = ["Engineering", "Sales", "Marketing", "HR", "Finance", "Operations"]
    roles = ["Manager", "Developer", "Analyst", "Coordinator", "Director", "Specialist"]

    employees = []
    print("Generating 500+ employee records...")
    for _ in range(550): # Generating 550 records to comfortably exceed 500 requirement
        employee = models.Employee(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.unique.email(),
            department=random.choice(departments),
            role=random.choice(roles),
            salary=round(random.uniform(40000, 150000), 2),
            is_active=random.choice([True, True, True, False]), # 75% active
            hire_date=fake.date_between(start_date='-5y', end_date='today')
        )
        employees.append(employee)
    
    db.add_all(employees)
    db.commit()
    print(f"Successfully seeded database with {len(employees)} records.")

if __name__ == "__main__":
    seed_database()
