import useDeleteBody from "../useDeleteBody";

export default function useAddComment() {
  return useDeleteBody("/comments/delete")[0];
}