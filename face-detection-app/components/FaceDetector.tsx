"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface FaceBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface FaceResult {
  age: number;
  gender: string;
  smile: number;
  leftEye: string;
  rightEye: string;
}

export default function FaceDetector({
  userId,
}: {
  userId: number;
}) {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [faceBox, setFaceBox] =
    useState<FaceBox | null>(null);

  const [result, setResult] =
    useState<FaceResult | null>(null);

  const [loading, setLoading] =
    useState(false);

  const imageRef =
    useRef<HTMLImageElement>(null);

  async function handleDetect() {
    if (!imageUrl) return;

    setLoading(true);

    const response = await fetch(
      "/api/face-detect",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          imageUrl,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.error_message) {
      alert(data.error_message);
      setLoading(false);
      return;
    }

    if (
      data.faces &&
      data.faces.length > 0 &&
      imageRef.current
    ) {
      const face =
        data.faces[0].face_rectangle;

      const img = imageRef.current;

      const displayedWidth =
        img.width;

      const displayedHeight =
        img.height;

      const naturalWidth =
        img.naturalWidth;

      const naturalHeight =
        img.naturalHeight;

      const scaleX =
        displayedWidth /
        naturalWidth;

      const scaleY =
        displayedHeight /
        naturalHeight;

      setFaceBox({
        left: face.left * scaleX,
        top: face.top * scaleY,
        width: face.width * scaleX,
        height: face.height * scaleY,
      });

      const attributes =
        data.faces[0].attributes;

      setResult({
        age: attributes.age.value,

        gender:
          attributes.gender.value,

        smile:
          attributes.smile.value,

        leftEye:
          attributes.eyestatus
            .left_eye_status
            .no_glass_eye_open > 50
            ? "Open"
            : "Closed",

        rightEye:
          attributes.eyestatus
            .right_eye_status
            .no_glass_eye_open > 50
            ? "Open"
            : "Closed",
      });

      await fetch(
        "/api/increment-entries",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

      router.refresh();
    } else {
      alert("No face detected");
    }

    setLoading(false);
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.8fr_1fr]">

      {/* LEFT SECTION */}
      <div className="col-span-2">

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Paste image URL..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
          />

          <button
            onClick={handleDetect}
            className="inline-flex h-12 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            {loading ? "Detecting..." : "Detect Face"}
          </button>
        </div>

        {imageUrl && (
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Preview"
                className="mx-auto max-h-[520px] w-full max-w-full object-contain"
              />

              {faceBox && (
                <div
                  className="absolute border-4 border-emerald-500"
                  style={{
                    top: `${faceBox.top}px`,
                    left: `${faceBox.left}px`,
                    width: `${faceBox.width}px`,
                    height: `${faceBox.height}px`,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Detection Result</h2>

        {result ? (
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4 text-slate-900 shadow-sm">
              <p className="text-sm text-slate-500">Age</p>
              <p className="mt-2 text-xl font-semibold">{result.age}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-slate-900 shadow-sm">
              <p className="text-sm text-slate-500">Gender</p>
              <p className="mt-2 text-xl font-semibold">{result.gender}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-slate-900 shadow-sm">
              <p className="text-sm text-slate-500">Smile</p>
              <p className="mt-2 text-xl font-semibold">{result.smile.toFixed(0)}%</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-slate-900 shadow-sm">
              <p className="text-sm text-slate-500">Left Eye</p>
              <p className="mt-2 text-xl font-semibold">{result.leftEye}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-slate-900 shadow-sm">
              <p className="text-sm text-slate-500">Right Eye</p>
              <p className="mt-2 text-xl font-semibold">{result.rightEye}</p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-slate-50 p-6 text-slate-500 shadow-sm">
            Detect a face to see details.
          </div>
        )}
      </div>

    </div>
  );
}