import { createFileRoute } from '@tanstack/react-router';
import Home from '@web/pages/Home/Home';

export const Route = createFileRoute('/')({
  component: () => <div>
    <Home/>
  </div>,
});
