import axios, { AxiosResponse } from "axios";
import { PagedList } from "./Common/Interfaces/PagedList";

export interface Notification {
  id: string
  title: string
  eventId: string
  type: string
  uri: string
  isRead: boolean
}

export const getUserNotifications = async (
  userId: string,
  isRead?: boolean,
  pageNumber: number = 1,
  pageSize: number = 5
): Promise<PagedList<Notification> | undefined> => {
  try {
    let uri = `${import.meta.env.VITE_API_URL}/v1/notifications/users/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (isRead !== null && isRead !== undefined) {
      uri += `&isRead=${isRead}`
    }

    const response: AxiosResponse<PagedList<Notification>> = await axios.get(uri);

    return response?.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};


export const markUserNotificationAsRead = async (
  notificationId: string): Promise<void> => {
  try {
    await axios.patch(`${import.meta.env.VITE_API_URL}/v1/notifications/${notificationId}/mark-as-read`);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

export const markUserNotificationAllAsRead = async (
  userId: string): Promise<void> => {
  try {
    await axios.patch(`${import.meta.env.VITE_API_URL}/v1/notifications/users/${userId}/mark-all-as-read`);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}
