const webhookUrl =
  "https://windmill-server.x.guima.digital/api/w/guim4-tecnologia/jobs/run/p/f/Hemocione/receive_caze_2024_access";

export interface UserData {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export function notifyAccess(user: UserData) {
  fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify({ user }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${useRuntimeConfig().public.webhookToken}`,
    },
  });
}
