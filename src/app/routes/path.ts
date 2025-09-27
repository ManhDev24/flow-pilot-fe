export const PATH = {
  // GUEST MODULE
  HOME: '/',
  LANDING_PAGE: '/landing-page',
  PRICING_PAGE: '/pricing-page',
  // AUTH MODULE
  AUTH: '/auth',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  REGISTER: '/auth/register',
  // SUPER ADMIN
  SUPER_ADMIN: '/super-admin',
  SUPER_ADMIN_DASHBOARD: '/super-admin/dashboard',
  SUPER_ADMIN_USERS: '/super-admin/users',
  SUPER_ADMIN_WORKSPACES: '/super-admin/workspaces',
  SUPER_ADMIN_WORKSPACE_DETAIL: '/super-admin/workspace-detail/:id',
  // HR - ADMIN WORKSPACE (admin-ws)
  ADMIN: '/admin-ws',
  ADMIN_DASHBOARD: '/admin-ws/dashboard',
  ADMIN_MY_WORKSPACE: '/admin-ws/my-workspace',
  ADMIN_MY_EMPLOYEES: '/admin-ws/my-employees',
  ADMIN_MY_REPORT: '/admin-ws/my-reports',
  ADMIN_MY_EMPLOYEE_DETAIL: '/admin-ws/my-employee-detail/:id',
  ADMIN_MY_PROJECTS: '/admin-ws/my-projects',
  ADMIN_MY_PROJECT_DETAIL: '/admin-ws/my-project-detail/:id',
  ADMIN_SETTINGS: '/admin-ws/account-settings',
  // EMPLOYEE (emp)
  EMPLOYEE: '/emp',
  EMPLOYEE_SETTINGS: '/emp/account-settings',
  EMPLOYEE_KANBAN: '/emp/kanban-board',
  EMPLOYEE_MY_TEAM: '/emp/my-team',
  EMPLOYEE_MY_FILES: '/emp/my-files',
  // STAFF
  EMPLOYEE_MY_TASKS: '/emp/my-tasks',
  EMPLOYEE_MY_PERFORMANCE: '/emp/my-performance',
  // TEAM LEADER
  EMPLOYEE_LEAD_BACKLOG: '/emp/back-log',
  EMPLOYEE_LEAD_MEMBER_REPORTS: '/emp/my-team/member-reports/:id',
  EMPLOYEE_LEAD_PROJECT_REPORTS: '/emp/project-reports',
  // EMPLOYEE_LEAD: '/emp/team-lead',
  // EMPLOYEE_STAFF: '/emp/staff',
  FORBIDDEN: '/403',
  NOTFOUND: '/404'
}
