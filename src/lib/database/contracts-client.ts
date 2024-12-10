import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';

export async function deleteContract(contractId: string) {
  const supabase = createClientComponentClient();
  
  const { error } = await supabase
    .from('contracts')
    .delete()
    .eq('id', contractId);

  if (error) {
    console.error('Error deleting contract:', error);
    throw error;
  }
}

export async function getDashboardStatsClient() {
  const supabase = createClientComponentClient();
  
  try {
    // For now, return mock stats since the table doesn't exist yet
    return {
      activeProperties: 0,
      pendingOffers: 0,
      totalValue: 0,
      recentOffers: [],
      recentProperties: []
    };

    // Once the table is created, we'll use this code:
    /*
    const { data, error } = await supabase
      .from('dashboard_stats')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }

    return data;
    */
  } catch (error) {
    console.error('Error in getDashboardStatsClient:', error);
    throw error;
  }
}
