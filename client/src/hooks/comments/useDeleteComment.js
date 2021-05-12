import useDeleteBody from "../useDeleteBody";

export default function useAddComment() {
  return useDeleteBody("/api/comments/delete")[0];
}
