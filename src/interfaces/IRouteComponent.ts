/* eslint-disable */
export interface IRouteComponent<TProps = {}> {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<TProps>>;
}
/* eslint-enable */
