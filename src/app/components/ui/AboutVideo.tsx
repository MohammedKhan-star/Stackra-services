export default function AboutVideo() {
  const videoId = "JfTs7q8JhEs";

  return (
    <div className="relative bg-gray-900 rounded-3xl h-[420px] overflow-hidden shadow-2xl group">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
        title="Stackra Technologies Launch"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
    </div>
  );
}