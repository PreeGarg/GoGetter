## Steps to create this project 
1) Clear out the default content in the browser when first created this project. Keep in mind that the app component is our root component which is the globle component. 
    1. Go to the app.component.html and clear everything out
2) Add the header 
    1. Generate the component (Run this command line ->> ng g c components/partials/header )
    2. Add the header component in the app.component.html file 
    3. Add HTML
    4. Add CSS
    5. The colors of the header (https://www.canva.com/colors/color-palettes/space-for-everything/)
3) Add the side bar
    1. Generate the component 
    2. Add the side bar component in the app.component.html file 
    3. Add HTML
    4. Add CSS 
4) Creating the goal model to display some goals 
    1. Create the goal model (4/22/2023 -> need to revisit the type and see if it is require later if necessary)
        1. Put the model inside the share/model path. Moving forward all of the models will be stored in this path. The professor have something similar to this in his code base. classSample/todo-app/src/app/share 
    2. Create the data.ts 
        1. As of now we don't have the backend set up. This file is to just display the temporary data before creating the database. 
        2. Add sample data into this file
    3. Create the Goal Service
        1. Need to create a service folder for the goals. To create a service run this command (ng g s) but to actually create the folder with the file name for the goal service run this command line in terminal ->> ng g s services/goal
        2. In the goal.service.ts we will want to get all the goal from the temporary data file in data.ts 
    4. Create the home component
        1. We want to create pages in the component folder because the home component is a full page and it is not part of any pages. Therefore, it will not be partial. For now by default the home page is defaulted to the Category (side nav bar)
        2. Run this command line to create the home component ->> ng g c components/pages/home
            1) Add ts (inject the goal service into the home component to display the data)
            2) Add html (add elements to display the goal data object)
            3) Add css (use this to organize and make it prettier)
5) Adding the enum class to the share/models path
    1) Create the enum class
    2) Upddate the data.ts so that the category calls the enum class for the category 

