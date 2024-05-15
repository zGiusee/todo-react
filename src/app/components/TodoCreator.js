export default function todoCreator() {
  return (
    <div className="absolute bottom-0 w-full px-12 py-6">
      <div className="relative">
        <span className="absolute text-gray-400 top-4 left-4 text-3xl">+</span>
        <input
          type="text"
          placeholder="Aggiungi un attività"
          className=" py-6 px-12 w-full bg-gray-200  placeholder-gray-400 rounded-md"
        />
      </div>
    </div>
  );
}
