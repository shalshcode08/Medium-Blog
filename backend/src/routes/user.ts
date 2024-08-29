import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@somu2030/medium-common";


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// SIGN UP ROUTE
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  // a body that the user is sending we should sanatize
  // in our case it should look like this:-
  //{
  //    email : "string"
  //    password: "string"
  //    name : optional string
  //}
  // and we have seen that best way to do this is ZOD 
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
        message : "inputs are not correct"
    })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      }
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    // return c.json({
    //   jwt: token,
    // });

    return c.text(jwt);

  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("invalid");
  }
});

// SIGN IN ROUTE
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Inputs are not correct"
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        error: "user not found",
      });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (e) {
    console.log(e);
    c.status(403); //status code for unautorized (when we send wrong credenuials)
    return c.json({
      message: "invalid email or password",
    });
  }
});
