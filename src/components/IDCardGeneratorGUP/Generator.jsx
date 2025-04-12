import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function GUPGenerator() {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [tank, setTank] = useState("");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Girls und Panzer ID Card Generator</h2>
      <Input placeholder="Nama Karakter" value={name} onChange={e => setName(e.target.value)} />
      <Input placeholder="Sekolah" value={school} onChange={e => setSchool(e.target.value)} className="mt-2" />
      <Input placeholder="Tipe Tank" value={tank} onChange={e => setTank(e.target.value)} className="mt-2" />
      <Button className="mt-4">Generate</Button>
      <Card className="mt-6">
        <p>Nama: {name}</p>
        <p>Sekolah: {school}</p>
        <p>Tank: {tank}</p>
      </Card>
    </div>
  );
}