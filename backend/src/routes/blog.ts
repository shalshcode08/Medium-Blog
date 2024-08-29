import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@somu2030/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// MIDDLEWARE
blogRouter.use("/*", async (c, next) => {
  //   // get the header
  //   // verify the header
  //   // if the header is correct, we can proceed
  //   // if not, we return the user 403 status code
  const head = c.req.header("authorization") || "";
  const token = head.split(" ")[1];

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

// This need to create a new blog
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Inputs are not correct"
    })
  }

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({
    id: blog.id,
  });
});

// this will update the blog
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Inputs are not correct"
    })
  }

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

// pagination => means we should not return all the blog to the user , we should return the first 10 or 15 or 20 blogs to the user ans if the user wants we will show the next following blogs
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select:{
      content : true,
      title:true,
      id:true,
      author :{
        select:{
          name:true,
        }
      }
    }
  });
  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select:
      {
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "error while fetching blog post",
    });
  }
});
