import { ItemType } from "@/app/components/to-do-list/Types";

export async function addTask(title: string, notes: string, email: string) {
  try {
    const response = await fetch("/api/task/addtask", {
      method: "POST",
      body: JSON.stringify({ title, notes, email }),
    });

    if (response.ok) {
      console.log("Task submitted successfully");
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

export async function getOnGoingTask(email: string) {
  try {
    const response = await fetch("/api/task/get-ongoing-task", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const task = await response.json();

    if (response.ok) {
      console.log("Fetch task successfully");
      return { success: true, tasks: task };
    } else {
      console.error("Form submission failed");
      return { success: false, error: await response.json() };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { success: false, error };
  }
}

export async function updateItemsIndex(data: ItemType[]) {
  try {
    const response = await fetch("/api/task/updatetaskindex", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update items position");
    }

    const result = await response.json();
    console.log("Items updated successfully", result);
  } catch (error) {
    console.error("Error updating items:", error);
  }
}

export async function updateItemStatus(id: string, status: boolean) {
  try {
    const response = await fetch("/api/task/updatetaskstatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update items status");
    }

    const result = await response.json();
    console.log("Items updated successfully", result);
  } catch (error) {
    console.error("Error updating items:", error);
  }
}

export async function updateItemsDetail(
  id: string,
  title: string,
  notes: string
) {
  try {
    const response = await fetch("/api/task/updatetaskdetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, notes }),
    });

    if (!response.ok) {
      throw new Error("Failed to update items position");
    }

    const result = await response.json();
    console.log("Items updated successfully", result);
  } catch (error) {
    console.error("Error updating items:", error);
  }
}

export async function deleteTask(id: string) {
  try {
    const response = await fetch("/api/task/deletetask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete items");
    }

    const result = await response.json();
    console.log("Items delete successfully", result);
  } catch (error) {
    console.error("Error updating items:", error);
  }
}

export async function fetchAndSortTasks(email: string): Promise<ItemType[]> {
  const task = await getOnGoingTask(email);
  return task.tasks.data
    .slice()
    .sort((a: { index: number, status: boolean }, b: { index: number, status: boolean }) => {
      if (a.status !== b.status) {
        return a.status ? 1 : -1;
      }
      return a.index - b.index;
    });
}

