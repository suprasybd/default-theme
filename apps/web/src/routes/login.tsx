import { createFileRoute } from '@tanstack/react-router'
import Login from '@web/components/Login/Login'

export const Route = createFileRoute('/login')({
  component: () => <div>
    <Login/>
  </div>
})