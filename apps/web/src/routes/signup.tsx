import { createFileRoute } from '@tanstack/react-router'
import SignUp from '@web/components/SignUp/SignUp'

export const Route = createFileRoute('/signup')({
  component: () => <div><SignUp/></div>
})