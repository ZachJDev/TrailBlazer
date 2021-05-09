import useDeleteBody from "../useDeleteBody";

export default function useDeleteUser(userId) {
  return useDeleteBody(`/user/delete/${userId}`)[0];
}