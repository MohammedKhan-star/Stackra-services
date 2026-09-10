import { SignJWT, jwtVerify } from "jose";

const secret = process.env.ACADEMY_AUTH_SECRET;

if (!secret) {
  throw new Error("ACADEMY_AUTH_SECRET is not configured.");
}

const secretKey = new TextEncoder().encode(secret);

export async function createAcademyToken(student) {
  return await new SignJWT({
    studentId: student.id,
    email: student.email,
    role: student.role,
    fullName: student.fullName,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyAcademyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    return payload;
  } catch (error) {
    return null;
  }
}
