"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Plus,
  MapPin,
  AlertCircle,
  Building,
  User,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDateTime, formatDate } from "@/lib/utils";
import type { Task, Appointment, Contact, Property, Lead, UserRole } from "@/types";
import { toast } from "sonner";

interface TasksClientProps {
  initialTasks: Task[];
  initialAppointments: Appointment[];
  contacts: Contact[];
  properties: Property[];
  leads: Lead[];
  role: UserRole;
}

export function TasksClient({
  initialTasks,
  initialAppointments,
  contacts,
  properties,
  leads,
  role,
}: TasksClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"appointments" | "tasks">("appointments");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isApptModalOpen, setIsApptModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: "",
    contactId: contacts[0]?.id || "",
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    priority: "medium",
    description: "",
  });

  const [apptForm, setApptForm] = useState({
    title: "",
    contactId: contacts[0]?.id || "",
    propertyId: properties[0]?.id || "",
    appointmentType: "Site Visit",
    startTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    location: "On Site (Lahore / Karachi)",
    durationMinutes: "45",
  });

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskForm),
      });
      if (!res.ok) throw new Error();
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      toast.success("Task created");
      setIsTaskModalOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTaskStatus = async (task: Task) => {
    const nextStatus = task.status === "completed" ? "pending" : "completed";
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, status: nextStatus }),
      });
      if (!res.ok) throw new Error();
      setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t)));
      toast.success(nextStatus === "completed" ? "Task marked completed" : "Task reopened");
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleCreateAppt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...apptForm,
          durationMinutes: parseInt(apptForm.durationMinutes, 10),
        }),
      });
      if (!res.ok) throw new Error();
      const newAppt = await res.json();
      setAppointments([newAppt, ...appointments]);
      toast.success("Appointment scheduled");
      setIsApptModalOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to schedule appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-navy-deep dark:text-white tracking-tight">
              Schedule & Agenda Cockpit
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-xs border border-amber-500/20">
              Asia/Karachi
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Site visit bookings, property walkthroughs, and action items.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === "appointments" ? (
            <Button onClick={() => setIsApptModalOpen(true)} size="sm" variant="primary" className="shadow-md shadow-indigo-600/25">
              <Plus className="w-4 h-4 mr-1.5" /> Book Site Visit
            </Button>
          ) : (
            <Button onClick={() => setIsTaskModalOpen(true)} size="sm" variant="primary" className="shadow-md shadow-indigo-600/25">
              <Plus className="w-4 h-4 mr-1.5" /> New Task
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/70 dark:bg-white/[0.06] border border-slate-300/70 dark:border-white/8 gap-1.5 shadow-inner">
        <button
          onClick={() => setActiveTab("appointments")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "appointments"
              ? "bg-white dark:bg-indigo-600 text-navy-deep dark:text-white shadow-md"
              : "text-slate-600 dark:text-slate-300 hover:text-navy-deep dark:hover:text-white"
          }`}
        >
          <CalendarCheck className="w-4 h-4 text-primary dark:text-cyan" /> Site Visits & Meetings ({appointments.length})
        </button>
        <button
          onClick={() => setActiveTab("tasks")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "tasks"
              ? "bg-white dark:bg-indigo-600 text-navy-deep dark:text-white shadow-md"
              : "text-slate-600 dark:text-slate-300 hover:text-navy-deep dark:hover:text-white"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Action Items ({tasks.length})
        </button>
      </div>

      {/* Tab 1: Appointments Agenda */}
      {activeTab === "appointments" && (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <EmptyState
              icon={CalendarCheck}
              title="No upcoming visits or meetings"
              description="Schedule a physical site visit or office meeting with a buyer."
              actionLabel="Schedule Site Visit"
              onAction={() => setIsApptModalOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="glass-card p-5 rounded-3xl space-y-3 hover:shadow-xl dark:hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/10 text-primary dark:text-cyan border border-indigo-500/20 uppercase">
                        {appt.appointmentType}
                      </span>
                      <h3 className="text-sm font-extrabold text-navy-deep dark:text-white mt-1.5">{appt.title}</h3>
                    </div>
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold capitalize ${
                        appt.status === "scheduled"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <p className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>
                        {formatDateTime(appt.startTime)} ({appt.durationMinutes} mins)
                      </span>
                    </p>

                    {appt.location && (
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{appt.location}</span>
                      </p>
                    )}

                    {appt.contact && (
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {appt.contact.firstName} {appt.contact.lastName} ({appt.contact.phone})
                        </span>
                      </p>
                    )}

                    {appt.property && (
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{appt.property.title}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Action Tasks */}
      {activeTab === "tasks" && (
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title="All tasks completed"
              description="Create a task with due date to assign follow-ups to your agents."
              actionLabel="Create Task"
              onAction={() => setIsTaskModalOpen(true)}
            />
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleToggleTaskStatus(task)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors ${
                            task.status === "completed"
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-slate-300 hover:border-primary"
                          }`}
                        >
                          {task.status === "completed" && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                        <div>
                          <p
                            className={`text-sm font-bold text-navy-deep ${
                              task.status === "completed" ? "line-through text-slate-400" : ""
                            }`}
                          >
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
                          )}
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                            <span className="flex items-center gap-1 font-semibold text-slate-600">
                              <Clock className="w-3 h-3" /> Due: {formatDateTime(task.dueDate)}
                            </span>
                            {task.assignedUser && (
                              <span>Assigned: {task.assignedUser.fullName}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            task.priority === "high"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : task.priority === "medium"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Schedule Appointment Modal */}
      <Modal
        isOpen={isApptModalOpen}
        onClose={() => setIsApptModalOpen(false)}
        title="Schedule Site Visit / Meeting"
        description="Book a client site visit or office meeting."
      >
        <form onSubmit={handleCreateAppt} className="space-y-4">
          <Input
            id="apTitle"
            label="Title *"
            placeholder="e.g. Physical Site Visit: DHA Villa"
            value={apptForm.title}
            onChange={(e) => setApptForm({ ...apptForm, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Contact</label>
              <select
                value={apptForm.contactId}
                onChange={(e) => setApptForm({ ...apptForm, contactId: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Property</label>
              <select
                value={apptForm.propertyId}
                onChange={(e) => setApptForm({ ...apptForm, propertyId: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Type</label>
              <select
                value={apptForm.appointmentType}
                onChange={(e) => setApptForm({ ...apptForm, appointmentType: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="Site Visit">Site Visit</option>
                <option value="Office Meeting">Office Meeting</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Online Meeting">Online Meeting</option>
              </select>
            </div>

            <Input
              id="apStart"
              label="Date & Time *"
              type="datetime-local"
              value={apptForm.startTime}
              onChange={(e) => setApptForm({ ...apptForm, startTime: e.target.value })}
              required
            />

            <Input
              id="apDur"
              label="Duration (Mins)"
              type="number"
              value={apptForm.durationMinutes}
              onChange={(e) => setApptForm({ ...apptForm, durationMinutes: e.target.value })}
            />
          </div>

          <Input
            id="apLoc"
            label="Location"
            placeholder="e.g. Sector J, DHA Phase 6 Lahore"
            value={apptForm.location}
            onChange={(e) => setApptForm({ ...apptForm, location: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsApptModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isLoading}>
              Schedule
            </Button>
          </div>
        </form>
      </Modal>

      {/* Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create Follow-up Task"
        description="Add a task with deadline."
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            id="tTitle"
            label="Task Title *"
            placeholder="e.g. Follow up with buyer regarding bank loan sanction"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              id="tDue"
              label="Due Date & Time *"
              type="datetime-local"
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Priority</label>
              <select
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <Textarea
            id="tDesc"
            label="Description"
            placeholder="Task instructions..."
            value={taskForm.description}
            onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isLoading}>
              Save Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
