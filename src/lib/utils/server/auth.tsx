export async function register(name: string, email: string, password: string) {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      console.log("Form submitted successfully");
      return { success: true };
    } else {
      console.error("Form submission failed");
      return { success: false, error: await response.json() };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { success: false, error };
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Form submitted successfully");
      return { success: true };
    } else {
      console.error("Form submission failed");
      return { success: false };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { success: false, error };
  }
}

export async function logout() {
  try {
    await fetch("/api/auth/logout", {
      method: "GET",
    });
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
