import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/start.tsx"),
  route("home","pages/home.tsx")
] satisfies RouteConfig;
