1.)Write API to create Mentor
API:http://localhost:6000/mentor
sample data:
{
    "Name":"Anbu"
}


2.Write API to create Student
API:http://localhost:6000/student
Sample data:
{
    "Studentname":"Lokesh"
}


3.)Write API to Assign a student to Mentor
API:http://localhost:6000/mentor/1718952503676
    http://localhost:6000/mentor/mentorId
Sample Data:
{
    "Student":["Name1","Name2","Name3"....]
}
Even though if you add a name which is not present in database it will not add the name to mentor


4.)Write API to Assign or Change Mentor for particular Student
API:http://localhost:6000/student/1718952692429
    http://localhost:6000/student/studentId
Sample data:
{
    "mentorName":"Guna"
}


5.)Write API to show all students for a particular mentor
API:http://localhost:6000/mentor/Sathish
    http://localhost:6000/mentor/mentorName

6.)Write an API to show the previously assigned mentor for a particular student
API:http://localhost:6000/student/Lokesh
    http://localhost:6000/student/StudentName