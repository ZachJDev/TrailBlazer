import usePutBody from "../usePutBody";

export default function useEditComment() {
  return usePutBody("/api/comments/edit")[0];
}
