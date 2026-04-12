export default function PostDetail({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Post Detail: {params.id}</h1>
      <p className="mt-4 text-xl">Content for post {params.id} will go here.</p>
    </div>
  );
}
