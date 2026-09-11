import { SignJWT, jwtVerify } from "jose";

function getSecretKey() {
  const secret = process.env.ACADEMY_AUTH_SECRET;

  if (!secret) {
    throw new Error(
      "ACADEMY_AUTH_SECRET is not configured. Please add it to your environment variables."
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createAcademyToken(student) {
  const secretKey = getSecretKey();

  return await new SignJWT({
    studentId: student.id,
    email: student.email,
    role: student.role,
    fullName: student.fullName,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyAcademyToken(token) {
  if (!token) {
    return null;
  }

  try {
    const secretKey = getSecretKey();

    const { payload } = await jwtVerify(token, secretKey);

    return payload;
  } catch (error) {
    console.error("ACADEMY TOKEN VERIFICATION ERROR:", error);
    return null;
  }
}
