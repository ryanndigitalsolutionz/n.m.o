export default function WorkerDashboard() {
  return (
    <div className="flex min-h-[78vh] items-center justify-center overflow-hidden">

      <div className="worker-coming-soon">

        <h1
          className="
            text-center
            text-6xl
            font-black
            tracking-wide
            text-[#FDB813]
          "
          style={{
            fontFamily: "Quantico",
          }}
        >
          Coming Soon...
        </h1>

        <p
          className="
            mt-6
            text-center
            text-xl
            text-[#B9C6D6]
          "
        >
          Tasks will show up on the notifications bar!
        </p>

      </div>

    </div>
  );
}
