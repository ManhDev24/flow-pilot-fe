import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { PATH } from './path'
import GuestLayout from '../layouts/GuestLayout/GuestLayout'
import LandingPage from '../modules/Guest/LandingPage/LandingPage'
import PricingPage from '../modules/Guest/PricingPage/PricingPage'
import AuthLayout from '../layouts/AuthLayout/AuthLayout'
import Login from '../modules/Auth/Login/Login'
import Register from '../modules/Auth/Register/Register'
import SuperAdminLayout from '../layouts/SuperAdminLayout/SuperAdminLayout'
import Dashboard from '../modules/SuperAdmin/Dashboard/Dashboard'
import UserManagement from '../modules/SuperAdmin/UserManagement/UserManagement'
import WorkspaceManagement from '../modules/SuperAdmin/WorkspaceManagement/WorkspaceManagement'
import AdminWsLayout from '../layouts/AdminWsLayout/AdminWsLayout'
import DashboardAdmin from '../modules/AdminWs/DashboardAdmin/DashboardAdmin'
import MyWorkspace from '../modules/AdminWs/MyWorkspace/MyWorkspace'
import MyEmployees from '../modules/AdminWs/MyEmployees/MyEmployees'
import MyProjects from '../modules/AdminWs/MyProjects/MyProjects'
import WorkspaceDetail from '../modules/SuperAdmin/WorkspaceDetail/WorkspaceDetail'
import MyEmployeeDetail from '../modules/AdminWs/MyEmployeeDetail/MyEmployeeDetail'
import MyProjectDetail from '../modules/AdminWs/MyProjectDetail/MyProjectDetail'
import EmployeeLayout from '../layouts/EmployeeLayout/EmployeeLayout'
import MemberReports from '../modules/Employee/MemberReports/MemberReports'
import AdminSettings from '../modules/AdminWs/AdminSettings/AdminSettings'
import AccountSettings from '../modules/Employee/AccountSettings/AccountSettings'
import KanbanBoard from '../modules/Employee/KanbanBoard/KanbanBoard'
import MyTeam from '../modules/Employee/MyTeam/MyTeam'
import MyFiles from '../modules/Employee/MyFiles/MyFiles'
import MyTasks from '../modules/Employee/MyTasks/MyTasks'
import MyPerformance from '../modules/Employee/MyPerformance/MyPerformance'
import type { ReactNode } from 'react'
import Forbidden from '../pages/Forbidden/Forbidden'
import NotFound from '../pages/NotFound/NotFound'
import ForgotPassword from '../modules/Auth/ForgotPassword/ForgotPassword'
import AdminReports from '@/app/modules/AdminWs/AdminReports/AdminReports'
import ManagerLayout from '@/app/layouts/ManagerLayout/ManagerLayout'
import KanbanBoardManager from '@/app/modules/Manager/KanBoardManager/KanbanBoardManager'
import MyTeamManager from '@/app/modules/Manager/MyTeamManager/MyTeamManager'
import MyPerformanceManager from '@/app/modules/Manager/MyPerformanceManager/MyPerformanceManager'
import MyFileManager from '@/app/modules/Manager/MyFileManager/MyFileManager'
import ProjectReport from '@/app/modules/Manager/ProjectReport/ProjectReport'
import { useSelector } from 'react-redux'
import type { IRoleState } from '../models'
import FirstLogin from '../modules/Auth/FirstLogin/FirstLogin'
import ResetPassword from '../modules/Auth/ResetPassword/ResetPassword'

const redirectMap: Record<string, string> = {
  superadmin: PATH.SUPER_ADMIN,
  admin: PATH.ADMIN,
  projectmanager: PATH.EMPLOYEE_MANAGE_MY_TASKS,
  employee: PATH.EMPLOYEE_MY_TASKS
}

