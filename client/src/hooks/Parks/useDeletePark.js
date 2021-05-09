import useDeleteBody from "../useDeleteBody";

export default function useDeletePark(parkId) {
  return useDeleteBody(`/park/delete/${parkId}`)[0];
}