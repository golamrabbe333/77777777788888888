import { Router, type IRouter } from "express";
import { LoginBody, LoginResponse, GetMeResponse } from "@workspace/api-zod";
import { queryRows } from "../lib/mysql";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

type UserRow = {
  id: number;
  username: string;
  password: string;
  name: string;
  role: string;
};

const router: IRouter = Router();

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [user] = await queryRows<UserRow>(
    "SELECT id, username, password, name, role FROM users WHERE username = ? LIMIT 1",
    [parsed.data.username],
  );

  if (!user || user.password !== parsed.data.password) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  req.session.userId = user.id;
  res.json(LoginResponse.parse({ id: user.id, username: user.username, name: user.name, role: user.role }));
});

router.get("/auth/me", async (req, res): Promise<void> => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const [user] = await queryRows<UserRow>(
    "SELECT id, username, password, name, role FROM users WHERE id = ? LIMIT 1",
    [req.session.userId],
  );

  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  res.json(GetMeResponse.parse({ id: user.id, username: user.username, name: user.name, role: user.role }));
});

router.post("/auth/logout", async (req, res): Promise<void> => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

export default router;
