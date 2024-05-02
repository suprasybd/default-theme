import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import NavBar from '../components/NavBar/NavBar';
import Modals from '@web/components/Modals/Modals';
import Footer from '@web/components/Footer/Footer';

const RootComponent: React.FC = () => {
  return (
    <>
      <NavBar />
      <Modals />
      <Outlet />
      <Footer/>
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
