import useDeleteBody from "../useDeleteBody";

export default function useDeleteUser(userId) {
  return useDeleteBody(`/api/user/delete/${userId}`)[0];
}
