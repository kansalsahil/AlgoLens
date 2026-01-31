import { ListNode } from '../../core/types';

export interface LinkedListCycleInput {
  head: ListNode | null;
  pos: number; // Position where cycle begins (-1 if no cycle)
}
