'use client';

import { useState } from 'react';
import { Contract } from '@/lib/database/contracts-types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { deleteContract } from '@/lib/database/contracts-client';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CalendarIcon, HomeIcon, FileTextIcon, Loader2Icon, XCircleIcon } from 'lucide-react';
import cn from 'classnames';

interface ContractListProps {
  initialContracts: Contract[];
}

export default function ContractList({ initialContracts }: ContractListProps) {
  const [contracts, setContracts] = useState(initialContracts);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [contractToDelete, setContractToDelete] = useState<Contract | null>(null);
  const { toast } = useToast();

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const formatCurrency = (value: string | null) => {
    if (!value) return 'N/A';
    return value;
  };

  const formatList = (items: string[] | undefined | null) => {
    if (!items || items.length === 0) return 'N/A';
    return items.join(', ');
  };

  const formatAddress = (contract: Contract) => {
    if (contract.property) {
      return `${contract.property.address}, ${contract.property.city}, ${contract.property.state} ${contract.property.zip}`;
    }
    return contract.parsed_data?.premisesAddress || 'Address not available';
  };

  const handleDeleteContract = async () => {
    if (!contractToDelete) return;

    try {
      await deleteContract(contractToDelete.id);
      setContracts(contracts.filter(c => c.id !== contractToDelete.id));
      toast({
        title: "Contract deleted",
        description: "The contract has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting contract:', error);
      toast({
        title: "Error",
        description: "Failed to delete the contract. Please try again.",
        variant: "destructive",
      });
    } finally {
      setContractToDelete(null);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {contracts.map((contract) => (
        <Card key={contract.id} className="relative flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-200 border-gray-200 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                setContractToDelete(contract);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1.5 h-4 w-4" />
                {formatDate(contract.created_at)}
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {formatAddress(contract)}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <div className="grid gap-3">
              {contract.parsed_data?.purchasePrice && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black">Purchase Price</span>
                  <span className="text-sm font-semibold text-black">
                    ${Number(contract.parsed_data.purchasePrice).toLocaleString()}
                  </span>
                </div>
              )}
              {contract.parsed_data?.buyerNames && contract.parsed_data.buyerNames.length > 0 && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-black">Buyers</span>
                  <span className="text-sm font-semibold text-black">
                    {formatList(contract.parsed_data.buyerNames)}
                  </span>
                </div>
              )}
              {contract.parsed_data?.closeOfEscrowDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black">Close of Escrow</span>
                  <span className="text-sm font-semibold text-black">
                    {contract.parsed_data.closeOfEscrowDate}
                  </span>
                </div>
              )}
            </div>

            {contract.parse_status === 'pending' && (
              <div className="flex items-center justify-center py-2 text-yellow-700 dark:text-yellow-400 text-sm bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Processing contract...
              </div>
            )}
            {contract.parse_status === 'failed' && (
              <div className="flex items-center justify-center py-2 text-red-700 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 rounded-md">
                <XCircleIcon className="mr-2 h-4 w-4" />
                Failed to process
              </div>
            )}

            <div className="space-y-3 pt-2">
              {contract.property && (
                <Link 
                  href={`/dashboard/properties/${contract.property.id}`}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-md transition-colors"
                >
                  <HomeIcon className="mr-1.5 h-4 w-4" />
                  View Property Details
                </Link>
              )}
              {contract.offer && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-900 rounded-md">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Offer Status</span>
                    <span className={cn(
                      "text-sm font-semibold px-2 py-0.5 rounded-full",
                      {
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': contract.offer.status === 'pending',
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': contract.offer.status === 'accepted',
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': contract.offer.status === 'rejected'
                      }
                    )}>
                      {contract.offer.status}
                    </span>
                  </div>
                  <Link 
                    href={`/dashboard/offers/${contract.offer.id}`}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-md transition-colors"
                  >
                    <FileTextIcon className="mr-1.5 h-4 w-4" />
                    View Offer Details
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-auto pt-4">
            <Dialog open={selectedContract?.id === contract.id} onOpenChange={(open) => !open && setSelectedContract(null)}>
              <DialogTrigger asChild>
                <Button 
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setSelectedContract(contract)}
                >
                  View Full Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-bold text-gray-900">Contract Details</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    View detailed information about this contract
                  </DialogDescription>
                </DialogHeader>
                {contract.parsed_data && (
                  <div className="grid grid-cols-2 gap-6 p-4">
                    <section className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900">Property Details</h3>
                      <div className="space-y-2 text-gray-700">
                        <p><span className="font-medium">Premises Address:</span> {contract.parsed_data.premisesAddress}</p>
                        <p><span className="font-medium">City:</span> {contract.parsed_data.propertyCity}</p>
                        <p><span className="font-medium">County:</span> {contract.parsed_data.propertyCounty}</p>
                        <p><span className="font-medium">ZIP:</span> {contract.parsed_data.propertyZip}</p>
                        <p><span className="font-medium">Assessor's Number:</span> {contract.parsed_data.assessorNumber}</p>
                        <p><span className="font-medium">Legal Description:</span> {contract.parsed_data.legalDescription}</p>
                        {contract.property && (
                          <Link 
                            href={`/dashboard/properties/${contract.property.id}`}
                            className="inline-block mt-2 text-primary hover:text-primary/80 transition-colors"
                          >
                            View Full Property Details →
                          </Link>
                        )}
                      </div>
                    </section>

                    <section className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900">Financial Details</h3>
                      <div className="space-y-2 text-gray-700">
                        <p><span className="font-medium">Purchase Price:</span> {formatCurrency(contract.parsed_data.purchasePrice)}</p>
                        <p><span className="font-medium">Earnest Money:</span> {formatCurrency(contract.parsed_data.earnestMoney)}</p>
                        <p><span className="font-medium">Earnest Money Form:</span> {contract.parsed_data.earnestMoneyForm}</p>
                        <p><span className="font-medium">Financing Type:</span> {contract.parsed_data.financingType}</p>
                        <p><span className="font-medium">Seller Concessions:</span> {contract.parsed_data.sellerConcessions}%</p>
                        <p><span className="font-medium">Seller Concessions Amount:</span> {formatCurrency(contract.parsed_data.sellerConcessionsAmount)}</p>
                      </div>
                    </section>

                    <section className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900">Title and Escrow</h3>
                      <div className="space-y-2 text-gray-700">
                        <p><span className="font-medium">Escrow Holder:</span> {contract.parsed_data.escrowHolder}</p>
                        <div className="mt-2">
                          <p className="font-medium">Escrow Company:</p>
                          <p className="ml-4">{contract.parsed_data.escrowCompany?.name}</p>
                          <p className="ml-4">{contract.parsed_data.escrowCompany?.address}</p>
                          <p className="ml-4">{contract.parsed_data.escrowCompany?.city}, {contract.parsed_data.escrowCompany?.state} {contract.parsed_data.escrowCompany?.zip}</p>
                        </div>
                      </div>
                    </section>

                    {contract.offer && (
                      <section className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3 text-gray-900">Offer Information</h3>
                        <div className="space-y-2 text-gray-700">
                          <p><span className="font-medium">Status:</span> {contract.offer.status}</p>
                          <p><span className="font-medium">Offer Amount:</span> ${contract.offer.offer_amount.toLocaleString()}</p>
                          <p><span className="font-medium">Offer Date:</span> {formatDate(contract.offer.offer_date)}</p>
                          {contract.offer.submitted_at && (
                            <p><span className="font-medium">Submitted:</span> {formatDate(contract.offer.submitted_at)}</p>
                          )}
                          {contract.offer.accepted_at && (
                            <p><span className="font-medium">Accepted:</span> {formatDate(contract.offer.accepted_at)}</p>
                          )}
                          {contract.offer.rejected_at && (
                            <p><span className="font-medium">Rejected:</span> {formatDate(contract.offer.rejected_at)}</p>
                          )}
                          {contract.offer.withdrawn_at && (
                            <p><span className="font-medium">Withdrawn:</span> {formatDate(contract.offer.withdrawn_at)}</p>
                          )}
                          {contract.offer.closing_date && (
                            <p><span className="font-medium">Closing Date:</span> {formatDate(contract.offer.closing_date)}</p>
                          )}
                          <Link 
                            href={`/dashboard/offers/${contract.offer.id}`}
                            className="inline-block mt-2 text-primary hover:text-primary/80 transition-colors"
                          >
                            View Full Offer Details →
                          </Link>
                        </div>
                      </section>
                    )}

                    <section className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900">Due Diligence</h3>
                      <div className="space-y-2 text-gray-700">
                        <p><span className="font-medium">Inspection Period:</span> {contract.parsed_data.inspectionPeriodDays} days</p>
                        <p><span className="font-medium">Cure Period:</span> {contract.parsed_data.curePeriodDays} days</p>
                        <p><span className="font-medium">Home Warranty:</span> {contract.parsed_data.homeWarrantyStatus}</p>
                      </div>
                    </section>

                    <section className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900">Parties</h3>
                      <div className="space-y-4 text-gray-700">
                        <div>
                          <p className="font-medium">Buyers:</p>
                          <ul className="ml-4 list-disc">
                            {contract.parsed_data.buyerNames?.map((name, i) => (
                              <li key={i}>{name}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium">Sellers:</p>
                          <ul className="ml-4 list-disc">
                            {contract.parsed_data.sellerNames?.map((name, i) => (
                              <li key={i}>{name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-gray-900">Signatures and Dates</h3>
                      <div className="space-y-4 text-gray-700">
                        {contract.parsed_data.buyers?.map((buyer, i) => (
                          <div key={i} className="mb-2">
                            <p className="font-medium">Buyer {i + 1}:</p>
                            <p className="ml-4">Signature: {buyer.signature}</p>
                            <p className="ml-4">Date: {formatDate(buyer.signatureDate || '')}</p>
                            <p className="ml-4">Address: {buyer.address}</p>
                            <p className="ml-4">{buyer.city}, {buyer.state} {buyer.zip}</p>
                          </div>
                        ))}
                        {contract.parsed_data.sellers?.map((seller, i) => (
                          <div key={i} className="mb-2">
                            <p className="font-medium">Seller {i + 1}:</p>
                            <p className="ml-4">Signature: {seller.signature}</p>
                            <p className="ml-4">Date: {formatDate(seller.signatureDate || '')}</p>
                            <p className="ml-4">Address: {seller.address}</p>
                            <p className="ml-4">{seller.city}, {seller.state} {seller.zip}</p>
                          </div>
                        ))}
                        {contract.parsed_data.offerRejectionDate && (
                          <p><span className="font-medium">Offer Rejected:</span> {formatDate(contract.parsed_data.offerRejectionDate)}</p>
                        )}
                      </div>
                    </section>

                    <section className="bg-gray-50 p-4 rounded-lg col-span-2">
                      <h3 className="font-semibold mb-3 text-gray-900">Agent Information</h3>
                      <div className="grid grid-cols-2 gap-6 text-gray-700">
                        <div>
                          <p className="font-medium">Buyer's Agent:</p>
                          <p className="ml-4">{contract.parsed_data.buyerAgent?.name}</p>
                          <p className="ml-4">MLS: {contract.parsed_data.buyerAgent?.mlsCode}</p>
                          <p className="ml-4">License: {contract.parsed_data.buyerAgent?.licenseNumber}</p>
                          <p className="ml-4">Phone: {contract.parsed_data.buyerAgent?.phone}</p>
                          <p className="ml-4">Email: {contract.parsed_data.buyerAgent?.email}</p>
                          <div className="mt-2">
                            <p className="font-medium">Buyer's Firm:</p>
                            <p className="ml-4">{contract.parsed_data.buyerFirm?.name}</p>
                            <p className="ml-4">MLS: {contract.parsed_data.buyerFirm?.mlsCode}</p>
                            <p className="ml-4">License: {contract.parsed_data.buyerFirm?.licenseNumber}</p>
                            <p className="ml-4">{contract.parsed_data.buyerFirm?.address}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Seller's Agent:</p>
                          <p className="ml-4">{contract.parsed_data.sellerAgent?.name}</p>
                          <p className="ml-4">MLS: {contract.parsed_data.sellerAgent?.mlsCode}</p>
                          <p className="ml-4">License: {contract.parsed_data.sellerAgent?.licenseNumber}</p>
                          <p className="ml-4">Phone: {contract.parsed_data.sellerAgent?.phone}</p>
                          <p className="ml-4">Email: {contract.parsed_data.sellerAgent?.email}</p>
                          <div className="mt-2">
                            <p className="font-medium">Seller's Firm:</p>
                            <p className="ml-4">{contract.parsed_data.sellerFirm?.name}</p>
                            <p className="ml-4">MLS: {contract.parsed_data.sellerFirm?.mlsCode}</p>
                            <p className="ml-4">License: {contract.parsed_data.sellerFirm?.licenseNumber}</p>
                            <p className="ml-4">{contract.parsed_data.sellerFirm?.address}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {contract.parsed_data.additionalTerms && (
                      <section className="bg-gray-50 p-4 rounded-lg col-span-2">
                        <h3 className="font-semibold mb-3 text-gray-900">Additional Terms</h3>
                        <div className="text-gray-700 whitespace-pre-wrap">
                          {contract.parsed_data.additionalTerms}
                        </div>
                      </section>
                    )}
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}

      <AlertDialog open={!!contractToDelete} onOpenChange={() => setContractToDelete(null)}>
        <AlertDialogContent className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Delete Contract
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400 mt-2">
              Are you sure you want to delete this contract for{' '}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {contractToDelete?.parsed_data?.premisesAddress || 'this address'}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="rounded-md border-2 border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteContract}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ml-3"
            >
              Delete Contract
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
