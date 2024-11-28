import LoadingSpinner from '@/components/LoadingSpinner';

export default function SubmitOfferLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}
