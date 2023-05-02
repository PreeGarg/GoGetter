db = db.getSiblingDB('gogetter')
db.createCollection('goals')
goalsCollection = db.getCollection("goals")
goalsCollection.remove({})
goalsCollection.insert(
{
	goalId: "1",
	title: "Intermittent Fasting",
	description: "Follow 16:8 fasting rule for 30 days",
	userId: "1",
	startDate: new Date(),
	endDate: new Date(),
	category: "Health",
	progress: "Not Started",
	reminder: false,
}
)
goalsCollection.insert(
{
	goalId: "2",
	title: "Learn typescript",
	description: "Follow typescript course on courseera",
	userId: "1",
	startDate: new Date(),
	endDate: new Date(),
	category: "Career",
	progress: "Not Started",
	reminder: false,
}
)

goalsCollection.insert(
{
    goalId: "3",
    title: "Trekking",
    description: "Take lessons on trekking dos and donts",
    userId: "1",
    startDate: new Date(),
    endDate: new Date(),
    category: "Travel",
    progress: "Not Started",
    reminder: false,
}
)

goalsCollection.insert(
{
    goalId: "4",
    title: "Eat more protein",
    description: "intake vegan protein",
    userId: "2",
    startDate: new Date(),
    endDate: new Date(),
    category: "Health",
    progress: "Not Started",
    reminder: false,
}
)
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert({
    userId: "1",
    name: "Preedhi",
    email: "preedhigarg@gmail.com",
    goalList : [
        {
            goalId: "1"
        },
        {
            goalId: "2"
        },
        {
            goalId: "3"
        }
       ],
    favoriteView: "Category"
}
)

usersCollection.insert({
    userId: "2",
    name: "Zi",
    email: "zi@gmail.com",
    goalList : [
        {
            goalId: "4"
        },
        {
            goalId: "5"
        },
        {
            goalId: "6"
        }
       ],
    favoriteView: "Category"
})

db.createCollection('reminders')
reminderCollection = db.getCollection("reminders")
reminderCollection.remove({})
reminderCollection.insert({
    reminderId:"1",
    goalId: "1",
    userId: "1",
    message: "Do not forget to fast" ,
    reminderDate: new Date()
})
