type Status = "Active" | "Deactive";

export function Status({ text, status }: { text: string; status: Status }) {
  return (
    <div className="rounded-full bg-gray-600/10 border font-mono border-border flex gap-2 w-auto px-5 items-center bg-blend-overlay">
      <span
        className={`rounded-full ${status === "Active" ? "bg-green-400" : "bg-red-500"} aspect-square h-2`}
      />
      <p className="text-muted">{text}</p>
    </div>
  );
}