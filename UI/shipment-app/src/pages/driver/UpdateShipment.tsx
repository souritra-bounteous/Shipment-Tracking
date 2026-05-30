import { useState } from "react";
import { api } from "../../api/axios";

export default function UpdateShipment() {
  const [file, setFile] = useState<File | null>(null);

  const upload = async () => {
    const fd = new FormData();
    if (file) fd.append("file", file);

    await api.post("/tracking/proof", fd);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={upload}>Upload</button>
    </div>
  );
}