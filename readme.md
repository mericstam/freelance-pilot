FreelancePilot



A comprehensive freelance management application designed for Swedish freelancers to manage time tracking, invoicing, and tax compliance.



🚀 Features



✅ Implemented Features











📊 Dashboard: Overview of business metrics, recent activities, and quick actions







⏱️ Time Tracking:











Manual time entry with customer association







Visual calendar with work indicators (🔴 under 8h, 🟢 8h+, 🏖️ weekends/holidays)







Swedish national holidays automatically marked







Monthly statistics and productivity tracking







👥 Customer Management:











Add, edit, and delete customers







Track hourly rates per customer







View customer statistics (time entries, invoices)







💰 Swedish Tax Calculator:











F-skatt compliant salary calculations







Municipality-specific tax rates







Employer contributions (31.42%)







Pension calculations with special payroll tax (24.26%)







Target net salary calculator







Required invoice amount calculator



🔧 Coming Soon











📄 Invoice Generation: PDF invoices with Swedish tax compliance







🏦 Business Account Management: Track income, expenses, and balance







📈 Reports \& Analytics: Detailed business insights







⚙️ Settings: Company configuration and preferences



🛠️ Tech Stack











Frontend: Next.js 14 with App Router, TypeScript, React







Styling: Tailwind CSS







Database: SQLite with Prisma ORM







Date Handling: date-fns







Icons: Lucide React







PDF Generation: jsPDF (ready for implementation)



📦 Installation











Clone the repository:



git clone https://github.com/yourusername/freelance-pilot.git

cd freelance-pilot













Install dependencies:



npm install













Set up the database:



npx prisma generate

npx prisma db push













Run the development server:



npm run dev













Open http://localhost:3000 in your browser



🗂️ Project Structure



freelance-pilot/

├── app/                    # Next.js app directory

│   ├── api/               # API routes

│   ├── components/        # React components

│   ├── lib/              # Utilities and helpers

│   ├── \[pages]/          # Route pages

│   └── layout.tsx        # Root layout

├── prisma/

│   └── schema.prisma     # Database schema

└── public/               # Static assets





🇸🇪 Swedish Tax Compliance



The application includes comprehensive Swedish tax calculations:











Municipality Tax Rates: All major Swedish municipalities







Employer Contributions: 31.42% arbetsgivaravgift







Pension Tax: 24.26% särskild löneskatt







State Income Tax: 20% on income above 598,500 SEK/year







Basic Deduction: Grundavdrag calculations







F-skatt: Designed for freelancers with F-skatt status



🎯 Key Features in Detail



Time Tracking











Visual calendar with daily hour indicators







Automatic detection of Swedish holidays







Workday vs. weekend differentiation







Monthly statistics and averages



Tax Calculator











Gross to net salary conversion







Target net salary to required invoice amount







Municipality-specific calculations







Comprehensive breakdown of all taxes and fees



Customer Management











Store customer details and hourly rates







Track time entries per customer







Generate invoices based on tracked time



🔐 Database Schema



The application uses SQLite with the following main models:











Customer: Client information and hourly rates







TimeEntry: Tracked working hours







Invoice: Generated invoices







Account: Business account tracking







Transaction: Financial transactions







SalaryPayout: Salary payment records







Holiday: Swedish national holidays







Settings: Application configuration



📝 License



MIT License



👨‍💻 Contributing



Contributions are welcome! Please feel free to submit a Pull Request.



🐛 Known Issues











Invoice PDF generation is not yet implemented







Business account management needs completion







Reports and analytics are placeholder pages



📧 Contact



For questions or support, please open an issue in the GitHub repository.







Built with ❤️ for Swedish freelancers

