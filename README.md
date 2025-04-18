# Notes-Application

    1. FOR FE

        Install Vite + React

            npm create vite@latest my-app --template react
            cd my-app
            npm install

        Install Tailwind CSS

            npm install -D tailwindcss postcss autoprefixer
            npx tailwindcss init -p

        Configure tailwind.config.js
            
            content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]

        Update index.css

            @tailwind base;
            @tailwind components;
            @tailwind utilities;

        Start your app

            npm run dev


    2. FOR BE

        