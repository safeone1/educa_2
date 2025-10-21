import { addUser } from "@/server/crud";

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    // Here you would typically add the user to your database.
    // For demonstration, we'll just log the user data.
    console.log("Adding user:", { email, password });

    await addUser({ email, password });
    return new Response(
      JSON.stringify({ message: "User added successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response(JSON.stringify({ error: "Failed to add user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const GET = async (request: Request) => {
  return new Response(JSON.stringify({ message: "Add User API is running" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
