# React In-class Exam, October 2025

Maksim Karakulin, 20106742

## 1. Setup instructions

This repository contains the starting code for a lab-based React assessment. 

[https://github.com/rbirney/react-exam](https://github.com/rbirney/react-exam)

You are required to take the following steps in preparation for this exam.

## Clone the react-exam repository

- Choose a folder where you want to save the repository and open a command prompt in this location

- Clone the `react-exam` repository using the following command:

~~~bash
git clone https://github.com/rbirney/react-exam.git
~~~

### Add .env file

- Open the cloned project in Visual Studio Code

- Create an .env file in the base folder. 

- Add your TMDB API key (the same one that you used in the React labs)

~~~bash
VITE_TMDB_KEY=YOUR_KEY_GOES_HERE
FAST_REFRESH=false
~~~

### Create your own repository

Create a new public repository in your GitHub account called 'reactExam'.

Copy the URL of your new repository.

Open a new terminal in VS Code (in your react-exam folder) and type the following commands:

~~~bash
git remote remove origin
git remote add origin ...URL of your new repository...
git push origin main
~~~

Verify that your GitHub repository now contains the starter app.


### Start the app

In your VS Code terminal, run the following commands:

~~~bash
npm install
npm run dev
~~~

Now check that the Movie App runs correctly and is accessible from a browser on your machine.


### Update README.md

Add your name and student number to the README.md file, as shown below:

~~~markdown
# React In-class Exam, October 2025

Maksim Karakulin, 20106742
...
~~~

Push your changes to GitHub:

~~~bash
git add -A
git commit -m "Readme updated"
git push origin main
~~~

**Please ensure you have completed these steps before the lab-based exam and that you can push changes to your remote repository on GitHub.**


## 2. Submit to Moodle

Once you have created your GitHub repository you can submit it to Moodle (no need to wait until the day of the exam!)

You can submit it here:

[https://moodle.setu.ie/mod/assign/view.php?id=4606492](https://moodle.setu.ie/mod/assign/view.php?id=4606492)