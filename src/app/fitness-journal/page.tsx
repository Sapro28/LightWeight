"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/helpers";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

export default function DiaryPage() {
  const { user } = useUser();
  const userId = user?.id as string;
  const createEntry = useMutation(api.diary.addJournalEntry);
  const deleteEntry = useMutation(api.diary.removeJournalEntry);
  const diaryEntries = useQuery(
    api.diary.fetchUserJournalEntries,
    userId ? { userId } : "skip"
  );

  const [form, setForm] = useState({
    date: new Date(),
    weight: "",
    mood: "",
    energy: "",
    sleepHours: "",
    note: "",
  });

  const [goalWeight, setGoalWeight] = useState("65");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!userId || !form.date || !form.weight)
      return alert("Please enter date and weight.");

    await createEntry({
      userId,
      date: form.date.toLocaleDateString("en-CA"),
      weight: parseFloat(form.weight),
      mood: form.mood,
      energy: form.energy,
      sleepHours: form.sleepHours ? parseFloat(form.sleepHours) : undefined,
      note: form.note,
    });

    setForm({
      date: new Date(),
      weight: "",
      mood: "",
      energy: "",
      sleepHours: "",
      note: "",
    });
  };

  const todayStr = new Date().toLocaleDateString("en-CA");

  const chartData = diaryEntries
    ?.slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter(
      (entry, _, arr) => arr.length <= 7 || arr.indexOf(entry) >= arr.length - 7
    )
    .map((entry) => ({
      date: entry.date,
      weight: entry.weight,
    }));

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4 lg:px-20 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">📘 Fitness Diary</h1>

      <div className="space-y-4 border p-6 rounded-lg bg-background/50 mb-8">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !form.date && "text-muted-foreground"
              )}
            >
              {format(form.date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              selected={form.date}
              onSelect={(date) => {
                if (date) {
                  setForm((prev) => ({ ...prev, date }));
                  setCalendarOpen(false);
                }
              }}
              className="rounded-md border bg-background text-foreground"
            />
          </PopoverContent>
        </Popover>

        <Input
          name="weight"
          type="number"
          value={form.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
        />
        <Input
          name="mood"
          value={form.mood}
          onChange={handleChange}
          placeholder="Mood (optional)"
        />
        <Input
          name="energy"
          value={form.energy}
          onChange={handleChange}
          placeholder="Energy level (optional)"
        />
        <Input
          name="sleepHours"
          type="number"
          value={form.sleepHours}
          onChange={handleChange}
          placeholder="Hours of sleep (optional)"
        />
        <Textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Notes (optional)"
        />
        <div>
          <p className="text-sm text-muted-foreground mb-1">🎯 Goal Weight</p>
          <Input
            name="goalWeight"
            type="number"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
            placeholder="e.g. 65 — Your target weight (kg)"
          />
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          Add Entry
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          📈 Weight Progress
        </h2>
        {chartData?.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <CartesianGrid stroke="#444" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#14b8a6"
                strokeWidth={2}
              />
              <ReferenceLine
                x={todayStr}
                stroke="#facc15"
                label={{ value: "Today", position: "top", fill: "#facc15" }}
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={parseFloat(goalWeight)}
                stroke="#22c55e"
                strokeDasharray="6 6"
                strokeWidth={2}
                label={({ viewBox }) => (
                  <text
                    x={viewBox.width - 70}
                    y={viewBox.y - 5}
                    fill="#22c55e"
                    fontSize={13}
                    fontWeight={600}
                  >
                    🎯 Goal: {goalWeight}kg
                  </text>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground">No weight data yet.</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-2 text-foreground">
          📅 Past Entries
        </h2>
        {diaryEntries?.length ? (
          diaryEntries.map((entry) => (
            <div
              key={entry._id}
              className="border p-4 rounded-md bg-card/80 relative group"
            >
              <div className="font-mono text-sm text-muted-foreground">
                {entry.date}
              </div>
              <div className="font-semibold text-foreground">
                Weight: {entry.weight} kg
              </div>
              {entry.mood && <div>Mood: {entry.mood}</div>}
              {entry.energy && <div>Energy: {entry.energy}</div>}
              {entry.sleepHours && <div>Sleep: {entry.sleepHours} hours</div>}
              {entry.note && (
                <div className="text-muted-foreground mt-1">
                  Note: {entry.note}
                </div>
              )}
              <button
                onClick={async () => {
                  const confirmed = window.confirm("Delete this entry?");
                  if (confirmed) await deleteEntry({ entryId: entry._id });
                }}
                title="Delete Entry"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-transform duration-200" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No diary entries yet.</p>
        )}
      </div>
    </section>
  );
}
