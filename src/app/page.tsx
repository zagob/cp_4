"use client";

import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { InputTime } from "@/components/ui/InputTime";
import { Table } from "@/components/ui/Table";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      {/*  />
     
      <InputTime placeholder="00:00" />
      <Button>Adicionar</Button> */}
      <Dashboard />
    </div>
  );
}