const RejectedRouter = () => {
  const storedRole: string = useSelector((state: { role: IRoleState }) => state.role.currentRole)

  if (storedRole) {
    const redirectPath = redirectMap[storedRole.toLowerCase()]
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

const RejectedAuthRouter = () => {
  const storedRole: string = useSelector((state: { role: IRoleState }) => state.role.currentRole)

  if (!storedRole) {
    return <Outlet />
  }

  const redirectPath = redirectMap[storedRole.toLowerCase()]

  return redirectPath ? <Navigate to={redirectPath} replace /> : <Navigate to={PATH.HOME} replace />
}

const ProtectedRouter = ({ roles }: { roles: string[] }) => {
  const storedRole: string = useSelector((state: { role: IRoleState }) => state.role.currentRole)

  if (!storedRole) {
    return <Navigate to={PATH.LOGIN} replace />
  }

  if (storedRole && roles.includes(storedRole.toLowerCase())) {
    return <Outlet />
  }

  return <Navigate to={PATH.FORBIDDEN} replace />
}

const RoleGuard = ({ roles, children }: { roles: string[]; children: ReactNode }) => {
  const storedRole: string = useSelector((state: { role: IRoleState }) => state.role.currentRole)

  if (!storedRole) {
    return <Navigate to={PATH.LOGIN} replace />
  }

  if (storedRole && roles.includes(storedRole.toLowerCase())) {
    return <>{children}</>
  }

  return <Navigate to={PATH.FORBIDDEN} replace />
}

const EmployeeIndexPage = () => {
  const storedRole: string = useSelector((state: { role: IRoleState }) => state.role.currentRole)

  if (!storedRole) {
    return <Navigate to={PATH.LOGIN} replace />
  }

  if (storedRole.toLowerCase() === 'employee') {
    return <Navigate to={PATH.EMPLOYEE_MY_TASKS} replace />
  }

  return <Navigate to={PATH.FORBIDDEN} replace />
}

const EmployeeManagerIndexPage = () => {
  const storedRole: string = useSelector((state: { role: IRoleState }) => state.role.currentRole)

  if (!storedRole) {
    return <Navigate to={PATH.LOGIN} replace />
  }

  if (storedRole.toLowerCase() === 'projectmanager') {
    return <Navigate to={PATH.EMPLOYEE_MANAGE_PROJECTS} replace />
  }

  return <Navigate to={PATH.FORBIDDEN} replace />
}

const useRouteElement = () => {
  const routes = useRoutes([
    // Guest Module
    {
      path: PATH.HOME,
      element: <RejectedRouter />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.LANDING_PAGE} />
        },
        {
          path: PATH.LANDING_PAGE,
          element: (
            <GuestLayout>
              <LandingPage />
            </GuestLayout>
          )
        },
        {
          path: PATH.PRICING_PAGE,
          element: (
            <GuestLayout>
              <PricingPage />
            </GuestLayout>
          )
        }
      ]
    },
    // Auth Module
    {
      path: PATH.FIRST_LOGIN,
      element: (
        <AuthLayout>
          <FirstLogin />
        </AuthLayout>
      )
    },
    {
      path: PATH.AUTH,
      element: <RejectedAuthRouter />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.LOGIN} />
        },
        {
          path: PATH.LOGIN,
          element: (
            <AuthLayout>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: PATH.REGISTER,
          element: (
            <AuthLayout>
              <Register />
            </AuthLayout>
          )
        },
        {
          path: PATH.FORGOT_PASSWORD,
          element: (
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          )
        },
        {
          path: PATH.RESET_PASSWORD,
          element: (
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          )
        }
      ]
    },
    // Super Admin Module
    {
      path: PATH.SUPER_ADMIN,
      element: <ProtectedRouter roles={['superadmin']} />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.SUPER_ADMIN_DASHBOARD} />
        },
        {
          path: PATH.SUPER_ADMIN_DASHBOARD,
          element: (
            <SuperAdminLayout>
              <Dashboard />
            </SuperAdminLayout>
          )
        },
        {
          path: PATH.SUPER_ADMIN_USERS,
          element: (
            <SuperAdminLayout>
              <UserManagement />
            </SuperAdminLayout>
          )
        },
        {
          path: PATH.SUPER_ADMIN_WORKSPACES,
          element: (
            <SuperAdminLayout>
              <WorkspaceManagement />
            </SuperAdminLayout>
          )
        },
        {
          path: PATH.SUPER_ADMIN_WORKSPACE_DETAIL,
          element: (
            <SuperAdminLayout>
              <WorkspaceDetail />
            </SuperAdminLayout>
          )
        }
      ]
    },
    // Admin Ws Module
    {
      path: PATH.ADMIN,
      element: <ProtectedRouter roles={['admin']} />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.ADMIN_DASHBOARD} />
        },
        {
          path: PATH.ADMIN_DASHBOARD,
          element: (
            <AdminWsLayout>
              <DashboardAdmin />
            </AdminWsLayout>
          )
        },
        {
          path: PATH.ADMIN_MY_REPORT,
          element: (
            <AdminWsLayout>
              <AdminReports />
            </AdminWsLayout>
          )
        },
        {
          path: PATH.ADMIN_MY_WORKSPACE,
          element: (
            <AdminWsLayout>
              <MyWorkspace />
            </AdminWsLayout>
          )
        },
        {
          path: PATH.ADMIN_MY_EMPLOYEES,
          element: (
            <AdminWsLayout>
              <MyEmployees />
            </AdminWsLayout>
          )
        },
        {
          path: PATH.ADMIN_MY_EMPLOYEE_DETAIL,
          element: (
            <AdminWsLayout>
              <MyEmployeeDetail />
            </AdminWsLayout>
          )
        },
        {
          path: PATH.ADMIN_MY_PROJECTS,
          element: (
            <AdminWsLayout>
              <MyProjects />
            </AdminWsLayout>
          )
        },
        {
          path: PATH.ADMIN_MY_PROJECT_DETAIL,
          element: (
            <AdminWsLayout>
              <MyProjectDetail />
            </AdminWsLayout>
          )
        },
        {
          path: PATH.ADMIN_SETTINGS,
          element: (
            <AdminWsLayout>
              <AdminSettings />
            </AdminWsLayout>
          )
        }
      ]
    },
    // Employee Module
    {
      path: PATH.EMPLOYEE,
      element: <ProtectedRouter roles={['employee', 'projectmanager']} />,
      children: [
        {
          index: true,
          element: <EmployeeIndexPage />
        },
        {
          path: PATH.EMPLOYEE_SETTINGS,
          element: (
            <EmployeeLayout>
              <AccountSettings />
            </EmployeeLayout>
          )
        },
        {
          path: PATH.EMPLOYEE_KANBAN,
          element: (
            <EmployeeLayout>
              <KanbanBoard />
            </EmployeeLayout>
          )
        },
        {
          path: PATH.EMPLOYEE_MY_TEAM,
          element: (
            <EmployeeLayout>
              <MyTeam />
            </EmployeeLayout>
          )
        },
        {
          path: PATH.EMPLOYEE_MY_FILES,
          element: (
            <EmployeeLayout>
              <MyFiles />
            </EmployeeLayout>
          )
        },
        // Staff only
        {
          path: PATH.EMPLOYEE_MY_TASKS,
          element: (
            <RoleGuard roles={['employee']}>
              <EmployeeLayout>
                <MyTasks />
              </EmployeeLayout>
            </RoleGuard>
          )
        },
        {
          path: PATH.EMPLOYEE_MY_PERFORMANCE,
          element: (
            <RoleGuard roles={['employee']}>
              <EmployeeLayout>
                <MyPerformance />
              </EmployeeLayout>
            </RoleGuard>
          )
        }
      ]
    },

    {
      path: PATH.EMPLOYEE_MANAGER,
      element: <ProtectedRouter roles={['projectmanager']} />,
      children: [
        {
          index: true,
          element: <EmployeeManagerIndexPage />
        },
        {
          path: PATH.EMPLOYEE_MANAGE_MY_TASKS,
          element: (
            <ManagerLayout>
              <MemberReports />
            </ManagerLayout>
          )
        },
        {
          path: PATH.EMPLOYEE_MANAGE_KANBAN,
          element: (
            <RoleGuard roles={['projectmanager']}>
              <ManagerLayout>
                <KanbanBoardManager />
              </ManagerLayout>
            </RoleGuard>
          )
        },
        {
          path: PATH.EMPLOYEE_MANAGE_MY_TEAM,
          element: (
            <RoleGuard roles={['projectmanager']}>
              <ManagerLayout>
                <MyTeamManager />
              </ManagerLayout>
            </RoleGuard>
          )
        },
        {
          path: PATH.EMPLOYEE_MANAGE_BACKLOG,
          element: (
            <RoleGuard roles={['projectmanager']}>
              <ManagerLayout>
                <MyPerformanceManager />
              </ManagerLayout>
            </RoleGuard>
          )
        },
        {
          path: PATH.EMPLOYEE_MANAGE_MY_FILES,
          element: (
            <RoleGuard roles={['projectmanager']}>
              <ManagerLayout>
                <MyFileManager />
              </ManagerLayout>
            </RoleGuard>
          )
        },
        {
          path: PATH.EMPLOYEE_MANAGE_PROJECTS,
          element: (
            <RoleGuard roles={['projectmanager']}>
              <ManagerLayout>
                <ProjectReport />
              </ManagerLayout>
            </RoleGuard>
          )
        }
      ]
    },
    {
      path: PATH.FORBIDDEN,
      element: <Forbidden />
    },
    {
      path: PATH.NOTFOUND,
      element: <NotFound />
    },
    {
      path: '*',
      index: true,
      element: <Navigate to={PATH.NOTFOUND} />
    }
  ])
  return routes
}

export default useRouteElement
