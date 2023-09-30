import { PrivateRoute } from './PrivateRoute';
import { Route } from './Route';

type renderRoutesProps = Array<{ path?: string; exact?: boolean; render: () => Response; component?: undefined; isPrivate?: boolean; } | any>

export const renderRoutes = (routes: renderRoutesProps) => {
  return routes.map(({ isPrivate, ...props }, index) => {
    const RouteComponent = isPrivate ? PrivateRoute : Route;

    return (
      <RouteComponent key={index} {...props} component={routes}/>
    );
  });
};
