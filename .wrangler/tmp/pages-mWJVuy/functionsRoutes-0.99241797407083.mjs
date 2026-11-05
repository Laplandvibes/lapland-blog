import { onRequest as __og__card__js_onRequest } from "C:\\Users\\pesol\\wt-blogi\\lapland-blog-new\\functions\\og\\[card].js"
import { onRequest as __og_jpg_js_onRequest } from "C:\\Users\\pesol\\wt-blogi\\lapland-blog-new\\functions\\og.jpg.js"
import { onRequest as ___middleware_js_onRequest } from "C:\\Users\\pesol\\wt-blogi\\lapland-blog-new\\functions\\_middleware.js"

export const routes = [
    {
      routePath: "/og/:card",
      mountPath: "/og",
      method: "",
      middlewares: [],
      modules: [__og__card__js_onRequest],
    },
  {
      routePath: "/og.jpg",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__og_jpg_js_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]