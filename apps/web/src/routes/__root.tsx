import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import NavBar from '../components/NavBar/NavBar';

const RootComponent: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
};
interface MyRouterContext {
  hasCookie: boolean;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <RootComponent />,
});
