from sqlalchemy import Column, Integer, String, Float, Boolean, Date
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    department = Column(String, index=True)
    role = Column(String)
    salary = Column(Float)
    is_active = Column(Boolean, default=True)
    hire_date = Column(Date)
