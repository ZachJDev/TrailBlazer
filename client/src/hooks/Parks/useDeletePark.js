import useDeleteBody from "../useDeleteBody";

export default function useDeletePark(parkId) {
  return useDeleteBody(`/api/park/delete/${parkId}`)[0];
}
