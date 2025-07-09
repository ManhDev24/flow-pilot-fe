# 🧭 FlowPilot Frontend

> Frontend project for **FlowPilot** – a lightweight AI-integrated project management platform focused on HR efficiency.

---

## 🚀 Tech Stack

- ⚡️ [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- 💅 [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- 🔧 [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- 📦 [Redux Toolkit](https://redux-toolkit.js.org/)
- 🔁 [TanStack React Query](https://tanstack.com/query/latest)

---

## 📁 Project Structure

src/
├── apis/ # API call definitions (REST or GraphQL)
├── app/ # App-level configs, wrappers, theme, context
├── assets/ # Static assets (images, logos, svgs, etc.)
├── components/ # Shared and reusable UI components
├── hooks/ # Custom React hooks
├── layouts/ # Layout components for route grouping (e.g., AuthLayout, AdminLayout)
├── lib/ # Helper libraries, external utilities
├── locales/ # i18n translation files (if using)
├── models/ # TypeScript types, interfaces
├── modules/ # Feature-based module separation (e.g., auth, dashboard)
├── pages/ # Main route-level pages (optional if using file-based routing)
├── redux/ # Redux slices, store config
├── routes/ # Route definitions & guards
├── utils/ # Utility functions
├── mocks/ # API mock data (for dev/testing)
├── settings/ # App config, constants, theme settings


---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-org/flowpilot-frontend.git
cd flowpilot-frontend

# Install dependencies
npm install

🧪 Development
# Start dev server
npm run dev

- Local development runs on: http://localhost:6868

🧹 Linting & Formatting
# Check lint
npm run lint

# Format with Prettier
npm run format

📦 Build
npm run build

- Output will be in /dist

⚙️ Environment Variables
- Create .env file based on .example.env:

cp .example.env .env

- Fill in the necessary variables (e.g., API base URL, app environment).

🛠 Scripts
| Command   | Description                |
| --------- | -------------------------- |
| `dev`     | Start development server   |
| `build`   | Build production bundle    |
| `lint`    | Run ESLint checks          |
| `format`  | Format code using Prettier |
| `preview` | Preview build locally      |

🧩 Recommended VSCode Extensions
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- shadcn/ui snippets (optional)
- React TypeScript Snippets

🧠 Notes
- UI is built with shadcn/ui on top of TailwindCSS
- Project follows feature-module-first structure
- Global state is managed via Redux Toolkit, server cache via TanStack React Query

📜 License
MIT © CHAMPION IT DEPT

---

