export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-blue-600 text-4xl font-bold mb-4 font-heading">Welcome to the Home Page</h1>
      <p className="text-muted text-lg font-duplet">This is the content of the home page.</p>
      <div className="mt-8 p-4 bg-amber-700 rounded-sm shadow-middle border-content border">
        <p className="text-muted">Testing custom colors and styles from tailwind.config.ts</p>
      </div>
    </div>
  );
}
