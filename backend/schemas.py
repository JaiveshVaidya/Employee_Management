from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    department: str
    role: str
    salary: float
    is_active: Optional[bool] = True
    hire_date: date

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None
    role: Optional[str] = None
    salary: Optional[float] = None
    is_active: Optional[bool] = None
    hire_date: Optional[date] = None

class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        from_attributes = True
