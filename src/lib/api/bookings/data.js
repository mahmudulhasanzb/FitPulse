import { serverFetch } from "../server";

export const getBookingsByEmail = async (email) => {
  const res = await serverFetch(`/api/bookings/${email}`);
  return res;
};

export const checkBooking = async (classId, email) => {
  const res = await serverFetch(`/api/bookings/check/${classId}/${email}`);
  return res;
};
