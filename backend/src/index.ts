import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter} from "./routes/blog";
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use('/*', cors())
app.route("/api/v1/user", userRouter);      //all user request will go to to userRouter
app.route('/api/v1/blog', blogRouter);     //all blog request will go to blogrouter

export default app;
