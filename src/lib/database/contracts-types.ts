export interface Contract {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  status: ContractStatus;
  file_url: string;
  property_id: string;
  offer_id: string;
  user_id: string;
  agent_id?: string;
  parsed_data?: any;
}

export enum ContractStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  SIGNED = 'SIGNED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}
