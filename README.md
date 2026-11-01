# FitMate – Personal Fitness Planner

FitMate is a beginner-friendly fitness planner built with HTML, SCSS/CSS, and vanilla JavaScript. It collects a few basic details and displays general workout ideas, meal inspiration, and a wellness reminder.

## Features

- Collects age, height, weight, activity level, fitness goal, and diet preference.
- Displays entered height, weight, and selected fitness goal.
- Calculates BMI for adults aged 18 and above.
- Does not apply adult BMI categories to users under 18.
- Suggests general movement ideas based on the selected goal.
- Shows meal inspiration based on dietary preference.
- Displays a wellness reminder based on activity level.
- Saves the latest profile in browser localStorage.
- Allows users to edit or reset their plan.
- Responsive layout for desktop, tablet, and mobile screens.

## Technologies

- HTML5
- SCSS-compatible CSS
- CSS3
- JavaScript
- DOM manipulation
- Browser localStorage

## Project structure

```text
FitMate/
├── index.html
├── css/
│   ├── style.scss
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## How to run the project

1. Download or clone this repository.
2. Open the `FitMate` folder in Visual Studio Code.
3. Make sure the `css` and `js` folders are in the same folder as `index.html`.
4. Open `index.html` with the VS Code Live Server extension.
5. Fill in the form and select **Generate my plan**.

The page loads `css/style.css` and `js/script.js` using relative paths. Both files are included in this project.

## Styling

The `style.scss` file uses CSS-compatible SCSS syntax. The `style.css` file contains the browser-ready stylesheet. If you edit `style.scss`, compile it to `style.css` using the Live Sass Compiler extension, or make the same changes in `style.css`.

## Important note

FitMate is an educational portfolio project. It provides general wellness ideas, not medical advice, a diagnosis, or a personalized treatment or nutrition plan. BMI is a screening measure and does not describe a person's complete health. Adult BMI categories are not used for people under 18. Users with health conditions, pain, or concerns about exercise or food should consult a qualified healthcare professional.

## Future improvements

- Add more workout and meal suggestions.
- Add weekly habit tracking.
- Improve accessibility and form feedback.
- Add more customization options to the planner.
