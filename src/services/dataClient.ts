import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
export function useUserPlans(userId?: string) {
  const getPlans = useQuery(
    api.plans.fetchUserPlans,
    userId ? { userId } : "skip"
  );
  const createPlan = useMutation(api.plans.savePlanToDatabase);
  const deletePlan = useMutation(api.plans.removePlan);
  return { getPlans, createPlan, deletePlan };
}
