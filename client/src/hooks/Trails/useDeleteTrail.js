import useDeleteBody from "../useDeleteBody";

export default function useDeleteTrail(trailId) {
  return useDeleteBody(`/api/trail/delete/${trailId}`)[0];
}
