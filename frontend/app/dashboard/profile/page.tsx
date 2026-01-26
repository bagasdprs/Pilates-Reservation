"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Camera, Trophy, Flame, HeartPulse, AlertCircle, CheckCircle2, Dumbbell, Activity, Zap, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

function ProfilePage() {
  // --- STATE MANAGEMENT ---

  // 1. State Tab Medis (Input Chip/Tag)
  const [conditions, setConditions] = useState<string[]>(["Asthma", "Lower Back Pain"]);
  const [inputCondition, setInputCondition] = useState("");

  // Logic add disease
  const handleAddCondition = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputCondition.trim() !== "") {
      e.preventDefault();
      if (!conditions.includes(inputCondition)) {
        setConditions([...conditions, inputCondition]);
      }
      setInputCondition("");
    }
  };

  // Logic delete disease
  const removeCondition = (tag: string) => {
    setConditions(conditions.filter((c) => c !== tag));
  };

  // 2. State Tab Goals (Selectable Cards)
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["flexibility"]);

  const toggleGoal = (id: string) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  // Data Dummy Goals
  const goalsList = [
    { id: "flexibility", label: "Flexibility", icon: Activity, desc: "Improve range of motion" },
    { id: "strength", label: "Core Strength", icon: Dumbbell, desc: "Build abdominal power" },
    { id: "rehab", label: "Post Rehab", icon: HeartPulse, desc: "Recovery movement" },
    { id: "weight", label: "Weight Loss", icon: Zap, desc: "High intensity burn" },
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-zinc-50/50">
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-full bg-zinc-200 border-4 border-white shadow-md overflow-hidden">
                <Image src="https://github.com/shadcn.png" alt="Profile" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-sm hover:bg-primary/90 transition-all">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-zinc-900">Bagas Dwiprasandi</h2>
            <p className="text-sm text-zinc-500 mb-4">bagas.dev@example.com</p>

            <div className="w-full bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-6">
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold text-sm mb-1">
                <CheckCircle2 className="h-4 w-4" /> PREMIUM MEMBER
              </div>
              <p className="text-xs text-emerald-600/80">Valid until 25 Jan 2027</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full border-t border-zinc-100 pt-4">
              <div>
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                  <Trophy className="h-4 w-4" />
                  <span className="font-bold text-lg text-zinc-800">48</span>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Sessions</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                  <Flame className="h-4 w-4" />
                  <span className="font-bold text-lg text-zinc-800">12</span>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Streak</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-800 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Dumbbell className="h-24 w-24 -rotate-12" />
            </div>
            <p className="text-emerald-200 text-xs font-medium mb-1">UPCOMING CLASS</p>
            <h3 className="text-lg font-bold mb-1">Reformer Pilates</h3>
            <p className="text-sm text-emerald-100 mb-4">Tomorrow, 09:00 AM</p>
            <Button variant="secondary" size="sm" className="w-full bg-emerald-100 text-emerald-900 hover:bg-white">
              View Details
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm min-h-[600px] overflow-hidden">
            <Tabs defaultValue="basic" className="w-full">
              {/* --- UPDATE: TABS NAVIGATION --- */}
              <div className="border-b border-zinc-200 px-6 pt-6">
                <h1 className="text-2xl font-bold mb-1">Profile Settings</h1>
                <p className="text-zinc-500 text-sm mb-6">Manage your personal info and health preferences.</p>

                <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-6">
                  {/* BASIC INFO */}
                  <TabsTrigger
                    value="basic"
                    className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary transition-all"
                  >
                    <User className="w-4 h-4 mr-2" /> Basic Info
                  </TabsTrigger>

                  {/* EMERGENCY */}
                  <TabsTrigger
                    value="emergency"
                    className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary transition-all"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" /> Emergency
                  </TabsTrigger>

                  {/* HEALTH & SAFETY */}
                  <TabsTrigger
                    value="medical"
                    className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary transition-all"
                  >
                    <HeartPulse className="w-4 h-4 mr-2" /> Health & Safety
                  </TabsTrigger>

                  {/* GOALS */}
                  <TabsTrigger
                    value="goals"
                    className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary transition-all"
                  >
                    <Trophy className="w-4 h-4 mr-2" /> Goals
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="basic" className="p-6 space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue="Bagas" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue="Dwiprasandi" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input className="pl-10" defaultValue="bagas.dev@example.com" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Input className="pl-10" defaultValue="+62 812 3456 7890" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                    <Textarea className="pl-10 min-h-[80px]" defaultValue="Jl. Sudirman No. Kav 50, Jakarta Selatan" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </TabsContent>

              <TabsContent value="emergency" className="p-6 space-y-6 animate-in fade-in duration-300">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 mb-4">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm">We will only contact this person in case of a medical emergency during class.</p>
                </div>
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input placeholder="e.g. Spouse, Parent" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Input placeholder="e.g. Brother" />
                  </div>
                  <div className="space-y-2">
                    <Label>Emergency Phone</Label>
                    <Input placeholder="+62 ..." />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button>Update Contact</Button>
                </div>
              </TabsContent>

              <TabsContent value="medical" className="p-6 space-y-8 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Existing Medical Conditions</Label>
                  <p className="text-sm text-zinc-500">
                    Type a condition (e.g. Asthma) and press <b>Enter</b> to add.
                  </p>

                  <Input placeholder="Add a condition..." value={inputCondition} onChange={(e) => setInputCondition(e.target.value)} onKeyDown={handleAddCondition} className="max-w-md" />

                  <div className="flex flex-wrap gap-2 mt-3 min-h-[40px]">
                    {conditions.length === 0 && <span className="text-sm text-zinc-400 italic">No conditions listed.</span>}
                    {conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm bg-red-50 text-red-600 border-red-100 hover:bg-red-100 flex items-center gap-2">
                        {condition}
                        <X className="h-3 w-3 cursor-pointer hover:text-red-800" onClick={() => removeCondition(condition)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-100 my-4" />

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Medical Notes for Instructor</Label>
                  <p className="text-sm text-zinc-500">Provide specific instructions or limitations recommended by your doctor.</p>
                  <Textarea placeholder="e.g. Avoid high-impact jumping exercises. Physiotherapy recommended for lower back." className="min-h-[120px] bg-zinc-50" />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button>Save Health Profile</Button>
                </div>
              </TabsContent>

              <TabsContent value="goals" className="p-6 space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1 mb-6">
                  <h3 className="font-semibold text-lg">Physical Goals</h3>
                  <p className="text-zinc-500 text-sm">Select multiple focus areas to prioritize in your training plan.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goalsList.map((goal) => {
                    const isSelected = selectedGoals.includes(goal.id);
                    return (
                      <div
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={cn(
                          "cursor-pointer rounded-xl border-2 p-5 transition-all relative flex flex-col items-center text-center gap-3 hover:bg-zinc-50",
                          isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-zinc-100 bg-white",
                        )}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 text-primary">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                        )}

                        <div className={cn("h-14 w-14 rounded-full flex items-center justify-center transition-colors", isSelected ? "bg-primary text-white" : "bg-zinc-100 text-zinc-500")}>
                          <goal.icon className="h-6 w-6" />
                        </div>

                        <div>
                          <h4 className={cn("font-bold text-base", isSelected ? "text-primary" : "text-zinc-700")}>{goal.label}</h4>
                          <p className="text-xs text-zinc-500">{goal.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 flex justify-end border-t border-zinc-100 mt-6">
                  <Button className="w-full md:w-auto">Update Goals</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
