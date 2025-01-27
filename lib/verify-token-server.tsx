import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function verifyTokenCustomer(req: NextRequest) {
  const token = req.headers.get("authorization");

  if (!token)
    return Response.json({
      status: 403,
      message: "Access Denied. No token provided.",
    });
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  return jwt.verify(tokenWithoutBearer, "asdasdasd", (err, decoded) => {
    if (err) {
      return Response.json(
        {
          status: 403,
          message: "Access Denied. No token provided.",
        },
        {
          status: 403,
        },
      );
    }

    req.headers.set("user", JSON.stringify(decoded) as any);

    // next(); // Lanjutkan ke handler berikutnya
    return null;
  });
}

export function verifyTokenAdmin(req: NextRequest) {
  const token = req.headers.get("authorization");

  if (!token)
    return Response.json(
      {
        status: 403,
        message: "Access Denied. No token provided.",
      },
      {
        status: 403,
      },
    );
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  return jwt.verify(tokenWithoutBearer, "asdasdasd", (err, decoded: any) => {
    if (err) {
      return Response.json(
        {
          status: 403,
          message: "Access Denied. No token provided.",
        },
        {
          status: 403,
        },
      );
    }

    if (!decoded?.is_admin) {
      return Response.json(
        {
          status: 403,
          message: "Access Denied. Only Admin Can Access",
        },
        {
          status: 403,
        },
      );
    }

    req.headers.set("user", JSON.stringify(decoded) as any);

    return null;
  });
}
