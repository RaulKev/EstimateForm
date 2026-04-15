export const enum PetPlans {
  SUPER_CAN = 'SuperCan',
  ULTRA_CAN = 'UltraCan',
  MEGA_CAN = 'MegaCan',
}

export const redeablePetPlan: Record<PetPlans, string> = {
  [PetPlans.SUPER_CAN]: 'Super Can',
  [PetPlans.ULTRA_CAN]: 'Ultra Can',
  [PetPlans.MEGA_CAN]: 'Mega Can',
};
