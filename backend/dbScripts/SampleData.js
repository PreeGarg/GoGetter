db = db.getSiblingDB('gogetter')
db.createCollection('goals')
goalsCollection = db.getCollection("goals")
goalsCollection.remove({})
goalsCollection.insert(
{
	goalId: 1,
	title: "Intermittent Fasting",
	description: "Follow 16:8 fasting rule for 30 days",
	studentId: 11,
	startDate: new Date(),
	endDate: new Date(),
	category: "Health",
	progress: "Not Started",
	reminder: false,
}
)
goalsCollection.insert(
{
	goalId: 2,
	title: "Learn typescript",
	description: "Follow typescript course on courseera",
	studentId: 11,
	startDate: new Date(),
	endDate: new Date(),
	category: "Career",
	progress: "Not Started",
	reminder: false,
}
)

db.createCollection('students')
studentsCollection = db.getCollection("students")
studentsCollection.remove({})
studentsCollection.insert({
    studentId: 1,
    name: "Preedhi",
    email: "preedhigarg@gmail.com",
    goalList : [
        {
            goalId: 1
        },
        {
            goalId: 2
        },
        {
            goalId: 3
        }
       ],
    favoriteView: "Categories"
}
)

studentsCollection.insert({
    studentId: 2,
    name: "Zi",
    email: "zi@gmail.com",
    goalList : [
        {
            goalId: 4
        },
        {
            goalId: 5
        },
        {
            goalId: 6
        }
       ],
    favoriteView: "Categories"
})
