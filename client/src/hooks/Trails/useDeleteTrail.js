import useDeleteBody from '../useDeleteBody';

export default function useDeleteTrail(trailId) {
    return useDeleteBody(`/trail/delete/${trailId}`)[0];
}